import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Star,
  Leaf,
  PackageCheck,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Truck,
  Check,
  Mail,
  Play,
  Pause,
} from 'lucide-react';
import { collections } from '../data/products';
const banners = [
  {
    eyebrow: 'THE WORLD OF VINODHAN',
    title: 'Tradition for a life filled with',
    emphasis: 'meaning.',
    description:
      'Discover spiritual essentials, traditional treasures, and thoughtful finds for your everyday rituals.',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1800&q=85',
    imageAlt: 'Warm, carefully styled traditional lifestyle objects',
    label: 'ROOTED IN TRADITION',
  },
  {
    eyebrow: 'THOUGHTFULLY SELECTED',
    title: 'Find beauty in the',
    emphasis: 'everyday.',
    description:
      'Explore considered collections that bring timeless inspiration into your home and daily life.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
    imageAlt: 'Thoughtfully styled interior with warm natural tones',
    label: 'MADE FOR TODAY',
  },
  {
    eyebrow: 'MEANINGFUL DISCOVERIES',
    title: 'Little things that make',
    emphasis: 'a difference.',
    description:
      'Discover products chosen with intention, presented with care, and made easy to explore.',
    image:
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1800&q=85',
    imageAlt: 'Elegant home accessories in a calm natural setting',
    label: 'MEANING IN EVERY CHOICE',
  },
];
const principles = [
  {
    icon: Leaf,
    title: 'Thoughtful curation',
    description:
      'Explore a considered selection of products inspired by tradition and everyday living.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear product details',
    description:
      'Find descriptions, prices, ratings, and available product information before choosing.',
  },
  {
    icon: PackageCheck,
    title: 'A simple shopping experience',
    description:
      'Browse collections, explore product details, and add your favourites to your cart.',
  },
  {
    icon: HeartHandshake,
    title: 'Here when you need us',
    description:
      'We aim to make discovering and choosing products a clear and welcoming experience.',
  },
];
const intentions = [
  {
    number: '01',
    title: 'Spiritual essentials',
    description: 'Explore products for meaningful daily rituals.',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '02',
    title: 'Traditional treasures',
    description: 'Discover details inspired by enduring heritage.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '03',
    title: 'Thoughtful discoveries',
    description: 'Find something distinctive for your everyday life.',
    image:
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=700&q=80',
  },
];
const formatPrice = (value) => {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'string') return value;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
};
function ProductCard({ product, onAdd }) {
  const image =
    product.image ||
    product.images?.[0]?.src ||
    product.images?.[0]?.url ||
    product.thumbnail ||
    '';
  const name = product.name || product.title || 'Vinodhan Product';
  const description =
    product.shortDescription ||
    product.short_description ||
    product.description ||
    product.excerpt ||
    '';
  const rating = Number(product.rating ?? product.average_rating ?? 0);
  const ratingCount = Number(
    product.ratingCount ?? product.rating_count ?? product.review_count ?? 0
  );
  const price = product.price ?? product.salePrice ?? product.sale_price;
  const regularPrice =
    product.regularPrice ?? product.regular_price ?? null;
  const productUrl = product.slug
    ? `/product/${product.slug}`
    : product.id
      ? `/product/${product.id}`
      : '/shop';
  const isVariable =
    product.type === 'variable' ||
    product.variations?.length > 0;
  const isOutOfStock =
    product.inStock === false ||
    product.in_stock === false ||
    product.stock_status === 'outofstock';
  const hasDescription =
    typeof description === 'string' && description.trim().length > 0;
  return (
    <article className="v-product-card group flex min-w-0 flex-col overflow-hidden rounded-sm border border-[#e9e1d4] bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl">
      <Link
        to={productUrl}
        className="relative block overflow-hidden bg-[#f5f1e9]"
      >
        <div className="aspect-[4/4.5] overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#a18b68]">
              <ShoppingBag size={40} strokeWidth={1} />
            </div>
          )}
        </div>
        {(product.onSale || product.on_sale) && (
          <span className="absolute left-3 top-3 bg-[#254634] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
            Sale
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#254634] shadow-md transition group-hover:bg-[#254634] group-hover:text-white">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link to={productUrl}>
          <h3 className="line-clamp-2 min-h-11 font-['Poppins',sans-serif] text-lg leading-snug text-[#233a2b] transition hover:text-[#a47b3d]">
            {name}
          </h3>
        </Link>
        {hasDescription ? (
          <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#817b70]">
            {description.replace(/<[^>]*>/g, '')}
          </p>
        ) : (
          <p className="mt-2 min-h-10 text-xs leading-5 text-[#817b70]">
            Discover more about this product and its details.
          </p>
        )}
        <div className="mt-3 flex min-h-5 items-center gap-2">
          <span
            className="flex items-center gap-0.5 text-[#b38a43]"
            aria-label={
              rating > 0
                ? `${rating} out of 5 stars`
                : 'Not yet rated'
            }
          >
            {[1, 2, 3, 4, 5].map((number) => (
              <Star
                key={number}
                size={12}
                fill={number <= Math.round(rating) ? 'currentColor' : 'none'}
                strokeWidth={1.5}
                className={
                  number <= Math.round(rating)
                    ? 'text-[#b38a43]'
                    : 'text-[#d8d0c3]'
                }
              />
            ))}
          </span>
          <span className="text-[10px] text-[#8d867a]">
            {rating > 0
              ? `${rating.toFixed(1)}${ratingCount ? ` (${ratingCount})` : ''}`
              : 'Not yet rated'}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {price !== undefined && price !== null && price !== '' ? (
            <>
              <span className="text-base font-semibold text-[#254634]">
                {formatPrice(price)}
              </span>
              {regularPrice &&
                Number(regularPrice) > Number(price) && (
                  <span className="text-xs text-[#a59c8f] line-through">
                    {formatPrice(regularPrice)}
                  </span>
                )}
            </>
          ) : (
            <span className="text-sm text-[#817b70]">
              View product for price
            </span>
          )}
        </div>
        <div className="mt-5 grid grid-cols-[1fr_46px] gap-2">
          <Link
            to={productUrl}
            className="flex min-h-11 items-center justify-center gap-2 bg-[#254634] px-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#a47b3d]"
          >
            Shop <ArrowUpRight size={14} />
          </Link>
          <button
            type="button"
            aria-label={`Add ${name} to cart`}
            title={isVariable ? 'Choose product options' : 'Add to cart'}
            disabled={isOutOfStock}
            onClick={() => {
              if (onAdd && !isOutOfStock) {
                onAdd(product);
              }
            }}
            className="flex min-h-11 items-center justify-center border border-[#254634] text-[#254634] transition hover:bg-[#254634] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag size={17} strokeWidth={1.6} />
          </button>
        </div>
        {isOutOfStock && (
          <p className="mt-2 text-xs text-red-700">Currently unavailable</p>
        )}
        {isVariable && !isOutOfStock && (
          <p className="mt-2 text-[10px] text-[#817b70]">
            Select options on the product page.
          </p>
        )}
      </div>
    </article>
  );
}
export default function Home({
  products = [],
  bestsellers,
  onAdd,
}) {
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const collectionTrack = useRef(null);
  const allProducts = Array.isArray(products) ? products : [];
  const featured = allProducts.slice(0, 15);
  const popularProducts =
    Array.isArray(bestsellers) && bestsellers.length > 0
      ? bestsellers.slice(0, 5)
      : allProducts.slice(0, 5);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % banners.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const track = collectionTrack.current;
    if (!track || collections.length < 2) return;
    let frame;
    let previousTime = 0;
    const scroll = (time) => {
      if (!track.matches(':hover')) {
        if (previousTime) {
          const delta = Math.min(time - previousTime, 40);
          track.scrollLeft += delta * 0.035;
          if (
            track.scrollLeft + track.clientWidth >=
            track.scrollWidth - 2
          ) {
            track.scrollLeft = 0;
          }
        }
      }
      previousTime = time;
      frame = window.requestAnimationFrame(scroll);
    };
    frame = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const currentBanner = banners[activeBanner];
  return (
    <main className="vinodhan-home overflow-hidden bg-[#fcfaf6] font-['Poppins',sans-serif] text-[#26372b]">
      {/* Load fonts in this file; no separate CSS required. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
      `}</style>
      {/* =======================
          1. THREE-SLIDE HERO
      ======================== */}
      <section className="relative isolate min-h-[590px] bg-[#f5f0e6] lg:min-h-[680px]">
        {banners.map((banner, index) => (
          <div
            key={banner.eyebrow}
            aria-hidden={index !== activeBanner}
            className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${
              index === activeBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.imageAlt}
              className="h-full w-full object-cover"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#151f18]/85 via-[#1c2b21]/60 to-[#1c2b21]/10" />
          </div>
        ))}
        <div className="relative mx-auto flex min-h-[590px] max-w-[1440px] items-center px-5 py-20 sm:px-8 lg:min-h-[680px] lg:px-16 xl:px-24">
          <div className="v-animate-in max-w-2xl text-white">
            <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-[#e7c58a] sm:text-xs">
              <span className="h-px w-9 bg-[#d5ad68]" />
              {currentBanner.eyebrow}
            </p>
            <h1 className="max-w-2xl font-['Poppins',sans-serif] text-5xl font-normal leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl xl:text-[84px]">
              {currentBanner.title}
              <br />
              <em className="text-[#dfbb7c]">
                {currentBanner.emphasis}
              </em>
            </h1>
            <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/85 sm:text-base sm:leading-8">
              {currentBanner.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/shop"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#d5ad68] px-6 py-3 text-xs font-semibold text-[#1e3024] transition hover:bg-white"
              >
                Explore the collection
                <ArrowUpRight size={17} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-b border-white/50 pb-2 text-xs font-medium text-white transition hover:border-[#dfbb7c] hover:text-[#dfbb7c]"
              >
                Our story
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs font-light text-white/80">
              <span className="flex h-8 w-8 items-center justify-center border border-[#d5ad68]/60 font-['Poppins',sans-serif] text-sm text-[#dfbb7c]">
                V.
              </span>
              Thoughtfully chosen. Inspired by tradition.
            </div>
          </div>
          <div className="absolute bottom-7 right-5 flex items-center gap-3 sm:right-8 lg:right-16 xl:right-24">
            <span className="mr-2 text-xs tracking-widest text-white">
              0{activeBanner + 1}
              <span className="text-white/50"> / 0{banners.length}</span>
            </span>
            <button
              type="button"
              aria-label="Previous banner"
              onClick={() =>
                setActiveBanner(
                  (activeBanner - 1 + banners.length) % banners.length
                )
              }
              className="flex h-10 w-10 items-center justify-center border border-white/50 text-white transition hover:bg-white hover:text-[#254634]"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              aria-label="Next banner"
              onClick={() =>
                setActiveBanner((activeBanner + 1) % banners.length)
              }
              className="flex h-10 w-10 items-center justify-center border border-white/50 text-white transition hover:bg-white hover:text-[#254634]"
            >
              <ChevronRight size={19} />
            </button>
          </div>
          <div className="absolute bottom-10 left-5 flex gap-2 sm:left-8 lg:left-16 xl:left-24">
            {banners.map((banner, index) => (
              <button
                type="button"
                key={banner.eyebrow}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={activeBanner === index}
                onClick={() => setActiveBanner(index)}
                className={`h-1 transition-all duration-300 ${
                  activeBanner === index
                    ? 'w-10 bg-[#dfbb7c]'
                    : 'w-5 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* =======================
          2. TRUST STRIP
      ======================== */}
      <section className="border-b border-[#e8dfd0] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-[#e8dfd0] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-16 xl:px-24">
          {[
            { icon: Leaf, label: 'Inspired by tradition' },
            { icon: PackageCheck, label: 'Thoughtfully selected' },
            { icon: HeartHandshake, label: 'Customer-first experience' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 py-5 text-xs font-medium text-[#5f675c] sm:py-7"
            >
              <Icon size={19} strokeWidth={1.5} className="text-[#a47b3d]" />
              {label}
            </div>
          ))}
        </div>
      </section>
      {/* =======================
          3. OUR PRODUCTS - 15
      ======================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-24">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
                THE VINODHAN COLLECTION
              </p>
              <h2 className="font-['Poppins',sans-serif] text-4xl font-normal sm:text-5xl">
                Our <em className="text-[#a47b3d]">products.</em>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#77776d]">
                Explore thoughtful finds for everyday rituals and meaningful
                moments.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 border-b border-[#cbb58f] pb-2 text-xs font-semibold text-[#26372b] hover:text-[#a47b3d]"
            >
              Shop all products <ArrowUpRight size={15} />
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {featured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                />
              ))}
            </div>
          ) : (
            <div className="border border-[#e8dfd0] bg-white px-5 py-14 text-center">
              <ShoppingBag
                size={30}
                strokeWidth={1.2}
                className="mx-auto mb-4 text-[#a47b3d]"
              />
              <h3 className="font-['Poppins',sans-serif] text-2xl">
                Our collection awaits.
              </h3>
              <p className="mt-3 text-sm text-[#77776d]">
                Add published products to your product data to display them
                here.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 bg-[#254634] px-6 py-3 text-xs font-semibold text-white hover:bg-[#a47b3d]"
              >
                Explore the shop <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </section>
      {/* =======================
          4. AUTO-SCROLLING COLLECTIONS
      ======================== */}
      <section className="overflow-hidden bg-[#f1ede3] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-24">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
                FIND YOUR STARTING POINT
              </p>
              <h2 className="font-['Poppins',sans-serif] text-4xl font-normal sm:text-5xl">
                Collections with <em>a purpose.</em>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#77776d]">
                Explore collections that reflect tradition, intention, and
                thoughtful living.
              </p>
            </div>
            <Link
              to="/collections"
              className="inline-flex w-fit items-center gap-2 border-b border-[#cbb58f] pb-2 text-xs font-semibold hover:text-[#a47b3d]"
            >
              View collections <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div
          ref={collectionTrack}
          className="flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-16 xl:px-24"
          style={{
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseEnter={(event) => {
            event.currentTarget.dataset.paused = 'true';
          }}
          onMouseLeave={(event) => {
            event.currentTarget.dataset.paused = 'false';
          }}
        >
          {[...collections, ...collections].map((collection, index) => (
            <Link
              to="/collections"
              key={`${collection.name}-${index}`}
              className="group relative block w-[260px] flex-none overflow-hidden bg-[#dcd4c5] sm:w-[310px] lg:w-[350px]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                {collection.image ? (
                  <img
                    src={collection.image}
                    alt={collection.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#a47b3d]">
                    <Sparkles size={40} strokeWidth={1} />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#16231a]/90 via-[#16231a]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <p className="mb-3 text-[10px] font-medium tracking-[0.2em] text-[#e7c58a]">
                  {collection.count || 'DISCOVER THE COLLECTION'}
                </p>
                <h3 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl">
                  {collection.name}
                </h3>
                <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-4 text-xs">
                  Explore collection
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 transition group-hover:bg-white group-hover:text-[#254634]">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-[1440px] px-5 text-[10px] text-[#827b6e] sm:px-8 lg:px-16 xl:px-24">
          Hover over the collections to pause the scroll. Swipe to browse on
          touchscreens.
        </p>
      </section>
      {/* =======================
          5. NEW ARRIVALS FEATURE
      ======================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-16 xl:px-24">
          <div className="relative">
            <div className="aspect-[5/4] overflow-hidden bg-[#eee6d8]">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Carefully arranged home decor with natural textures"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute bottom-5 left-5 bg-[#fcfaf6] px-4 py-3 text-[10px] font-semibold tracking-[0.16em] text-[#254634] sm:bottom-7 sm:left-7">
              THOUGHTFULLY SELECTED
            </span>
          </div>
          <div className="py-3 lg:py-10">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
              JUST ADDED
            </p>
            <h2 className="font-['Poppins',sans-serif] text-4xl leading-tight sm:text-5xl lg:text-6xl">
              New discoveries.
              <br />
              <em className="text-[#a47b3d]">Timeless meaning.</em>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[#77776d]">
              Meet the latest additions to Vinodhan. Discover products
              inspired by heritage and selected to make everyday moments
              feel more considered.
            </p>
            <Link
              to="/new-arrivals"
              className="mt-8 inline-flex min-h-12 items-center gap-3 bg-[#254634] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#a47b3d]"
            >
              Discover new arrivals <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      {/* =======================
          6. BESTSELLERS - 5
      ======================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-24">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
                CUSTOMER FAVOURITES
              </p>
              <h2 className="font-['Poppins',sans-serif] text-4xl sm:text-5xl">
                Bestsellers<span className="text-[#a47b3d]">.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#77776d]">
                Discover popular products from the Vinodhan collection.
              </p>
            </div>
            <Link
              to="/shop?orderby=popularity"
              className="inline-flex w-fit items-center gap-2 border-b border-[#cbb58f] pb-2 text-xs font-semibold hover:text-[#a47b3d]"
            >
              Explore the shop <ArrowRight size={15} />
            </Link>
          </div>
          {popularProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
              {popularProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                />
              ))}
            </div>
          ) : (
            <div className="border border-[#e9e1d4] px-5 py-12 text-center">
              <p className="text-sm text-[#77776d]">
                Products will appear here when your product data is available.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* =======================
          7. WHY CHOOSE VINODHAN
      ======================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
              THE VINODHAN DIFFERENCE
            </p>
            <h2 className="font-['Poppins',sans-serif] text-4xl sm:text-5xl">
              A more considered <em>experience.</em>
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#77776d]">
              Every step of discovering a product should feel clear,
              welcoming, and thoughtful.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[#e9e1d4] bg-[#e9e1d4] sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="bg-[#fcfaf6] p-7 transition hover:bg-white sm:p-8"
              >
                <span className="mb-8 flex h-12 w-12 items-center justify-center border border-[#d8c7a8] text-[#a47b3d]">
                  <Icon size={22} strokeWidth={1.4} />
                </span>
                <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-[#a47b3d]">
                  0{index + 1}
                </p>
                <h3 className="font-['Poppins',sans-serif] text-xl">
                  {title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-[#77776d]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* =======================
          8. SHOP BY INTENTION
      ======================== */}
      <section className="bg-[#eee8dc] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-24">
          <div className="mb-10">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
              FIND WHAT SPEAKS TO YOU
            </p>
            <h2 className="font-['Poppins',sans-serif] text-4xl sm:text-5xl">
              Shop by <em>intention.</em>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {intentions.map((item) => (
              <Link
                key={item.number}
                to="/collections"
                className="group relative min-h-[340px] overflow-hidden bg-[#d9d0bf] sm:min-h-[400px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18251b]/90 via-[#18251b]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#e7c58a]">
                    {item.number} / VINODHAN
                  </p>
                  <h3 className="font-['Poppins',sans-serif] text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-xs leading-6 text-white/80">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium">
                    Explore collection
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          9. ABOUT VINODHAN
      ======================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-16 xl:px-24">
          <div className="relative">
            <div className="aspect-[4/4.2] overflow-hidden bg-[#eee6d8]">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Warm, peaceful interior with natural textures and thoughtful decor"
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="absolute -bottom-5 right-4 max-w-[230px] border border-[#d9c7a5] bg-[#fcfaf6] p-5 shadow-lg sm:right-8 sm:p-6">
              <Leaf size={22} className="mb-3 text-[#a47b3d]" strokeWidth={1.4} />
              <p className="text-sm leading-6 text-[#254634]">
                Inspired by tradition. Chosen for meaningful everyday moments.
              </p>
            </div>
          </div>

          <div className="py-4 lg:py-10">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
              <span className="h-px w-9 bg-[#a47b3d]" />
              THE STORY BEHIND VINODHAN
            </p>
            <h2 className="max-w-xl text-4xl font-normal leading-tight text-[#26372b] sm:text-5xl lg:text-6xl">
              Tradition that feels <em className="text-[#a47b3d]">close to home.</em>
            </h2>
            <p className="mt-6 text-sm leading-8 text-[#77776d]">
              Vinodhan brings together spiritual essentials, traditional treasures,
              and thoughtful finds for the rituals and routines that make a home feel
              personal. We believe everyday objects can carry meaning when they are
              chosen with care.
            </p>
            <p className="mt-4 text-sm leading-8 text-[#77776d]">
              From pooja essentials to meditation-inspired pieces and meaningful gifts,
              our aim is to make discovering products simple, welcoming, and connected
              to the traditions you value.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 border-y border-[#e9e1d4] py-5 sm:grid-cols-3">
              {[
                { number: "01", title: "Rooted in tradition" },
                { number: "02", title: "Chosen with care" },
                { number: "03", title: "Made meaningful" },
              ].map((item) => (
                <div key={item.number}>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-[#a47b3d]">{item.number}</p>
                  <p className="mt-2 text-xs font-medium text-[#254634]">{item.title}</p>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex min-h-12 items-center gap-3 bg-[#254634] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#a47b3d]"
            >
              Discover our story <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =======================
          10. CUSTOMER TESTIMONIALS
          Replace illustrative copy with verified customer reviews before launch.
      ======================== */}
      <section className="bg-[#f1ede3] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
              KIND WORDS, MEANINGFUL MOMENTS
            </p>
            <h2 className="text-4xl font-normal text-[#26372b] sm:text-5xl">
              The experience <em className="text-[#a47b3d]">matters.</em>
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#77776d]">
              Thoughtful products deserve a thoughtful shopping experience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                quote: "The collection feels considered and easy to explore. I could find the kind of traditional piece I was looking for without feeling overwhelmed.",
                name: "Illustrative customer review",
                detail: "Replace with a verified review",
              },
              {
                quote: "I appreciate the calm presentation and clear product details. It makes choosing something meaningful feel simple.",
                name: "Illustrative customer review",
                detail: "Replace with a verified review",
              },
              {
                quote: "The spiritual and home-inspired collections bring together items that feel thoughtful rather than ordinary.",
                name: "Illustrative customer review",
                detail: "Replace with a verified review",
              },
            ].map((review, index) => (
              <article
                key={index}
                className="flex h-full flex-col border border-[#e1d8c8] bg-[#fcfaf6] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="flex gap-1 text-[#b38a43]" aria-label="Example five-star display">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} fill="currentColor" strokeWidth={1.2} />
                  ))}
                </div>
                <span className="mt-6 text-4xl leading-none text-[#c4a66e]">“</span>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#62695f]">{review.quote}</p>
                <div className="mt-7 border-t border-[#e9e1d4] pt-5">
                  <p className="text-xs font-semibold text-[#254634]">{review.name}</p>
                  <p className="mt-1 text-[10px] text-[#938a7b]">{review.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          11. FREQUENTLY ASKED QUESTIONS
      ======================== */}
      <section className="bg-[#fcfaf6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-16 xl:px-24">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-[#a47b3d]">
              <span className="h-px w-9 bg-[#a47b3d]" />
              NEED A LITTLE HELP?
            </p>
            <h2 className="text-4xl font-normal leading-tight text-[#26372b] sm:text-5xl">
              Frequently asked <em className="text-[#a47b3d]">questions.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#77776d]">
              Find answers to common questions about browsing, ordering, delivery,
              and caring for your Vinodhan finds.
            </p>
            <Link
              to="/faq"
              className="mt-7 inline-flex items-center gap-2 border-b border-[#cbb58f] pb-2 text-xs font-semibold text-[#254634] transition hover:text-[#a47b3d]"
            >
              View help and support <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="border-t border-[#e5ddcf]">
            {[
              {
                question: "How do I place an order?",
                answer: "Browse the shop, open a product to review its details, and add your selection to the cart. Follow the checkout steps shown on the website to submit your order."
              },
              {
                question: "Which payment methods are available?",
                answer: "Available payment options are displayed during checkout. Please review the options shown there before completing your purchase."
              },
              {
                question: "How can I check shipping and delivery details?",
                answer: "Delivery availability, charges, and estimated timelines can vary by destination and order. Check the shipping information shown at checkout or on the store's shipping policy page."
              },
              {
                question: "Can I return or exchange an item?",
                answer: "Return and exchange eligibility depends on the store's current policy and the product ordered. Please review the return policy before purchasing or contact customer support for help."
              },
              {
                question: "How should I care for brass and traditional items?",
                answer: "Care depends on the material and finish. Use the care instructions supplied with the item, and avoid harsh chemicals or abrasive cleaning materials unless the product guidance says otherwise."
              },
              {
                question: "How can I contact Vinodhan for help?",
                answer: "Use the contact or support details listed on the website. Include your order number when asking about an existing order so the team can identify it more easily."
              },
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <article key={faq.question} className="border-b border-[#e5ddcf]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                  >
                    <span className="pr-3 text-sm font-medium leading-6 text-[#254634] sm:text-base">
                      {faq.question}
                    </span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center border border-[#d9c7a5] text-[#a47b3d] transition duration-300 ${isOpen ? "rotate-180 bg-[#254634] text-white" : ""}`}>
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pr-10 text-xs leading-7 text-[#77776d] sm:text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

            
      <section className="relative overflow-hidden bg-[#203b2a] px-5 py-20 text-center text-white sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full border border-white/10 sm:h-[500px] sm:w-[500px]" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full border border-white/10 sm:h-[400px] sm:w-[400px]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-[10px] font-semibold tracking-[0.24em] text-[#e7c58a]">
            THE VINODHAN COLLECTION
          </p>
          <h2 className="font-['Poppins',sans-serif] text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Bring home a little
            <br />
            <em className="text-[#dfbb7c]">more meaning.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-7 text-white/75">
            Discover traditional treasures and spiritual essentials selected
            with intention. Find products that feel right for you.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[#d5ad68] px-7 py-3 text-xs font-semibold text-[#203b2a] transition hover:bg-white"
          >
            Explore the shop <ArrowUpRight size={17} />
          </Link>
          <div className="mx-auto mt-16 max-w-xl border-t border-white/20 pt-10">
            <Mail
              size={24}
              strokeWidth={1.3}
              className="mx-auto mb-4 text-[#dfbb7c]"
            />
            <h3 className="font-['Poppins',sans-serif] text-2xl">
              A thoughtful note, now and then.
            </h3>
            <p className="mt-3 text-xs leading-6 text-white/70">
              Subscribe for collection updates and news from Vinodhan.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
const youtubeVideos = [
  { id: 'YOUR_YOUTUBE_VIDEO_ID_1', title: 'The Vinodhan Story', category: 'OUR STORY' },
  { id: 'YOUR_YOUTUBE_VIDEO_ID_2', title: 'Tradition in Everyday Life', category: 'TRADITION' },
  { id: 'YOUR_YOUTUBE_VIDEO_ID_3', title: 'Discover Our Collection', category: 'COLLECTIONS' },
  { id: 'YOUR_YOUTUBE_VIDEO_ID_4', title: 'Meaningful Living', category: 'INSPIRATION' },
  { id: 'YOUR_YOUTUBE_VIDEO_ID_5', title: 'A Closer Look', category: 'DISCOVER' },
];
function YouTubeSpinCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const activeVideo = youtubeVideos[activeIndex];
  const rotation = -activeIndex * (360 / youtubeVideos.length);
  const validVideoId = activeVideo.id && !activeVideo.id.startsWith('YOUR_');
  const move = (direction) => {
    setActiveIndex((current) =>
      (current + direction + youtubeVideos.length) % youtubeVideos.length
    );
    setPlaying(false);
  };
  return (
    <section className="relative overflow-hidden bg-[#203b2a] py-16 text-white sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full border border-[#d5ad68]/20" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:px-16 xl:px-24">
        <div className="v-animate-in">
          <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-[#e7c58a]">
            <span className="h-px w-9 bg-[#d5ad68]" />
            WATCH & DISCOVER
          </p>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">
            Stories that bring
            <span className="mt-2 block text-[#dfbb7c]">meaning to life.</span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
            Explore the world of Vinodhan through videos, thoughtful discoveries,
            and stories inspired by tradition.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="inline-flex min-h-12 items-center gap-3 bg-[#d5ad68] px-6 text-xs font-semibold text-[#203b2a] transition hover:bg-white"
            >
              {playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
              {playing ? 'Stop video' : 'Play featured video'}
            </button>
            <a
              href={validVideoId ? `https://www.youtube.com/watch?v=${activeVideo.id}` : 'https://www.youtube.com/'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 border border-white/30 px-5 text-xs font-medium transition hover:border-[#d5ad68] hover:text-[#dfbb7c]"
            >
              Open YouTube <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-[10px] tracking-[0.18em] text-white/55">
            <span className="h-px w-10 bg-[#d5ad68]" />
            {String(activeIndex + 1).padStart(2, '0')} / {String(youtubeVideos.length).padStart(2, '0')}
            <span className="text-[#dfbb7c]">{activeVideo.category}</span>
          </div>
        </div>
        <div className="min-w-0">
          {playing && validVideoId ? (
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <p className="truncate text-xs font-medium">{activeVideo.title}</p>
                <button type="button" onClick={() => setPlaying(false)} className="shrink-0 text-xs text-[#dfbb7c] hover:text-white">
                  Close video
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="v-video-stage mx-auto max-w-[620px] overflow-hidden">
                <div className="v-video-ring" style={{ transform: `rotateY(${rotation}deg)` }}>
                  {youtubeVideos.map((video, index) => {
                    const angle = index * (360 / youtubeVideos.length);
                    const isActive = index === activeIndex;
                    const hasId = video.id && !video.id.startsWith('YOUR_');
                    return (
                      <div
                        key={video.id}
                        className="v-video-card"
                        style={{
                          transform: `rotateY(${angle}deg) translateZ(clamp(155px, 23vw, 245px))`,
                          opacity: isActive ? 1 : 0.72,
                          filter: isActive ? 'none' : 'brightness(.65)',
                          zIndex: isActive ? 5 : 1,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveIndex(index);
                            setPlaying(false);
                          }}
                          aria-label={`Select ${video.title}`}
                          className={`group relative overflow-hidden rounded-xl border text-left shadow-2xl transition duration-500 ${
                            isActive ? 'border-[#d5ad68]' : 'border-white/15'
                          }`}
                        >
                          {hasId ? (
                            <img
                              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#526a4d] via-[#263f2e] to-[#111f16]">
                              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #d5ad68 0, transparent 35%), radial-gradient(circle at 80% 80%, #ffffff 0, transparent 25%)' }} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#101b13]/95 via-[#101b13]/10 to-transparent" />
                          <span className="absolute left-3 top-3 text-[8px] font-semibold tracking-[0.2em] text-[#f0d39b]">
                            {video.category}
                          </span>
                          <span className="absolute left-1/2 top-[43%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d5ad68] text-[#203b2a] shadow-lg transition group-hover:scale-110">
                            <Play size={18} fill="currentColor" />
                          </span>
                          <span className="absolute inset-x-3 bottom-4 text-sm font-semibold leading-snug text-white">
                            {video.title}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button type="button" aria-label="Previous video" onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-[#203b2a]">
                  <ChevronLeft size={19} />
                </button>
                <button type="button" aria-label="Play selected video" onClick={() => setPlaying(true)} className="flex h-11 items-center justify-center gap-2 bg-[#d5ad68] px-5 text-xs font-semibold text-[#203b2a] transition hover:bg-white">
                  <Play size={14} fill="currentColor" /> Play selected
                </button>
                <button type="button" aria-label="Next video" onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-[#203b2a]">
                  <ChevronRight size={19} />
                </button>
              </div>
              <p className="mt-4 text-center text-[10px] text-white/45">
                Choose a card or use the arrows to spin through videos.
              </p>
            </div>
          )}
          {playing && !validVideoId && (
            <div className="rounded-xl border border-[#d5ad68]/40 bg-white/5 p-6 text-sm leading-7 text-white/80">
              Add your YouTube video IDs in the <code className="text-[#dfbb7c]">youtubeVideos</code> list at the top of this component to enable playback.
              <button type="button" onClick={() => setPlaying(false)} className="mt-4 block text-xs font-semibold text-[#dfbb7c]">Back to carousel</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    const subject = encodeURIComponent('Vinodhan newsletter subscription');
    const body = encodeURIComponent(
      `Please add this email to the Vinodhan newsletter: ${value}`
    );
    setMessage(
      'Your email app will open so you can send your subscription request.'
    );
    window.location.href =
      `mailto:?subject=${subject}&body=${body}`;
  };
  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="vinodhan-newsletter" className="sr-only">
        Email address
      </label>
      <input
        id="vinodhan-newsletter"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="min-h-12 min-w-0 flex-1 border border-white/25 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/55 focus:border-[#dfbb7c]"
      />
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d5ad68] px-6 text-xs font-semibold text-[#203b2a] transition hover:bg-white"
      >
        Subscribe <ArrowRight size={15} />
      </button>
      {message && (
        <p aria-live="polite" className="text-left text-xs text-white/80 sm:absolute sm:mt-16">
          {message}
        </p>
      )}
    </form>
  );
}
