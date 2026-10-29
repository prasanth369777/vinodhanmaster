import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { money } from './ProductCard';
export default function CartDrawer({ open, onClose, cart, onQty, onRemove }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (!open) return null;
  return <div className="drawer-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><aside className="cart-drawer">
    <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cart.reduce((s, x) => s + x.qty, 0)})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close cart"><X/></button></div>
    {cart.length === 0 ? <div className="empty-cart"><div className="empty-icon">N.</div><h3>Your bag is taking a breather.</h3><p>Find something you’ll love using every day.</p><button className="btn btn-dark" onClick={onClose}>Continue shopping</button></div> : <>
      <div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><p>{money(item.price)}</p><div className="qty-control"><button onClick={() => onQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => onQty(item.id, 1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => onRemove(item.id)} aria-label="Remove item"><Trash2 size={16}/></button></div>)}</div>
      <div className="drawer-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="btn btn-dark full-width" onClick={() => alert('Demo cart: connect your secure backend checkout before taking payments.')}>Continue to checkout <span>↗</span></button><small>Secure checkout · Easy returns</small></div>
    </>}
  </aside></div>;
}