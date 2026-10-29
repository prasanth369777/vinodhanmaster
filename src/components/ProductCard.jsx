import { Heart, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
export const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export default function ProductCard({ product, onAdd }) {
  const [saved, setSaved] = useState(false);
  return <article className="product-card">
    <div className="product-image-wrap"><img src={product.image} alt={product.name} loading="lazy"/>{product.tag && <span className="product-tag">{product.tag}</span>}
      <button className={`wishlist ${saved ? 'saved' : ''}`} aria-label="Save product" onClick={() => setSaved(!saved)}><Heart size={17} fill={saved ? 'currentColor' : 'none'}/></button>
      <button className="quick-add" onClick={() => onAdd(product)}>Quick add <ArrowUpRight size={15}/></button>
    </div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.tone} · {product.category}</p></div><strong>{money(product.price)}</strong></div>
  </article>;
}