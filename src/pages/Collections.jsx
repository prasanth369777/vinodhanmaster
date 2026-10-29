
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Compass,
  Heart,
  Leaf,
  MoveUpRight,
} from "lucide-react";
import { collections } from "../data/products";

/* Scroll reveal animation */
function Reveal({ children, className = "", delay = 0 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`vinodhan-reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const collectionDetails = [
  {
    subtitle: "RITUALS & REFLECTION",
    description:
      "Meaningful essentials that bring a sense of calm and intention to your everyday rituals.",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
    number: "01",
  },
  {
    subtitle: "ROOTED IN HERITAGE",
    description:
      "Traditional-inspired pieces that celebrate timeless craftsmanship and familiar comforts.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85",
    number: "02",
  },
  {
    subtitle: "A MORE THOUGHTFUL HOME",
    description:
      "Considered accents and everyday essentials that help make a space feel like yours.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    number: "03",
  },
  {
    subtitle: "THE FINISHING TOUCH",
    description:
      "Little details, useful companions and thoughtful finds for life on the move.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85",
    number: "04",
  },
];

const philosophyItems = [
  {
    icon: <Heart size={22} strokeWidth={1.5} />,
    title: "Chosen with intention",
    text: "A considered approach to the pieces we bring together.",
  },
  {
    icon: <Leaf size={22} strokeWidth={1.5} />,
    title: "Inspired by everyday life",
    text: "Collections shaped around how you live, gift and unwind.",
  },
  {
    icon: <Compass size={22} strokeWidth={1.5} />,
    title: "A little different",
    text: "Discover useful finds and distinctive details in one place.",
  },
];

const discoverySteps = [
  {
    number: "01",
    title: "Explore",
    text: "Browse collections that catch your eye.",
  },
  {
    number: "02",
    title: "Discover",
    text: "Find pieces suited to your everyday life.",
  },
  {
    number: "03",
    title: "Make it yours",
    text: "Choose your favourites and enjoy them your way.",
  },
];

export default function Collections() {
  const allCollections = Array.isArray(collections) ? collections : [];

  return (
    <main className="vinodhan-collections overflow-hidden bg-[#faf9f5] text-[#193d2b]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .vinodhan-collections {
          font-family: 'Poppins', sans-serif;
          --forest: #193d2b;
          --forest-light: #285b41;
          --gold: #d8c59a;
          --muted: #77796f;
          --cream: #faf9f5;
        }

        /* Poppins everywhere */
        .vinodhan-collections,
        .vinodhan-collections h1,
        .vinodhan-collections h2,
        .vinodhan-collections h3,
        .vinodhan-collections p,
        .vinodhan-collections a,
        .vinodhan-collections button,
        .vinodhan-collections span {
          font-family: 'Poppins', sans-serif;
        }

        .vinodhan-collections h1,
        .vinodhan-collections h2,
        .vinodhan-collections h3 {
          letter-spacing: -0.035em;
        }

        /* Scroll reveal */
        .vinodhan-reveal {
          opacity: 0;
          transform: translate3d(0, 30px, 0);
          transition:
            opacity 750ms ease,
            transform 750ms cubic-bezier(.2,.65,.25,1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .vinodhan-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* Hero entrance */
        .vinodhan-hero-copy {
          animation: vinodhanFadeUp 900ms cubic-bezier(.2,.65,.25,1) both;
        }

        .vinodhan-hero-visual {
          animation: vinodhanHeroEnter 1100ms cubic-bezier(.2,.65,.25,1) both;
          animation-delay: 160ms;
        }

        .vinodhan-hero-ring {
          animation: vinodhanRotate 36s linear infinite;
          transform-origin: center;
        }

        .vinodhan-floating-card {
          animation: vinodhanFloat 5s ease-in-out infinite;
        }

        .vinodhan-hero-image {
          transition: transform 900ms cubic-bezier(.2,.7,.2,1);
        }

        .vinodhan-hero-visual:hover .vinodhan-hero-image {
          transform: scale(1.045);
        }

        /* Collection cards */
        .vinodhan-collection-card {
          isolation: isolate;
          transition:
            transform 450ms cubic-bezier(.2,.7,.2,1),
            box-shadow 450ms ease;
        }

        .vinodhan-collection-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 55px rgba(25,61,43,.16);
        }

        .vinodhan-collection-image {
          transition: transform 1000ms cubic-bezier(.2,.7,.2,1);
        }

        .vinodhan-collection-card:hover .vinodhan-collection-image {
          transform: scale(1.075);
        }

        .vinodhan-card-arrow {
          transition:
            transform 350ms ease,
            background-color 350ms ease,
            color 350ms ease;
        }

        .vinodhan-collection-card:hover .vinodhan-card-arrow {
          background: var(--gold);
          color: var(--forest);
          transform: rotate(45deg);
        }

        .vinodhan-collection-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          border: 1px solid rgba(255,255,255,0);
          border-radius: inherit;
          transition: border-color 350ms ease;
        }

        .vinodhan-collection-card:hover::after {
          border-color: rgba(255,255,255,.35);
        }

        .vinodhan-image-shine {
          position: relative;
          overflow: hidden;
        }

        .vinodhan-image-shine::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -100%;
          width: 55%;
          height: 200%;
          transform: rotate(22deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.16),
            transparent
          );
          transition: left 900ms ease;
          pointer-events: none;
        }

        .vinodhan-image-shine:hover::after {
          left: 160%;
        }

        /* Buttons */
        .vinodhan-button {
          transition:
            transform 250ms ease,
            box-shadow 250ms ease,
            background-color 250ms ease;
        }

        .vinodhan-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(25,61,43,.13);
        }

        .vinodhan-button .vinodhan-button-icon {
          transition: transform 250ms ease;
        }

        .vinodhan-button:hover .vinodhan-button-icon {
          transform: translateX(4px);
        }

        .vinodhan-philosophy-card {
          transition:
            transform 400ms ease,
            background-color 400ms ease,
            border-color 400ms ease;
        }

        .vinodhan-philosophy-card:hover {
          transform: translateY(-5px);
          background-color: #faf9f5;
          border-color: #d8c59a;
        }

        .vinodhan-philosophy-icon {
          transition:
            transform 400ms ease,
            background-color 400ms ease;
        }

        .vinodhan-philosophy-card:hover .vinodhan-philosophy-icon {
          transform: rotate(-8deg) scale(1.08);
          background-color: #e5eadd;
        }

        .vinodhan-step-card {
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease;
        }

        .vinodhan-step-card:hover {
          transform: translateY(-5px);
          border-color: #c9b98e;
          box-shadow: 0 15px 35px rgba(25,61,43,.07);
        }

        .vinodhan-cta {
          position: relative;
          isolation: isolate;
        }

        .vinodhan-cta::before {
          content: "";
          position: absolute;
          z-index: -1;
          width: 380px;
          height: 380px;
          top: -220px;
          right: -120px;
          border: 1px solid rgba(216,197,154,.18);
          border-radius: 50%;
          box-shadow:
            0 0 0 35px rgba(216,197,154,.035),
            0 0 0 75px rgba(216,197,154,.025);
          animation: vinodhanPulse 7s ease-in-out infinite;
        }

        .vinodhan-cta::after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 220px;
          height: 220px;
          bottom: -150px;
          left: -70px;
          border: 1px solid rgba(216,197,154,.18);
          border-radius: 50%;
        }

        @keyframes vinodhanFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vinodhanHeroEnter {
          from {
            opacity: 0;
            transform: translate3d(30px, 12px, 0) scale(.97);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes vinodhanFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes vinodhanRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes vinodhanPulse {
          0%, 100% { transform: scale(.96); opacity: .65; }
          50% { transform: scale(1.06); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vinodhan-collections *,
          .vinodhan-collections *::before,
          .vinodhan-collections *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }

          .vinodhan-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#193d2b] px-5 py-16 text-white sm:px-8 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.09)_0.7px,transparent_0.7px)] bg-[length:6px_6px]" />
          <div className="vinodhan-hero-ring absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/10" />
          <div className="absolute -right-24 -top-24 h-[350px] w-[350px] rounded-full border border-white/[0.06]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_.85fr]">
          <div className="vinodhan-hero-copy">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8c59a] sm:text-xs">
              <span className="h-px w-8 bg-[#d8c59a]" />
              THE VINODHAN EDIT
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.18] sm:text-6xl lg:text-7xl">
              Find your kind
              <span className="mt-2 block font-normal text-[#d8c59a]">
                of meaningful.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              Explore considered collections inspired by tradition, everyday
              rituals and the little details that make a space feel like home.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#collection-list"
                className="vinodhan-button inline-flex items-center gap-3 rounded-full bg-[#d8c59a] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#193d2b]"
              >
                Explore collections
                <ArrowRight className="vinodhan-button-icon" size={16} />
              </a>

              <span className="text-xs text-white/60">
                Curated for the way you live.
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/65">
              <span className="flex items-center gap-2">
                <Heart size={15} className="text-[#d8c59a]" />
                Thoughtfully selected
              </span>
              <span className="flex items-center gap-2">
                <Leaf size={15} className="text-[#d8c59a]" />
                Inspired by tradition
              </span>
            </div>
          </div>

          <div className="vinodhan-hero-visual relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[45%] border border-white/10" />

            <div className="grid grid-cols-[1.15fr_.85fr] items-center gap-3">
              <div className="vinodhan-image-shine overflow-hidden rounded-tl-[100px] rounded-br-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85"
                  alt="Calm and thoughtfully styled living space"
                  className="vinodhan-hero-image h-[250px] w-full object-cover sm:h-[360px]"
                />
              </div>

              <div className="space-y-3 pt-12">
                <div className="vinodhan-image-shine rounded-tr-[60px]">
                  <img
                    src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=85"
                    alt="Traditional decorative details"
                    className="vinodhan-hero-image h-[125px] w-full rounded-tr-[60px] object-cover sm:h-[170px]"
                  />
                </div>

                <div className="vinodhan-image-shine rounded-bl-[60px]">
                  <img
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=85"
                    alt="Everyday essentials"
                    className="vinodhan-hero-image h-[105px] w-full rounded-bl-[60px] object-cover sm:h-[145px]"
                  />
                </div>
              </div>
            </div>

            <div className="vinodhan-floating-card absolute -bottom-5 left-5 rounded-xl border border-white/10 bg-[#244a36] px-5 py-4 shadow-xl sm:left-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#d8c59a]">
                A considered collection
              </p>
              <p className="mt-1 text-sm font-medium">
                Less clutter. More meaning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION INTRO */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[.7fr_1.3fr] md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                Curated, not crowded
              </p>

              <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
                Collections with a point of view.
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#77796f] md:justify-self-end md:text-base">
              Every collection has its own character. Whether you are looking
              for a meaningful gift, a traditional touch or something useful
              for everyday life, find a collection that speaks to you.
            </p>
          </div>
        </Reveal>
      </section>

      {/* MAIN COLLECTION GRID */}
      <section
        id="collection-list"
        className="scroll-mt-6 px-5 pb-16 sm:px-8 sm:pb-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e4e0d5] pb-5">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a28a58]">
                  Discover your next favourite
                </p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Explore all collections
                </h2>
              </div>

              <span className="text-xs text-[#77796f]">
                {allCollections.length} collections to discover
              </span>
            </div>
          </Reveal>

          {allCollections.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allCollections.map((collection, index) => {
                const detail =
                  collectionDetails[index % collectionDetails.length];

                const image = collection.image || detail.image;
                const count = collection.count || "Thoughtful finds";

                return (
                  <Reveal key={collection.name} delay={(index % 3) * 100}>
                    <Link
                      to="/shop"
                      className="vinodhan-collection-card group relative block min-h-[360px] overflow-hidden rounded-2xl bg-[#e9e4d9] sm:min-h-[430px]"
                    >
                      <img
                        src={image}
                        alt={collection.name}
                        loading="lazy"
                        className="vinodhan-collection-image absolute inset-0 h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#11291d]/95 via-[#11291d]/20 to-[#11291d]/5" />

                      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 text-white sm:p-6">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80">
                          {detail.number} / COLLECTION
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 transition-transform duration-300 group-hover:rotate-45">
                          <ArrowUpRight size={17} />
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-5 text-white sm:p-7">
                        <div className="max-w-[85%]">
                          <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#e4d1a5]">
                            {detail.subtitle}
                          </p>

                          <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
                            {collection.name}
                          </h3>

                          <p className="mt-3 text-xs leading-6 text-white/75">
                            {detail.description}
                          </p>

                          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
                            {count}
                          </p>
                        </div>

                        <span className="vinodhan-card-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#193d2b]">
                          <ArrowRight size={17} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-[#d9d3c6] bg-white px-6 py-16 text-center">
                <Sparkles size={28} className="mx-auto text-[#a28a58]" />
                <h3 className="mt-5 text-xl font-semibold sm:text-2xl">
                  Something thoughtful is coming.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#77796f]">
                  Add collection data to your products file to display your
                  collections here.
                </p>
                <Link
                  to="/shop"
                  className="vinodhan-button mt-6 inline-flex items-center gap-2 rounded-full bg-[#193d2b] px-6 py-3 text-xs font-semibold text-white"
                >
                  Explore the shop
                  <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* EXTRA SECTION 1: FEATURED COLLECTION */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <Reveal>
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-[#eee9de] md:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
              <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a28a58]">
                <Sparkles size={15} />
                The thoughtful edit
              </p>

              <h2 className="max-w-lg text-3xl font-semibold leading-tight sm:text-5xl">
                Little details. A more personal space.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#77796f]">
                Give your everyday surroundings a little more character with
                pieces chosen for their warmth, simplicity and timeless appeal.
              </p>

              <Link
                to="/shop"
                className="vinodhan-button mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#193d2b] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white"
              >
                Discover the edit
                <MoveUpRight
                  className="vinodhan-button-icon"
                  size={16}
                />
              </Link>
            </div>

            <div className="vinodhan-image-shine min-h-[280px] md:min-h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90"
                alt="Carefully styled home interior"
                loading="lazy"
                className="h-full min-h-[280px] w-full object-cover transition duration-700 hover:scale-105 md:min-h-[450px]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* EXTRA SECTION 2: OUR PHILOSOPHY */}
      <section className="border-y border-[#e7e2d7] bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                What guides our choices
              </p>

              <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
                More than things. A way of living.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#77796f]">
                We believe the right pieces are the ones that feel personal,
                purposeful and easy to make part of your life.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {philosophyItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>
                <article className="vinodhan-philosophy-card h-full rounded-2xl border border-[#e7e2d7] px-6 py-6 sm:px-7 sm:py-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#a28a58]">
                      0{index + 1}
                    </span>

                    <span className="vinodhan-philosophy-icon flex h-12 w-12 items-center justify-center rounded-full bg-[#f1eee5] text-[#193d2b]">
                      {item.icon}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-semibold sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#77796f]">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 3: HOW TO DISCOVER */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                Your journey starts here
              </p>

              <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
                Find pieces that feel like you.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#77796f]">
                Start with what matters to you. Explore different collections,
                discover something new and choose pieces that suit your life.
              </p>

              <Link
                to="/shop"
                className="vinodhan-button mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#193d2b]"
              >
                Browse all products
                <ArrowRight className="vinodhan-button-icon" size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-3">
            {discoverySteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 120}>
                <article className="vinodhan-step-card h-full rounded-2xl border border-[#e5e0d5] bg-[#f4f1e9] p-5 sm:p-6">
                  <span className="text-xs font-semibold text-[#a28a58]">
                    {step.number}
                  </span>

                  <h3 className="mt-8 text-xl font-semibold sm:text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[#77796f]">
                    {step.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <Reveal>
          <div className="vinodhan-cta mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#193d2b] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8c59a]">
              Your next favourite is waiting
            </p>

            <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
              Good things belong in everyday life.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70">
              Take a closer look at the collection and discover something
              meaningful for yourself or someone special.
            </p>

            <Link
              to="/shop"
              className="vinodhan-button mt-7 inline-flex items-center gap-3 rounded-full bg-[#d8c59a] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#193d2b]"
            >
              Shop the collection
              <ArrowRight className="vinodhan-button-icon" size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
