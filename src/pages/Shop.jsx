import { useMemo, useState } from "react";
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
  { id: 1, name: "Brass Diya Lamp", category: "Spiritual Essentials", description: "A traditional brass lamp for your daily pooja rituals.", price: 699, rating: 4.8, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85", badge: "Bestseller" },
  { id: 2, name: "Traditional Pooja Thali", category: "Spiritual Essentials", description: "A thoughtfully designed plate for special ceremonies.", price: 899, rating: 4.7, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85" },
  { id: 3, name: "Handcrafted Incense Holder", category: "Spiritual Essentials", description: "Create a peaceful atmosphere with this elegant holder.", price: 349, rating: 4.6, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85" },
  { id: 4, name: "Meditation Cushion", category: "Home & Living", description: "A comfortable cushion for meditation and quiet moments.", price: 1199, rating: 4.8, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85", badge: "Popular" },
  { id: 5, name: "Wooden Prayer Beads", category: "Spiritual Essentials", description: "Classic wooden beads for meditation and mindful practice.", price: 499, rating: 4.5, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85" },
  { id: 6, name: "Ceramic Aroma Diffuser", category: "Home & Living", description: "A minimalist diffuser for a calming home atmosphere.", price: 1299, rating: 4.7, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85" },
  { id: 7, name: "Cotton Meditation Shawl", category: "Accessories", description: "A soft everyday layer for meditation and relaxation.", price: 799, rating: 4.4, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85" },
  { id: 8, name: "Brass Bell", category: "Traditional Treasures", description: "A timeless traditional bell for your prayer space.", price: 599, rating: 4.8, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85" },
  { id: 9, name: "Decorative Brass Bowl", category: "Traditional Treasures", description: "A versatile accent piece with a traditional finish.", price: 749, rating: 4.6, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85" },
  { id: 10, name: "Minimalist Table Vase", category: "Home & Living", description: "An understated decorative piece for modern interiors.", price: 649, rating: 4.5, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85" },
  { id: 11, name: "Handwoven Storage Basket", category: "Home & Living", description: "Keep your everyday essentials organised in style.", price: 899, rating: 4.7, image: "https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=800&q=85" },
  { id: 12, name: "Traditional Oil Lamp", category: "Spiritual Essentials", description: "A beautiful oil lamp inspired by traditional rituals.", price: 449, rating: 4.6, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85" },
  { id: 13, name: "Wooden Incense Tray", category: "Spiritual Essentials", description: "A natural wood tray for your incense collection.", price: 399, rating: 4.4, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85" },
  { id: 14, name: "Linen Cushion Cover", category: "Home & Living", description: "Bring texture and understated elegance to your home.", price: 549, rating: 4.6, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85" },
  { id: 15, name: "Handcrafted Wooden Tray", category: "Traditional Treasures", description: "A versatile tray for serving or decorative displays.", price: 999, rating: 4.7, image: "https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=800&q=85" },
  { id: 16, name: "Copper Water Bottle", category: "Traditional Treasures", description: "A reusable copper-finish bottle for daily use.", price: 799, rating: 4.5, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85" },
  { id: 17, name: "Everyday Tote Bag", category: "Accessories", description: "A practical carry-all for everyday errands.", price: 499, rating: 4.4, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85" },
  { id: 18, name: "Textured Ceramic Mug", category: "Home & Living", description: "A simple ceramic mug for your daily tea or coffee.", price: 399, rating: 4.7, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85" },
  { id: 19, name: "Decorative Candle Holder", category: "Home & Living", description: "Add a warm accent to your table or reading corner.", price: 599, rating: 4.5, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85" },
  { id: 20, name: "Traditional Kumkum Box", category: "Traditional Treasures", description: "A compact keepsake box for traditional essentials.", price: 299, rating: 4.6, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85" },
  { id: 21, name: "Meditation Journal", category: "Accessories", description: "A notebook for reflections and daily intentions.", price: 349, rating: 4.8, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85", badge: "New" },
  { id: 22, name: "Natural Wood Coasters", category: "Home & Living", description: "Protect your surfaces with a warm natural finish.", price: 449, rating: 4.5, image: "https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=800&q=85" },
  { id: 23, name: "Brass Pooja Plate", category: "Spiritual Essentials", description: "A traditional plate for worship and festive occasions.", price: 1099, rating: 4.8, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85" },
  { id: 24, name: "Cotton Table Runner", category: "Home & Living", description: "A textile accent for a welcoming dining table.", price: 699, rating: 4.4, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85" },
  { id: 25, name: "Handcrafted Gift Set", category: "Traditional Treasures", description: "A thoughtful collection for festive gifting.", price: 1499, rating: 4.9, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85", badge: "Gift pick" },
  { id: 26, name: "Minimalist Wall Hanging", category: "Home & Living", description: "A subtle decorative detail for a curated space.", price: 899, rating: 4.5, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85" },
  { id: 27, name: "Traditional Prayer Mat", category: "Spiritual Essentials", description: "A comfortable mat for prayer and reflection.", price: 799, rating: 4.6, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85" },
  { id: 28, name: "Everyday Travel Pouch", category: "Accessories", description: "Keep small essentials together on the go.", price: 399, rating: 4.4, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85" },
  { id: 29, name: "Decorative Ceramic Bowl", category: "Home & Living", description: "A versatile accent for a shelf, table or console.", price: 649, rating: 4.6, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85" },
  { id: 30, name: "Festive Brass Diya Set", category: "Traditional Treasures", description: "A coordinated diya set for celebrations.", price: 1299, rating: 4.9, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85", badge: "Special pick" },
];

const categories = [
  "All pieces",
  "Spiritual Essentials",
  "Traditional Treasures",
  "Home & Living",
  "Accessories",
];

function getName(product) {
  return product.name || product.title || "Thoughtful find";
}

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

function getDescription(product) {
  const value =
    product.shortDescription ||
    product.short_description ||
    product.description ||
    "A thoughtfully selected piece for everyday life.";

  return String(value).replace(/<[^>]*>/g, "").trim();
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
  const rating = Number(
    product.rating ?? product.average_rating ?? product.averageRating ?? 4.7
  );

  return Number.isFinite(rating) && rating > 0 ? rating : 4.7;
}

function getImage(product) {
  if (Array.isArray(product.images) && product.images.length) {
    const first = product.images[0];

    if (typeof first === "string") return first;

    if (first?.src || first?.url) return first.src || first.url;
  }

  return (
    product.image ||
    product.thumbnail ||
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85"
  );
}

function ProductTile({ product, onAdd }) {
  const name = getName(product);
  const image = getImage(product);
  const category = getCategory(product);
  const description = getDescription(product);
  const price = getPrice(product);
  const rating = getRating(product);

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e8e4d9] bg-white transition duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#f3f0e8]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85";
          }}
        />

        {product.badge && (
          <span className="absolute left-2 top-2 max-w-[75%] rounded-full bg-[#173d2b] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => onAdd?.(product)}
          aria-label={`Add ${name} to cart`}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#173d2b] shadow-md transition hover:bg-[#173d2b] hover:text-white sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <ShoppingCart size={17} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="mb-2 line-clamp-1 text-[9px] font-semibold uppercase tracking-wider text-[#8b7850] sm:text-[10px]">
          {category}
        </p>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-[#173d2b] sm:text-base">
          {name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-9 text-[11px] leading-5 text-[#77796f] sm:text-sm">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-1">
          <span className="text-sm font-semibold text-[#173d2b] sm:text-lg">
            ₹{price.toLocaleString("en-IN")}
          </span>

          <span className="flex items-center gap-1 text-[10px] text-[#6b705f] sm:text-xs">
            <Star size={13} className="fill-[#c6a45b] text-[#c6a45b]" />
            {rating.toFixed(1)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAdd?.(product)}
          className="mt-3 flex min-h-10 w-full items-center justify-center gap-1 rounded-full bg-[#173d2b] px-2 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#285b41] sm:mt-4 sm:gap-2 sm:text-xs"
        >
          <ShoppingBag size={14} />
          Add to cart
          <ArrowUpRight size={14} />
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
        [getName(product), getDescription(product), getCategory(product)]
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

  const specialPicks = [...allProducts]
    .sort((a, b) => getRating(b) - getRating(a))
    .slice(0, 4);

  const collectionCards = [
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
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf9f5] text-[#173d2b]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .vinodhan-shop,
        .vinodhan-shop * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .vinodhan-shop .product-grid {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .vinodhan-shop .product-grid > * {
          min-width: 0;
          opacity: 1;
          visibility: visible;
          transform: none;
        }

        @media (min-width: 640px) {
          .vinodhan-shop .product-grid {
            gap: 20px;
          }
        }

        @media (min-width: 1024px) {
          .vinodhan-shop .product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 24px;
          }
        }

        .vinodhan-shop img {
          display: block;
          max-width: 100%;
        }

        .vinodhan-shop button,
        .vinodhan-shop a,
        .vinodhan-shop input,
        .vinodhan-shop select {
          -webkit-tap-highlight-color: transparent;
        }

        .vinodhan-shop button:focus-visible,
        .vinodhan-shop a:focus-visible,
        .vinodhan-shop input:focus-visible,
        .vinodhan-shop select:focus-visible {
          outline: 2px solid #b49a63;
          outline-offset: 3px;
        }

        .vinodhan-shop .soft-grain {
          background-image: radial-gradient(rgba(255,255,255,.12) .7px, transparent .7px);
          background-size: 5px 5px;
        }

        @media (max-width: 380px) {
          .vinodhan-shop .product-grid {
            gap: 8px;
          }

          .vinodhan-shop .product-card-content {
            padding: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vinodhan-shop *,
          .vinodhan-shop *::before,
          .vinodhan-shop *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="vinodhan-shop">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#173d2b] px-5 py-14 text-white sm:px-8 sm:py-24 lg:py-28">
          <div className="soft-grain pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#d7c49a] sm:text-xs">
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
                  className="inline-flex items-center gap-3 rounded-full bg-[#d7c49a] px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#173d2b] transition hover:bg-white"
                >
                  Explore collection
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#featured-collections"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-xs text-white transition hover:bg-white/10"
                >
                  Our collections
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-5 text-xs text-white/70">
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

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-3 rounded-[40%] border border-white/10 sm:-inset-4" />
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=90"
                alt="Thoughtfully styled living space"
                className="relative h-[280px] w-full rounded-3xl object-cover sm:h-[430px]"
              />
              <div className="absolute -bottom-4 left-3 max-w-[220px] rounded-2xl bg-[#f5f0e5] p-4 text-[#173d2b] shadow-xl sm:bottom-5 sm:left-8 sm:p-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#8b7850]">
                  A little more meaning
                </p>
                <p className="mt-2 text-lg font-medium">
                  Made for everyday rituals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-b border-[#e8e4d9] bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-4 sm:px-8">
            {[
              ["01", "Thoughtful selection"],
              ["02", "Tradition inspired"],
              ["03", "Everyday essentials"],
              ["04", "Customer-first service"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-[#b49a63]">{number}</span>
                <span className="text-[9px] font-medium uppercase tracking-wide text-[#4c5a4d] sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        <section
          id="featured-collections"
          className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24"
        >
          <div className="mb-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
              Explore by category
            </p>
            <h2 className="text-3xl sm:text-4xl">Featured collections</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#77796f]">
              Find pieces that fit your home, traditions and everyday rituals.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {collectionCards.map((item) => (
              <button
                type="button"
                key={item.title}
                onClick={() => {
                  setCategory(item.title);
                  document
                    .getElementById("all-products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative min-h-[190px] overflow-hidden rounded-xl bg-[#eae6dc] text-left sm:min-h-[280px] sm:rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102b1e]/90 via-[#102b1e]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-6">
                  <p className="text-[9px] text-white/70 sm:text-[10px]">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-2 text-sm font-medium leading-tight sm:text-xl">
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] sm:gap-2 sm:text-xs">
                    Explore <ArrowUpRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ALL PRODUCTS */}
        <section
          id="all-products"
          className="scroll-mt-6 border-y border-[#e8e4d9] bg-[#f4f2eb] px-3 py-12 sm:px-8 sm:py-24"
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

            {/* Category filters */}
            <div className="mb-5 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full border px-3 py-2 text-[10px] transition sm:px-4 sm:text-xs ${
                    category === item
                      ? "border-[#173d2b] bg-[#173d2b] text-white"
                      : "border-[#dcd8cc] bg-white text-[#536052] hover:border-[#173d2b]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Search and sort */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto]">
              <label className="flex min-w-0 items-center gap-2 rounded-xl border border-[#ddd9ce] bg-white px-4 py-3">
                <Search size={16} className="shrink-0 text-[#7b8277]" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-[#9a9b91]"
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

              <label className="flex min-w-0 items-center gap-2 rounded-xl border border-[#ddd9ce] bg-white px-4 py-3">
                <SlidersHorizontal
                  size={15}
                  className="shrink-0 text-[#7b8277]"
                />
                <span className="shrink-0 text-xs text-[#6d7469]">Sort</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Sort products"
                  className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none"
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

            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-xs text-[#77796f]">
                Showing{" "}
                <span className="font-semibold text-[#173d2b]">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              {(category !== "All pieces" || search) && (
                <button
                  type="button"
                  onClick={() => {
                    setCategory("All pieces");
                    setSearch("");
                  }}
                  className="shrink-0 text-xs font-medium underline underline-offset-4"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Important: always-visible product grid; no scroll-reveal hiding */}
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
              <div className="rounded-2xl border border-dashed border-[#d5d0c3] bg-white px-5 py-16 text-center">
                <Search size={30} className="mx-auto text-[#a28a58]" />
                <h3 className="mt-5 text-2xl">No products found</h3>
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

        {/* WHY VINODHAN */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                The Vinodhan difference
              </p>
              <h2 className="max-w-lg text-3xl leading-tight sm:text-5xl">
                Thoughtful choices make everyday moments special.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#77796f]">
                Explore a considered mix of tradition-inspired pieces and
                everyday essentials.
              </p>
              <a
                href="#all-products"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#173d2b] px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#285b41]"
              >
                Find your favourites <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <Sparkles size={22} />,
                  title: "Considered selection",
                  description: "Explore a curated range inspired by tradition.",
                },
                {
                  icon: <ShieldCheck size={22} />,
                  title: "Careful attention",
                  description: "Clear product information helps you choose.",
                },
                {
                  icon: <PackageCheck size={22} />,
                  title: "Thoughtful gifting",
                  description: "Find meaningful pieces for special moments.",
                },
                {
                  icon: <Headphones size={22} />,
                  title: "Here to help",
                  description: "Reach out to our team if you need assistance.",
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

        {/* SPECIAL PICKS */}
        <section className="border-t border-[#e8e4d9] bg-white px-3 py-12 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                Worth a closer look
              </p>
              <h2 className="text-3xl sm:text-4xl">Special picks</h2>
              <p className="mt-3 text-sm text-[#77796f]">
                A few more pieces to inspire your next find.
              </p>
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

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setCategory("All pieces");
                  setSearch("");
                  setSort("featured");
                  document
                    .getElementById("all-products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#173d2b] px-6 py-3 text-xs font-semibold text-[#173d2b] transition hover:bg-[#173d2b] hover:text-white"
              >
                Browse all products <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="px-4 pb-14 sm:px-8 sm:pb-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#173d2b] px-5 py-12 text-center text-white sm:px-12 sm:py-16">
            <div className="soft-grain pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d7c49a]">
                Your next favourite awaits
              </p>
              <h2 className="mx-auto max-w-2xl text-3xl leading-tight sm:text-5xl">
                Bring home something meaningful.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70">
                Browse the collection and find something for your home,
                traditions or someone special.
              </p>
              <a
                href="#all-products"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#d7c49a] px-7 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#173d2b] transition hover:bg-white"
              >
                Shop the collection <ArrowRight size={16} />
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