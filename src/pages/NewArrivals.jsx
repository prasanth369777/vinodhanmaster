import Shop from './Shop';
export default function NewArrivals({ products, onAdd }) {
 const fresh = products.filter(p => p.tag === 'NEW' || p.id > 4);
 return <Shop products={fresh} onAdd={onAdd} title="Just landed" subtitle="Fresh finds, thoughtful details, and new favourites waiting to happen." />;
}