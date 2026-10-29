
import { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  ShoppingCart,
  Search,
  SlidersHorizontal,
  ArrowRight,
  ArrowUpRight,
  Star,
  ShieldCheck,
  PackageCheck,
  Headphones,
  Sparkles,
  X,
} from "lucide-react";

const sampleProducts = [
  {
    id: 1,
    name: "Brass Diya Lamp",
    category: "Spiritual Essentials",
    description: "A traditional brass lamp for your daily pooja rituals.",
    price: 699,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Traditional Pooja Thali",
    category: "Spiritual Essentials",
    description: "A thoughtfully designed plate for special ceremonies.",
    price: 899,
    rating: 4.7,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "Handcrafted Incense Holder",
    category: "Spiritual Essentials",
    description: "Create a peaceful atmosphere with this elegant holder.",
    price: 349,
    rating: 4.6,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    name: "Meditation Cushion",
    category: "Home & Living",
    description: "A comfortable cushion for meditation and quiet moments.",
    price: 1199,
    rating: 4.8,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Wooden Prayer Beads",
    category: "Spiritual Essentials",
    description: "Classic wooden beads for meditation and mindful practice.",
    price: 499,
    rating: 4.5,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    name: "Ceramic Aroma Diffuser",
    category: "Home & Living",
    description: "A minimalist diffuser for a calming home atmosphere.",
    price: 1299,
    rating: 4.7,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 7,
    name: "Cotton Meditation Shawl",
    category: "Accessories",
    description: "A soft everyday layer for meditation and relaxation.",
    price: 799,
    rating: 4.4,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 8,
    name: "Brass Bell",
    category: "Traditional Treasures",
    description: "A timeless traditional bell for your prayer space.",
    price: 599,
    rating: 4.8,
    reviews: 101,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 9,
    name: "Decorative Brass Bowl",
    category: "Traditional Treasures",
    description: "A versatile accent piece with a traditional finish.",
    price: 749,
    rating: 4.6,
    reviews: 61,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 10,
    name: "Minimalist Table Vase",
    category: "Home & Living",
    description: "An understated decorative piece for modern interiors.",
    price: 649,
    rating: 4.5,
    reviews: 44,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 11,
    name: "Handwoven Storage Basket",
    category: "Home & Living",
    description: "Keep your everyday essentials organised in style.",
    price: 899,
    rating: 4.7,
    reviews: 57,
    image: "https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 12,
    name: "Traditional Oil Lamp",
    category: "Spiritual Essentials",
    description: "A beautiful oil lamp inspired by traditional rituals.",
    price: 449,
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 13,
    name: "Wooden Incense Tray",
    category: "Spiritual Essentials",
    description: "A natural wood tray for your incense collection.",
    price: 399,
    rating: 4.4,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 14,
    name: "Linen Cushion Cover",
    category: "Home & Living",
    description: "Bring texture and understated elegance to your home.",
    price: 549,
    rating: 4.6,
    reviews: 66,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 15,
    name: "Handcrafted Wooden Tray",
    category: "Traditional Treasures",
    description: "A versatile tray for serving or decorative displays.",
    price: 999,
    rating: 4.7,
    reviews: 49,
    image: "https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 16,
    name: "Copper Water Bottle",
    category: "Traditional Treasures",
    description: "A reusable copper-finish bottle for daily use.",
    price: 799,
    rating: 4.5,
    reviews: 83,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 17,
    name: "Everyday Tote Bag",
    category: "Accessories",
    description: "A practical carry-all for shopping and everyday errands.",
    price: 499,
    rating: 4.4,
    reviews: 59,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 18,
    name: "Textured Ceramic Mug",
    category: "Home & Living",
    description: "A simple ceramic mug for your daily tea or coffee.",
    price: 399,
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 19,
    name: "Decorative Candle Holder",
    category: "Home & Living",
    description: "Add a warm accent to your table or reading corner.",
    price: 599,
    rating: 4.5,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 20,
    name: "Traditional Kumkum Box",
    category: "Traditional Treasures",
    description: "A compact keepsake box for traditional essentials.",
    price: 299,
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 21,
    name: "Meditation Journal",
    category: "Accessories",
    description: "A dedicated notebook for reflections and daily intentions.",
    price: 349,
    rating: 4.8,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85",
    badge: "New",
  },
  {
    id: 22,
    name: "Natural Wood Coasters",
    category: "Home & Living",
    description: "Protect your surfaces with a warm natural finish.",
    price: 449,
    rating: 4.5,
    reviews: 36,
    image: "https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 23,
    name: "Brass Pooja Plate",
    category: "Spiritual Essentials",
    description: "A traditional plate for daily worship and festive occasions.",
    price: 1099,
    rating: 4.8,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 24,
    name: "Cotton Table Runner",
    category: "Home & Living",
    description: "A simple textile accent for a welcoming dining table.",
    price: 699,
    rating: 4.4,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 25,
    name: "Handcrafted Gift Set",
    category: "Traditional Treasures",
    description: "A thoughtful collection for festive and personal gifting.",
    price: 1499,
    rating: 4.9,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85",
    badge: "Gift pick",
  },
  {
    id: 26,
    name: "Minimalist Wall Hanging",
    category: "Home & Living",
    description: "A subtle decorative detail for a calm, curated space.",
    price: 899,
    rating: 4.5,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 27,
    name: "Traditional Prayer Mat",
    category: "Spiritual Essentials",
    description: "A comfortable mat for prayer and quiet reflection.",
    price: 799,
    rating: 4.6,
    reviews: 46,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 28,
    name: "Everyday Travel Pouch",
    category: "Accessories",
    description: "Keep small essentials together when you are on the go.",
    price: 399,
    rating: 4.4,
    reviews: 40,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 29,
    name: "Decorative Ceramic Bowl",
    category: "Home & Living",
    description: "A versatile accent for a shelf, table or console.",
    price: 649,
    rating: 4.6,
    reviews: 55,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 30,
    name: "Festive Brass Diya Set",
    category: "Traditional Treasures",
    description: "A coordinated diya set for celebrations and special evenings.",
    price: 1299,
    rating: 4.9,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85",
    badge: "Special pick",
  },
];

