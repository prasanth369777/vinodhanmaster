import { MessageCircle } from 'lucide-react';
export default function WhatsApp() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  return <a className="whatsapp-float" href={`https://wa.me/${number}?text=${encodeURIComponent('Hi NOVA, I have a question about your products.')}`} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><MessageCircle size={23}/><span>Chat with us</span></a>;
}