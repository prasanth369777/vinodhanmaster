
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  X,
  ArrowUpRight,
 
  RotateCcw,
} from "lucide-react";
import { money } from "./ProductCard";

const suggestions = [
  "Pooja Essentials",
  "Meditation",
  "Rudraksha",
  "Spiritual Decor",
];

export default function SearchModal({
  open,
  onClose,
  products = [],
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return products.slice(0, 4);

    return products
      .filter((product) =>
        `${product.name} ${product.category} ${product.tone || ""}`
          .toLowerCase()
          .includes(term)
      )
      .slice(0, 5);
  }, [products, query]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => inputRef.current?.focus(), 100);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-[#10251a]/70 px-3 py-5 backdrop-blur-md sm:px-5 sm:py-10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Search Vinodhan products"
        className="animate-in fade-in slide-in-from-top-3 duration-300 relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#d7bd83]/40 bg-[#faf9f5] text-[#173d2b] shadow-2xl"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e9e5d9] px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173d2b] text-[#d7bd83]">
             
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-[0.22em]">
                VINODHAN
              </h2>
              <p className="mt-1 text-[10px] text-[#858779] sm:text-xs">
                Discover something meaningful
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eeeee6] transition duration-300 hover:rotate-90 hover:bg-[#e3dcc9]"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          {/* Search input */}
          <div className="group flex items-center gap-3 rounded-xl border border-[#deded3] bg-white px-4 transition duration-300 focus-within:border-[#a47b3d] focus-within:ring-4 focus-within:ring-[#a47b3d]/10">
            <Search
              size={21}
              className="shrink-0 text-[#a47b3d] transition-transform duration-300 group-focus-within:scale-110"
            />

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search spiritual essentials..."
              aria-label="Search products"
              className="h-14 w-full min-w-0 bg-transparent text-sm text-[#173d2b] outline-none placeholder:text-[#a0a296]"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="shrink-0 rounded-full p-2 text-[#697467] transition hover:bg-[#eeeee6]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Suggestions */}
          {!query.trim() && (
            <div className="mt-7">
              <p className="mb-3 text-[10px] font-semibold tracking-[0.18em] text-[#858779]">
                EXPLORE BY INTEREST
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="group flex items-center gap-2 rounded-full border border-[#e1e0d5] px-3 py-2 text-[11px] text-[#385341] transition duration-300 hover:border-[#173d2b] hover:bg-[#173d2b] hover:text-white"
                  >
                    {suggestion}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results heading */}
          <div className="mb-3 mt-7 flex items-center justify-between">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-[#858779]">
              {query.trim()
                ? "SEARCH RESULTS"
                : "THOUGHTFULLY CURATED"}
            </p>

            {query.trim() && (
              <span className="text-[11px] text-[#858779]">
                {results.length} {results.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {/* Product results */}
          {results.length > 0 ? (
            <div className="divide-y divide-[#e9e7dd]">
              {results.map((product, index) => (
                <Link
                  to="/shop"
                  key={product.id}
                  onClick={onClose}
                  className="group flex min-w-0 items-center gap-3 rounded-lg px-1 py-3 transition duration-300 hover:bg-[#f0f0e8] hover:px-3 sm:gap-4"
                  style={{
                    animation: "vinodhanResultIn 350ms ease both",
                    animationDelay: `${index * 55}ms`,
                  }}
                >
                  <div className="h-[62px] w-[58px] shrink-0 overflow-hidden rounded-lg bg-[#efeee6] sm:h-[72px] sm:w-[68px]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#173d2b] sm:text-sm">
                      {product.name}
                    </p>
                    <p className="mt-1.5 text-[10px] text-[#898d80] sm:text-xs">
                      {product.category}
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] font-semibold text-[#4b5d47] sm:text-sm">
                    {money(product.price)}
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-[#a47b3d] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-3 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#efeee6] text-[#a47b3d]">
                <Search size={24} />
              </div>

              <h3 className="mt-4 text-base font-semibold">
                No matching treasures found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-[#777d72]">
                Try another keyword, or explore our pooja and meditation
                essentials.
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#173d2b] px-4 py-3 text-xs font-medium text-white transition duration-300 hover:bg-[#28563d]"
              >
                <RotateCcw size={14} />
                Explore all products
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex flex-col gap-1 border-t border-[#e5e4da] pt-4 text-[9px] text-[#85887a] sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
            <span>Rooted in tradition.</span>
            <span>Meaningful finds for mindful living.</span>
          </div>
        </div>
      </section>

      {/* Component-local animation: no external CSS file needed */}
      <style>{`
        @keyframes vinodhanResultIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-in,
          .group,
          .group img {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