const categories = [
  "All pieces",
  "Spiritual Essentials",
  "Traditional Treasures",
  "Home & Living",
  "Accessories",
];

function getPrice(product) {
  const raw =
    product.salePrice ??
    product.sale_price ??
    product.price ??
    product.regular_price ??
    0;

  const value = Number(String(raw).replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function getName(product) {
  return product.name || product.title || "Thoughtful find";
}

function getDescription(product) {
  const description =
    product.shortDescription ||
    product.short_description ||
    product.description ||
    "A thoughtfully selected piece for your everyday life.";

  return String(description).replace(/<[^>]*>/g, "").trim();
}

function getCategory(product) {
  const category = product.category || product.categories;

  if (Array.isArray(category)) {
    return category[0]?.name || category[0] || "Traditional Treasures";
  }

  if (category && typeof category === "object") {
    return category.name || "Traditional Treasures";
  }

  return category || "Traditional Treasures";
}

function getRating(product) {
  const value = Number(
    product.rating ?? product.average_rating ?? product.averageRating ?? 4.7
  );

  return Number.isFinite(value) && value > 0 ? value : 4.7;
}

function getImage(product) {
  if (Array.isArray(product.images) && product.images.length) {
    return typeof product.images[0] === "string"
      ? product.images[0]
      : product.images[0]?.src || product.images[0]?.url;
  }

  return (
    product.image ||
    product.thumbnail ||
    product.images?.[0]?.src ||
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85"
  );
}

function ProductTile({ product, onAdd }) {
  const name = getName(product);
  const description = getDescription(product);
  const category = getCategory(product);
  const price = getPrice(product);
  const rating = getRating(product);
  const image = getImage(product);

  const handleAdd = () => {
    if (onAdd) {
      onAdd(product);
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e8e4d9] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#173d2b]/10">
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#f3f0e8]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          onError={(event) => {
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85";
          }}
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#173d2b] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${name} to cart`}
          title="Add to cart"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#173d2b] shadow-md transition hover:bg-[#173d2b] hover:text-white"
        >
          <ShoppingCart size={17} strokeWidth={1.8} />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b7850]">
          {category}
        </p>

        <h3 className="line-clamp-1 text-base font-semibold text-[#173d2b] sm:text-lg">
          {name}
        </h3>

        <p className="mt-2 min-h-[40px] line-clamp-2 text-xs leading-5 text-[#77796f] sm:text-sm">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-semibold text-[#173d2b]">
            ₹{price.toLocaleString("en-IN")}
          </span>

          <span className="flex items-center gap-1 text-xs font-medium text-[#6b705f]">
            <Star size={14} className="fill-[#c6a45b] text-[#c6a45b]" />
            {rating.toFixed(1)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#173d2b] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#285b41]"
        >
          <ShoppingBag size={15} />
          Shop now
          <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default function Shop({
  products = [],
  onAdd,
  title = "Shop thoughtfully",
  subtitle = "Explore meaningful essentials inspired by tradition, crafted for everyday living.",
}) {
  const [category, setCategory] = useState("All pieces");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const root = document.querySelector(".vinodhan-shop");
    if (!root) return;

    const targets = root.querySelectorAll(
      "#featured-collections, #all-products, .vinodhan-shop > section:not(:first-child), .vinodhan-shop footer"
    );
    targets.forEach((element) => element.classList.add("vinodhan-reveal"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const allProducts =
    Array.isArray(products) && products.length > 0 ? products : sampleProducts;

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    if (category !== "All pieces") {
      list = list.filter(
        (product) =>
          getCategory(product).toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      list = list.filter((product) =>
        [
          getName(product),
          getDescription(product),
          getCategory(product),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (sort === "price-low") {
      list.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "price-high") {
      list.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sort === "name") {
      list.sort((a, b) => getName(a).localeCompare(getName(b)));
    } else if (sort === "rating") {
      list.sort((a, b) => getRating(b) - getRating(a));
    } else if (sort === "newest") {
      list.reverse();
    }

    return list;
  }, [allProducts, category, search, sort]);

  const featuredProducts = allProducts.slice(0, 4);
  const specialPicks = [...allProducts]
    .sort((a, b) => getRating(b) - getRating(a))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#173d2b]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .vinodhan-shop,
        .vinodhan-shop * {
          font-family: 'Poppins', sans-serif;
        }

        .vinodhan-shop h1,
        .vinodhan-shop h2,
        .vinodhan-shop h3,
        .vinodhan-shop .serif-heading {
          font-family: 'Poppins', sans-serif;
          letter-spacing: -0.035em;
        }

        .vinodhan-shop .serif-heading { font-weight: 500; }

        @keyframes vinodhan-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vinodhan-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes vinodhan-image-zoom {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
        @keyframes vinodhan-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(215,196,154,0); }
          50% { box-shadow: 0 0 30px rgba(215,196,154,.15); }
        }

        .vinodhan-shop .vinodhan-hero-copy { animation: vinodhan-fade-up .85s cubic-bezier(.2,.7,.2,1) both; }
        .vinodhan-shop .vinodhan-hero-image { animation: vinodhan-fade-up 1s .15s cubic-bezier(.2,.7,.2,1) both; }
        .vinodhan-shop .vinodhan-float-card { animation: vinodhan-float 5s ease-in-out infinite; }
        .vinodhan-shop .vinodhan-reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        .vinodhan-shop .vinodhan-reveal.is-visible { opacity: 1; transform: translateY(0); }
        .vinodhan-shop .product-grid > article { animation: vinodhan-fade-up .65s both; }
        .vinodhan-shop .product-grid > article:nth-child(4n + 1) { animation-delay: .04s; }
        .vinodhan-shop .product-grid > article:nth-child(4n + 2) { animation-delay: .10s; }
        .vinodhan-shop .product-grid > article:nth-child(4n + 3) { animation-delay: .16s; }
        .vinodhan-shop .product-grid > article:nth-child(4n + 4) { animation-delay: .22s; }
        .vinodhan-shop button, .vinodhan-shop a { -webkit-tap-highlight-color: transparent; }
        .vinodhan-shop button:focus-visible, .vinodhan-shop a:focus-visible, .vinodhan-shop input:focus-visible, .vinodhan-shop select:focus-visible { outline: 2px solid #b49a63; outline-offset: 4px; }
        @media (prefers-reduced-motion: reduce) {
          .vinodhan-shop *, .vinodhan-shop *::before, .vinodhan-shop *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
          .vinodhan-shop .vinodhan-reveal { opacity: 1; transform: none; }
        }

        .vinodhan-shop .product-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        @media (min-width: 640px) {
          .vinodhan-shop .product-grid {
            gap: 22px;
          }
        }

        @media (min-width: 1024px) {
          .vinodhan-shop .product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 24px;
          }
        }

        .vinodhan-shop .soft-grain {
          background-image: radial-gradient(rgba(255,255,255,.12) .7px, transparent .7px);
          background-size: 5px 5px;
        }
      `}</style>

      <div className="vinodhan-shop">
        {/* SHOP HERO */}
        <section className="relative overflow-hidden bg-[#173d2b] px-5 py-16 text-white sm:px-8 sm:py-24 lg:py-28">
          <div className="soft-grain pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div className="vinodhan-hero-copy">
              <p className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#d7c49a] sm:text-xs">
                <Sparkles size={15} />
                THE VINODHAN COLLECTION
              </p>

              <h1 className="max-w-2xl text-4xl leading-[1.15] sm:text-6xl lg:text-7xl">
                Meaningful finds.
                <span className="mt-2 block italic text-[#d7c49a]">
                  Timeless living.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                Discover traditional treasures, spiritual essentials and
                thoughtful pieces that bring a little more meaning to everyday
                life.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#all-products"
                  className="inline-flex items-center gap-3 rounded-full bg-[#d7c49a] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#173d2b] transition hover:bg-white"
                >
                  Explore the collection
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#featured-collections"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-xs font-medium text-white transition hover:bg-white/10"
                >
                  Our collections
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#d7c49a]" />
                  Thoughtfully selected
                </span>
                <span className="flex items-center gap-2">
                  <PackageCheck size={16} className="text-[#d7c49a]" />
                  Carefully packed
                </span>
              </div>
            </div>

            <div className="vinodhan-hero-image relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-[40%] border border-white/10" />
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=90"
                alt="Warm, thoughtfully styled living space"
                className="relative h-[300px] w-full rounded-3xl object-cover sm:h-[430px]"
              />
              <div className="vinodhan-float-card absolute -bottom-5 left-4 max-w-[230px] rounded-2xl bg-[#f5f0e5] p-4 text-[#173d2b] shadow-xl sm:left-8 sm:p-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#8b7850]">
                  A little more meaning
                </p>
                <p className="serif-heading mt-2 text-xl">
                  Made for your everyday rituals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-b border-[#e8e4d9] bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-6 sm:grid-cols-4 sm:px-8">
            {[
              ["01", "Thoughtful selection"],
              ["02", "Tradition inspired"],
              ["03", "Everyday essentials"],
              ["04", "Customer-first service"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-3">
                <span className="text-xs text-[#b49a63]">{number}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#4c5a4d] sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* EXTRA SECTION 1: FEATURED COLLECTIONS */}
        <section
          id="featured-collections"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                Explore by category
              </p>
              <h2 className="text-3xl sm:text-4xl">Featured collections</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#77796f]">
                Find the pieces that fit your home, your traditions and your
                everyday rituals.
              </p>
            </div>

            <a
              href="#all-products"
              className="hidden items-center gap-2 pb-1 text-xs font-semibold sm:flex"
            >
              View all <ArrowRight size={15} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                title: "Spiritual Essentials",
                subtitle: "For moments of peace",
                image:
                  "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=85",
              },
              {
                title: "Traditional Treasures",
                subtitle: "Inspired by heritage",
                image:
                  "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=85",
              },
              {
                title: "Home & Living",
                subtitle: "Thoughtful everyday design",
                image:
                  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85",
              },
              {
                title: "Accessories",
                subtitle: "Little things, well chosen",
                image:
                  "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=85",
              },
            ].map((item) => (
              <button
                type="button"
                key={item.title}
                onClick={() => {
                  setCategory(item.title);
                  document
                    .getElementById("all-products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative min-h-[190px] overflow-hidden rounded-2xl bg-[#eae6dc] text-left sm:min-h-[280px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102b1e]/90 via-[#102b1e]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-white/70 sm:text-[10px]">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-2 text-lg font-medium leading-tight sm:text-xl">
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs">
                    Explore collection
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* MAIN PRODUCT SHOP */}
        <section
          id="all-products"
          className="scroll-mt-8 border-y border-[#e8e4d9] bg-[#f4f2eb] px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center sm:mb-12">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                The complete collection
              </p>
              <h2 className="text-3xl sm:text-5xl">{title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#77796f]">
                {subtitle}
              </p>
            </div>

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full border px-4 py-2.5 text-[10px] font-medium transition sm:text-xs ${
                      category === item
                        ? "border-[#173d2b] bg-[#173d2b] text-white"
                        : "border-[#dcd8cc] bg-white text-[#536052] hover:border-[#173d2b]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex min-w-0 items-center gap-2 rounded-full border border-[#ddd9ce] bg-white px-4 py-2.5 sm:min-w-[220px]">
                  <Search size={16} className="shrink-0 text-[#7b8277]" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="w-full bg-transparent text-xs outline-none placeholder:text-[#9a9b91]"
                  />
                  {search && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>

                <label className="flex items-center gap-2 rounded-full border border-[#ddd9ce] bg-white px-4 py-2.5">
                  <SlidersHorizontal size={15} className="text-[#7b8277]" />
                  <span className="text-xs text-[#6d7469]">Sort by</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    aria-label="Sort products"
                    className="max-w-[145px] bg-transparent text-xs font-medium outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Recently added</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="rating">Top rated</option>
                    <option value="name">Name A–Z</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs text-[#77796f]">
                Showing{" "}
                <span className="font-semibold text-[#173d2b]">
                  {filteredProducts.length}
                </span>{" "}
                thoughtfully chosen pieces
              </p>

              {category !== "All pieces" && (
                <button
                  type="button"
                  onClick={() => setCategory("All pieces")}
                  className="text-xs font-medium underline underline-offset-4"
                >
                  Clear category
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product, index) => (
                  <ProductTile
                    key={product.id ?? product.slug ?? `${getName(product)}-${index}`}
                    product={product}
                    onAdd={onAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[#d5d0c3] bg-white px-5 py-16 text-center">
                <Search size={30} className="mx-auto text-[#a28a58]" />
                <h3 className="serif-heading mt-5 text-2xl">
                  No pieces found
                </h3>
                <p className="mt-3 text-sm text-[#77796f]">
                  Try another search or browse the full collection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All pieces");
                  }}
                  className="mt-6 rounded-full bg-[#173d2b] px-6 py-3 text-xs font-semibold text-white"
                >
                  View all products
                </button>
              </div>
            )}
          </div>
        </section>

        {/* EXTRA SECTION 2: WHY VINODHAN */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                The Vinodhan difference
              </p>
              <h2 className="max-w-lg text-3xl leading-tight sm:text-5xl">
                Thoughtful choices make everyday moments special.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#77796f]">
                We believe the things you bring into your home should feel
                meaningful. Explore a considered mix of tradition-inspired
                pieces and everyday essentials.
              </p>

              <a
                href="#all-products"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#173d2b] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#285b41]"
              >
                Find your favourites
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <Sparkles size={22} />,
                  title: "Considered selection",
                  description:
                    "Explore a curated range inspired by tradition and everyday living.",
                },
                {
                  icon: <ShieldCheck size={22} />,
                  title: "Careful attention",
                  description:
                    "Product information is presented clearly to help you choose.",
                },
                {
                  icon: <PackageCheck size={22} />,
                  title: "Thoughtful gifting",
                  description:
                    "Find meaningful pieces for celebrations and special moments.",
                },
                {
                  icon: <Headphones size={22} />,
                  title: "Here to help",
                  description:
                    "Need help choosing? Reach out to our team for assistance.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#e8e4d9] bg-white p-5 sm:p-7"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf0e8] text-[#173d2b]">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-[#77796f]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXTRA SECTION 3: SPECIAL PICKS */}
        <section className="border-t border-[#e8e4d9] bg-white px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                  Worth a closer look
                </p>
                <h2 className="text-3xl sm:text-4xl">Special picks</h2>
                <p className="mt-3 text-sm text-[#77796f]">
                  A few more pieces to inspire your next find.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCategory("All pieces");
                  setSort("rating");
                  document
                    .getElementById("all-products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden items-center gap-2 text-xs font-semibold sm:flex"
              >
                Browse all
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="product-grid">
              {specialPicks.map((product, index) => (
                <ProductTile
                  key={`special-${product.id ?? getName(product)}-${index}`}
                  product={product}
                  onAdd={onAdd}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#173d2b] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <div className="soft-grain pointer-events-none absolute inset-0 opacity-30" />

            <div className="relative">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d7c49a]">
                Your next favourite awaits
              </p>
              <h2 className="mx-auto max-w-2xl text-3xl leading-tight sm:text-5xl">
                Bring home something meaningful.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70">
                Browse the collection and find something that feels just right
                for your home, your traditions or someone special.
              </p>
              <a
                href="#all-products"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#d7c49a] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#173d2b] transition hover:bg-white"
              >
                Shop the collection
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#e8e4d9] bg-[#faf9f5] px-5 py-6 text-center sm:px-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7b8277]">
            Vinodhan — Thoughtful finds for everyday living
          </p>
        </footer>
      </div>
    </main>
  );
}
