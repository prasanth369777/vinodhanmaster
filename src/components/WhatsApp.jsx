import { MessageCircle } from "lucide-react";

export default function WhatsApp() {
  const number = (
    import.meta.env.VITE_WHATSAPP_NUMBER || "917010054619"
  ).replace(/\D/g, "");

  const message = encodeURIComponent(
    "Hi, I have a question about your products."
  );

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={23} strokeWidth={2} />
      <span>Chat with us</span>
    </a>
  );
}