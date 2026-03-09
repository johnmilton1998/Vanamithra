
import { useState, useEffect } from "react";
import db from "../../services/DatabaseService";
import toast from "react-hot-toast";
import "./admin-styles.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const allProducts = db.getProducts();
    setProducts(allProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.description) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editing) {
        db.updateProduct(editing, {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          image: form.image
        });
        toast.success("Product updated successfully!");
        setEditing(null);
      } else {
        db.addProduct({
          name: form.name,
          price: Number(form.price),
          description: form.description,
          image: form.image
        });
        toast.success("Product added successfully!");
      }
      setForm({ name: "", price: "", description: "", image: "" });
      loadProducts();
    } catch (error) {
      toast.error("Error saving product");
    }
  };

  const editProduct = (product) => {
    setEditing(product.id);
    setForm(product);
    window.scrollTo(0, 0);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        db.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        toast.success("Product deleted successfully!");
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  return (
    <div className="container">
      <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", marginBottom: "30px", color: "#2e7d32" }}>
        Manage Products
      </h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
          border: "2px solid #e0e0e0"
        }}
      >
        <h3 style={{ marginTop: 0, fontSize: "clamp(16px, 3vw, 20px)" }}>
          {editing ? "✏️ Edit Product" : "➕ Add New Product"}
        </h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "15px"
        }}>
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            style={{
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            style={{
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              minHeight: "80px",
              boxSizing: "border-box",
              fontFamily: "Arial"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              background: "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }}
          >
            {editing ? "Update Product" : "Add Product"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ name: "", price: "", description: "", image: "" });
              }}
              style={{
                padding: "12px 24px",
                background: "#ccc",
                color: "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                whiteSpace: "nowrap"
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {products.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>
            No products yet. Add your first product above!
          </p>
        ) : (
          products.map(p => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  marginBottom: "12px"
                }}
              />
              <h3 style={{
                margin: "0 0 8px 0",
                fontSize: "clamp(14px, 3vw, 16px)",
                color: "#333"
              }}>
                {p.name}
              </h3>
              <p style={{
                margin: "0 0 8px 0",
                fontSize: "12px",
                color: "#666",
                flex: 1
              }}>
                {p.description}
              </p>
              <p style={{
                margin: "8px 0",
                fontSize: "clamp(16px, 4vw, 18px)",
                color: "#2e7d32",
                fontWeight: "bold"
              }}>
                ₹{p.price}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => editProduct(p)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#ff9800",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
