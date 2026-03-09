import { useCart } from "../../context/CartContext.jsx";

const products = [
  { id: 1, name: "Coconut Oil", price: 249 },
  { id: 2, name: "Groundnut Oil", price: 299 },
  { id: 3, name: "Herbal Oils", price: 349 },
  { id: 4, name: "Combo Packs", price: 499 }
];

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div className="container">
      <h2>Shop Products</h2>
      <div className="grid" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
        {products.map(p => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button className="btn" onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}