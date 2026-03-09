
import { useState, useEffect } from "react";

const initialProducts = [
  { id: 1, name: "Coconut Oil", price: 249, description: "Pure organic coconut oil", image: "/coconut-oil.jpg" },
  { id: 2, name: "Groundnut Oil", price: 299, description: "Healthy groundnut oil", image: "/groundnut-oil.jpg" },
  { id: 3, name: "Herbal Oils", price: 349, description: "Blend of natural herbs", image: "/herbal-oil.jpg" },
  { id: 4, name: "Combo Packs", price: 499, description: "Assorted oil packs", image: "/combo-pack.jpg" }
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  useEffect(() => {
    const saved = localStorage.getItem("vanamitraProducts");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("vanamitraProducts", JSON.stringify(newProducts));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const updated = products.map(p => p.id === editing ? { ...p, ...form } : p);
      saveProducts(updated);
      setEditing(null);
    } else {
      const newProduct = { ...form, id: Date.now(), price: Number(form.price) };
      saveProducts([...products, newProduct]);
    }
    setForm({ name: "", price: "", description: "", image: "" });
  };

  const editProduct = (product) => {
    setEditing(product.id);
    setForm(product);
  };

  const deleteProduct = (id) => {
    if (confirm("Delete this product?")) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px", padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
        <h3>{editing ? "Edit Product" : "Add New Product"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ margin: "5px", padding: "8px", width: "200px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          style={{ margin: "5px", padding: "8px", width: "100px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          style={{ margin: "5px", padding: "8px", width: "300px" }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          style={{ margin: "5px", padding: "8px", width: "200px" }}
        />
        <button type="submit" style={{ margin: "5px", padding: "8px 16px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: "4px" }}>
          {editing ? "Update" : "Add"} Product
        </button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", price: "", description: "", image: "" }); }} style={{ margin: "5px", padding: "8px 16px" }}>Cancel</button>}
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {products.map(p => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <img src={p.image} alt={p.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <button onClick={() => editProduct(p)} style={{ margin: "5px", padding: "5px 10px", background: "#ff9800", color: "#fff", border: "none", borderRadius: "4px" }}>Edit</button>
            <button onClick={() => deleteProduct(p.id)} style={{ margin: "5px", padding: "5px 10px", background: "#f44336", color: "#fff", border: "none", borderRadius: "4px" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
