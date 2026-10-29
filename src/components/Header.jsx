
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Leaf,
} from "lucide-react";

const links = [
  ["Shop", "/shop"],
  ["Collections", "/collections"],
  ["New Arrivals", "/new-arrivals"],
  ["Our Story", "/about"],
];

export default function Header({
  cartCount = 0,
  onCart,
  onSearch,
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`vinodhan-header ${scrolled ? "is-scrolled" : ""}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .vinodhan-header {
          --vh-green: #173d2b;
          --vh-green-light: #28543b;
          --vh-gold: #d7bd83;
          --vh-cream: #faf8f2;
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          font-family: 'Poppins', sans-serif;
          background: var(--vh-cream);
          color: var(--vh-green);
          transition: box-shadow .3s ease, background .3s ease;
        }

        .vinodhan-header *,
        .vinodhan-header *::before,
        .vinodhan-header *::after {
          box-sizing: border-box;
        }

        .vinodhan-header a {
          text-decoration: none;
        }

        .vinodhan-header.is-scrolled {
          box-shadow: 0 8px 28px rgba(23,61,43,.08);
          background: rgba(250,248,242,.97);
          backdrop-filter: blur(14px);
        }

        .vh-announcement {
          min-height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 7px 16px;
          background: var(--vh-green);
          color: #fff;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: .08em;
          text-align: center;
          animation: vh-announce-in .6s ease both;
        }

        .vh-announcement-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--vh-gold);
          flex: 0 0 auto;
        }

        .vh-announcement-highlight {
          color: var(--vh-gold);
        }

        .vh-nav-wrap {
          width: min(1380px, calc(100% - 64px));
          min-height: 86px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 28px;
          transition: min-height .3s ease;
        }

        .is-scrolled .vh-nav-wrap {
          min-height: 72px;
        }

        .vh-wordmark {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          color: var(--vh-green);
          font-size: 30px;
          font-weight: 600;
          letter-spacing: -.07em;
          line-height: 1;
          animation: vh-brand-in .65s ease both;
        }

        .vh-wordmark span {
          color: #b39457;
          display: inline-block;
          transition: transform .3s ease;
        }

        .vh-wordmark:hover span {
          transform: translateY(-4px);
        }

        .vh-desktop-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(20px, 3vw, 43px);
        }

        .vh-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          min-height: 40px;
          color: #62695f;
          font-size: 11px;
          font-weight: 400;
          white-space: nowrap;
          transition: color .25s ease;
        }

        .vh-nav-link::after {
          content: "";
          position: absolute;
          bottom: 3px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #b39457;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform .3s ease;
        }

        .vh-nav-link:hover,
        .vh-nav-link.nav-active {
          color: var(--vh-green);
        }

        .vh-nav-link:hover::after,
        .vh-nav-link.nav-active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .vh-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
        }

        .vh-icon-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          flex: 0 0 auto;
          padding: 0;
          border: 1px solid transparent;
          border-radius: 50%;
          background: transparent;
          color: var(--vh-green);
          cursor: pointer;
          transition:
            color .25s ease,
            background .25s ease,
            border-color .25s ease,
            transform .25s ease;
        }

        .vh-icon-button:hover {
          background: #eee9dc;
          border-color: #e5ddcb;
          transform: translateY(-2px);
        }

        .vh-icon-button:focus-visible,
        .vh-nav-link:focus-visible,
        .vh-mobile-link:focus-visible {
          outline: 2px solid #b39457;
          outline-offset: 4px;
        }

        .vh-cart-count {
          position: absolute;
          top: 2px;
          right: 0;
          min-width: 17px;
          height: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          border: 2px solid var(--vh-cream);
          border-radius: 20px;
          background: #b39457;
          color: #fff;
          font-size: 8px;
          font-weight: 600;
          line-height: 1;
          animation: vh-badge-in .35s ease both;
        }

        .vh-mobile-toggle {
          display: none;
        }

        .vh-mobile-panel {
          display: none;
        }

        @keyframes vh-announce-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes vh-brand-in {
          from {
            opacity: 0;
            transform: translateY(-7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vh-badge-in {
          from { transform: scale(.65); }
          to { transform: scale(1); }
        }

        @media (min-width: 769px) {
          .vh-desktop-links .vh-nav-link:nth-child(1) {
            animation: vh-brand-in .45s .05s both;
          }
          .vh-desktop-links .vh-nav-link:nth-child(2) {
            animation: vh-brand-in .45s .1s both;
          }
          .vh-desktop-links .vh-nav-link:nth-child(3) {
            animation: vh-brand-in .45s .15s both;
          }
          .vh-desktop-links .vh-nav-link:nth-child(4) {
            animation: vh-brand-in .45s .2s both;
          }
        }

        @media (max-width: 900px) {
          .vh-nav-wrap {
            width: calc(100% - 36px);
            gap: 16px;
          }

          .vh-desktop-links {
            gap: 17px;
          }

          .vh-nav-link {
            font-size: 10px;
          }

          .vh-wordmark {
            font-size: 26px;
          }

          .vh-actions {
            gap: 4px;
          }
        }

        @media (max-width: 768px) {
          .vh-announcement {
            min-height: 32px;
            gap: 7px;
            font-size: 8px;
            letter-spacing: .035em;
          }

          .vh-nav-wrap,
          .is-scrolled .vh-nav-wrap {
            width: calc(100% - 30px);
            min-height: 68px;
            grid-template-columns: 40px 1fr auto;
            gap: 8px;
          }

          .vh-mobile-toggle {
            display: inline-flex;
          }

          .vh-wordmark {
            justify-self: center;
            font-size: 27px;
          }

          .vh-desktop-links {
            display: none;
          }

          .vh-actions {
            gap: 0;
          }

          .vh-icon-button {
            width: 38px;
            height: 38px;
          }

          .vh-search-button {
            display: none;
          }

          .vh-mobile-panel {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            display: block;
            padding: 0;
            background: rgba(13,27,19,.35);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity .3s ease, visibility .3s ease;
          }

          .vh-mobile-panel.is-open {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }

          .vh-mobile-sheet {
            width: min(88%, 390px);
            height: 100%;
            padding: 25px 25px 34px;
            overflow-y: auto;
            background: var(--vh-cream);
            transform: translateX(-100%);
            transition: transform .35s cubic-bezier(.22,.7,.25,1);
          }

          .vh-mobile-panel.is-open .vh-mobile-sheet {
            transform: translateX(0);
          }

          .vh-mobile-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 25px;
            border-bottom: 1px solid #e7e0d2;
          }

          .vh-mobile-label {
            margin: 31px 0 13px;
            color: #a1844f;
            font-size: 9px;
            font-weight: 600;
            letter-spacing: .2em;
          }

          .vh-mobile-links {
            display: flex;
            flex-direction: column;
          }

          .vh-mobile-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            padding: 18px 0;
            border-bottom: 1px solid #e7e0d2;
            color: var(--vh-green);
            font-size: 16px;
            font-weight: 400;
            transition: padding .25s ease, color .25s ease;
          }

          .vh-mobile-link:hover,
          .vh-mobile-link.nav-active {
            padding-left: 6px;
            color: #a1844f;
          }

          .vh-mobile-bottom {
            margin-top: 35px;
            padding: 20px;
            background: #eee9dc;
            color: #647063;
            font-size: 10px;
            line-height: 1.9;
          }

          .vh-mobile-bottom strong {
            display: block;
            margin-bottom: 4px;
            color: var(--vh-green);
            font-weight: 500;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vinodhan-header *,
          .vinodhan-header *::before,
          .vinodhan-header *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* Announcement bar */}
      <div className="vh-announcement">
        <Leaf size={12} className="vh-announcement-highlight" />
        <span>Thoughtfully chosen. Inspired by tradition.</span>
        <span className="vh-announcement-dot" />
        <span className="vh-announcement-highlight">
          Complimentary shipping over ₹2,499
        </span>
      </div>

      {/* Main navigation */}
      <div className="vh-nav-wrap">
        <button
          type="button"
          className="vh-icon-button vh-mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Link
          className="vh-wordmark"
          to="/"
          aria-label="Vinodhan home"
          onClick={closeMenu}
        >
          VINODHAN<span>.</span>
        </Link>

        <nav className="vh-desktop-links" aria-label="Main navigation">
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `vh-nav-link ${isActive ? "nav-active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="vh-actions">
          <button
            type="button"
            className="vh-icon-button vh-search-button"
            aria-label="Search products"
            onClick={onSearch}
          >
            <Search size={19} strokeWidth={1.6} />
          </button>

          <button
            type="button"
            className="vh-icon-button"
            aria-label={`Shopping bag, ${cartCount} items`}
            onClick={onCart}
          >
            <ShoppingBag size={20} strokeWidth={1.6} />
            {cartCount > 0 && (
              <span key={cartCount} className="vh-cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div
        className={`vh-mobile-panel ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div
          className="vh-mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="vh-mobile-top">
            <Link className="vh-wordmark" to="/" onClick={closeMenu}>
              VINODHAN<span>.</span>
            </Link>

            <button
              type="button"
              className="vh-icon-button"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X size={21} />
            </button>
          </div>

          <p className="vh-mobile-label">DISCOVER VINODHAN</p>

          <nav className="vh-mobile-links" aria-label="Mobile navigation">
            {links.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `vh-mobile-link ${isActive ? "nav-active" : ""}`
                }
              >
                {label}
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </NavLink>
            ))}
          </nav>

          <div className="vh-mobile-bottom">
            <strong>Thoughtful finds for everyday living.</strong>
            Explore meaningful essentials inspired by tradition.
          </div>
        </div>
      </div>
    </header>
  );
}
