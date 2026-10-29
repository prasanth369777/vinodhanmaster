
const image = {
  stone: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85",
  mala: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=85",
  decor: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=85",
  pooja: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  meditation: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85",
  aroma: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
  book: "https://images.unsplash.com/photo-1512825098772-0a7c7e9c1b3b?auto=format&fit=crop&w=900&q=85",
  jewelry: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85",
  bracelet: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
  gift: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=85",
};

export const products = [
  { id: 1, name: "Shungite is a rare black stone", category: "Crystals & Stones", price: 3000, oldPrice: 5000, tag: "SALE", image: image.stone, tone: "Black Stone", status: "Active" },
  { id: 2, name: "Naga Guru Jaya Rasamani", category: "Rasamani", price: 20000, image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 3, name: "100 Years Antiques Ebony Karungali Mani", category: "Sacred Accessories", price: 1, oldPrice: 100000, tag: "SALE", image: image.mala, tone: "Ebony", status: "Active" },
  { id: 4, name: "Business Money Attract Rocket Cone", category: "Spiritual Products", price: 10000, oldPrice: 20000, tag: "SALE", image: image.decor, tone: "Spiritual Product", status: "Active" },
  { id: 5, name: "Kuppa Muni Anubava Vaithiya Murai", category: "Books", price: 200, oldPrice: 1000, tag: "SALE", image: image.book, tone: "Book", status: "Out of stock" },
  { id: 6, name: "Ebony ring (Karungali moundram)", category: "Sacred Accessories", price: 2000, oldPrice: 4500, tag: "SALE", image: image.jewelry, tone: "Ebony", status: "Active" },
  { id: 7, name: "Sengali Bangle", category: "Sacred Accessories", price: 4300, oldPrice: 6000, tag: "SALE", image: image.bracelet, tone: "Traditional Bangle", status: "Active" },
  { id: 8, name: "Tibetan Bronze Singing Bowl", category: "Meditation", price: 8000, oldPrice: 13000, tag: "SALE", image: image.meditation, tone: "Bronze", status: "Active" },
  { id: 9, name: "SPHATIK MALA – 100% QUARTZ CRYSTAL (108 BEADS)", category: "Sacred Accessories", price: 1300, oldPrice: 12000, tag: "SALE", image: image.mala, tone: "Quartz Crystal", status: "Active" },
  { id: 10, name: "1 To 21 Faces Lord Shiva Rudraksha", category: "Rudraksha", price: 350, oldPrice: 4500, tag: "SALE", image: image.mala, tone: "Rudraksha", status: "Active" },
  { id: 11, name: "5 Mukhi Kaalagni.", category: "Rudraksha", price: 500, oldPrice: 5000, tag: "SALE", image: image.mala, tone: "Rudraksha", status: "Active" },
  { id: 12, name: "4 Mukhi Rudraksha", category: "Rudraksha", price: 750, oldPrice: 7000, tag: "SALE", image: image.mala, tone: "Rudraksha", status: "Active" },
  { id: 13, name: "3 Mukhi Miraculous faced Rudraksha", category: "Rudraksha", price: 700, oldPrice: 6800, tag: "SALE", image: image.mala, tone: "Rudraksha", status: "Active" },
  { id: 14, name: "2 Face Mukhi Rudraksha", category: "Rudraksha", price: 600, oldPrice: 5000, tag: "SALE", image: image.mala, tone: "Rudraksha", status: "Active" },
  { id: 15, name: "Original 1 Mukhi Faced Neapli Rudraksha Round Bead One Mukhi from Nepal with Lab Report", category: "Rudraksha", price: 1999, oldPrice: 9500, tag: "SALE", image: image.mala, tone: "Rudraksha", status: "Active" },
  { id: 16, name: "Healing Activation Wand", category: "Spiritual Products", price: 2888, oldPrice: 5000, tag: "SALE", image: image.decor, tone: "Healing Tool", status: "Active" },
  { id: 17, name: "Onv Angel Powerful Ritual Stone", category: "Spiritual Products", price: 4600, oldPrice: 7000, tag: "SALE", image: image.stone, tone: "Ritual Stone", status: "Active" },
  { id: 18, name: "Vasiya Rasamani", category: "Rasamani", price: 15500, oldPrice: 95000, tag: "SALE", image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 19, name: "Navaloga Rasamani", category: "Rasamani", price: 20000, oldPrice: 96000, tag: "SALE", image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 20, name: "Monovasiya Rasamani", category: "Rasamani", price: 17000, oldPrice: 99700, tag: "SALE", image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 21, name: "Divine Magic Crystal", category: "Crystals & Stones", price: 1000, oldPrice: 3500, tag: "SALE", image: image.stone, tone: "Crystal", status: "Active" },
  { id: 22, name: "jaladeepam water Lamp", category: "Pooja Essentials", price: 400, oldPrice: 1200, tag: "OUT OF STOCK", image: image.pooja, tone: "Water Lamp", status: "Out of stock" },
  { id: 23, name: "One Large Aura Quartz Crystal", category: "Crystals & Stones", price: null, image: image.stone, tone: "Quartz Crystal", status: "Active" },
  { id: 24, name: "Lucky Stone", category: "Crystals & Stones", price: 1200, oldPrice: 3000, tag: "SALE", image: image.stone, tone: "Natural Stone", status: "Active" },
  { id: 25, name: "ONV ANGEL ENERGISE STATUE", category: "Spiritual Decor", price: 2000, oldPrice: 3500, tag: "SALE", image: image.decor, tone: "Decorative Statue", status: "Active" },
  { id: 26, name: "Healer Manifest Pendulum", category: "Spiritual Products", price: 350, oldPrice: 600, tag: "SALE", image: image.bracelet, tone: "Pendulum", status: "Active" },
  { id: 27, name: "Original Panchmukhi", category: "Rudraksha", price: 1200, oldPrice: 3000, tag: "SALE", image: image.mala, tone: "Rudraksha", status: "Active" },
  { id: 28, name: "Energize Money Tree", category: "Spiritual Decor", price: 3200, oldPrice: 6000, tag: "SALE", image: image.decor, tone: "Decorative Tree", status: "Active" },
  { id: 29, name: "Tambana Rasamani", category: "Rasamani", price: 5000, oldPrice: 100000, tag: "SALE", image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 30, name: "Atchaya Rasamani", category: "Rasamani", price: 15500, oldPrice: 93000, tag: "SALE", image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 31, name: "Pranic powder", category: "Spiritual Products", price: 900, oldPrice: 1900, tag: "SALE", image: image.aroma, tone: "Powder", status: "Active" },
  { id: 32, name: "PINEAL MANIPURA", category: "Spiritual Products", price: 1200, oldPrice: 2000, tag: "SALE", image: image.aroma, tone: "Spiritual Product", status: "Active" },
  { id: 33, name: "THIRD EYE POWDER", category: "Spiritual Products", price: 380, oldPrice: 500, tag: "OUT OF STOCK", image: image.aroma, tone: "Powder", status: "Out of stock" },
  { id: 34, name: "PINEAL ACTIVATOR", category: "Spiritual Products", price: 4000, oldPrice: 8000, tag: "OUT OF STOCK", image: image.decor, tone: "Spiritual Product", status: "Out of stock" },
  { id: 35, name: "Powerful Magnetic Wand", category: "Spiritual Products", price: 6500, oldPrice: 8000, tag: "SALE", image: image.decor, tone: "Wand", status: "Active" },
  { id: 36, name: "Turquoise stone Money Agarshanam stone for money attracting", category: "Crystals & Stones", price: 5500, oldPrice: 12000, tag: "SALE", image: image.stone, tone: "Turquoise Stone", status: "Active" },
  { id: 37, name: "Gnana Rasamani", category: "Rasamani", price: 17500, oldPrice: 55000, tag: "SALE", image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 38, name: "Jothi Rasamani (Parad Gutika)", category: "Rasamani", price: 16000, oldPrice: 40000, tag: "SALE", image: image.mala, tone: "Rasamani", status: "Active" },
  { id: 39, name: "TUSK POWDER", category: "Aroma Herbal", price: 750, oldPrice: 800, tag: "SALE", image: image.aroma, tone: "Aroma Herbal", status: "Active" },
  { id: 40, name: "PYRAMID", category: "Aroma Herbal", price: 35000, oldPrice: 40000, tag: "SALE", image: image.decor, tone: "Aroma Herbal", status: "Active" },
  { id: 41, name: "MAGIC STICKS", category: "Aroma Herbal", price: 660, oldPrice: 700, tag: "SALE", image: image.aroma, tone: "Aroma Herbal", status: "Active" },
];

const categoryImages = {
  "Aroma Herbal": image.aroma,
  Books: image.book,
  "Crystals & Stones": image.stone,
  Meditation: image.meditation,
  "Pooja Essentials": image.pooja,
  Rasamani: image.mala,
  Rudraksha: image.mala,
  "Sacred Accessories": image.jewelry,
  "Spiritual Decor": image.decor,
  "Spiritual Products": image.decor,
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const collections = [
  ...new Set(products.map((product) => product.category)),
].map((category) => {
  const count = products.filter(
    (product) => product.category === category
  ).length;

  return {
    name: category,
    count: `${count} ${count === 1 ? "product" : "products"}`,
    image: categoryImages[category] || image.decor,
    slug: slugify(category),
  };
});

export const formatPrice = (price) => {
  if (price == null || price === "") return "Price on request";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default products;
