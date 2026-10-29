
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  ArrowUpRight,
  ArrowRight,
  Leaf,
  Mail,
  Heart,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setMessage("Thank you for your interest in Vinodhan.");
    setEmail("");
  };

  return (
    <footer className="vinodhan-footer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .vinodhan-footer {
          --footer-green: #173d2b;
          --footer-green-light: #244d38;
          --footer-gold: #d7bd83;
          --footer-cream: #f8f6ef;
          font-family: 'Poppins', sans-serif;
          background: var(--footer-green);
          color: var(--footer-cream);
          overflow: hidden;
          position: relative;
        }

        .vinodhan-footer * {
          box-sizing: border-box;
        }

        .vinodhan-footer a {
          text-decoration: none;
        }

        .vf-container {
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
        }

        .vf-top {
          position: relative;
          padding: 76px 0 64px;
          border-bottom: 1px solid rgba(255,255,255,.13);
        }

        .vf-top::before {
          content: "";
          position: absolute;
          width: 360px;
          height: 360px;
          right: -170px;
          top: -210px;
          border: 1px solid rgba(215,189,131,.14);
          border-radius: 50%;
          pointer-events: none;
          animation: vf-orbit 24s linear infinite;
        }

        .vf-top::after {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          right: -110px;
          top: -150px;
          border: 1px solid rgba(215,189,131,.12);
          border-radius: 50%;
          pointer-events: none;
          animation: vf-orbit 18s linear infinite reverse;
        }

        .vf-grid {
          display: grid;
          grid-template-columns: 1.35fr .75fr .8fr 1.2fr;
          gap: 48px;
          position: relative;
          z-index: 1;
        }

        .vf-brand {
          animation: vf-rise .75s ease both;
        }

        .vf-wordmark {
          display: inline-flex;
          align-items: center;
          color: #fff;
          font-size: 36px;
          font-weight: 600;
          letter-spacing: -.06em;
          line-height: 1;
          transition: color .3s ease;
        }

        .vf-wordmark span {
          color: var(--footer-gold);
          transition: transform .3s ease;
        }

        .vf-wordmark:hover {
          color: var(--footer-gold);
        }

        .vf-wordmark:hover span {
          transform: translateY(-4px);
        }

        .vf-tagline {
          color: rgba(255,255,255,.66);
          font-size: 12px;
          line-height: 2;
          margin: 20px 0 25px;
          max-width: 270px;
          font-weight: 300;
        }

        .vf-social {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--footer-gold);
          font-size: 11px;
          font-weight: 500;
          transition: gap .3s ease, color .3s ease;
        }

        .vf-social:hover {
          gap: 15px;
          color: #fff;
        }

        .vf-social-icon {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(215,189,131,.4);
          border-radius: 50%;
          transition: background .3s ease, transform .3s ease;
        }

        .vf-social:hover .vf-social-icon {
          background: rgba(215,189,131,.13);
          transform: rotate(-8deg);
        }

        .vf-column {
          animation: vf-rise .7s ease both;
        }

        .vf-column:nth-child(2) { animation-delay: .08s; }
        .vf-column:nth-child(3) { animation-delay: .16s; }
        .vf-column:nth-child(4) { animation-delay: .24s; }

        .vf-heading {
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          margin: 6px 0 23px;
          letter-spacing: .02em;
        }

        .vf-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .vf-links a {
          color: rgba(255,255,255,.62);
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 300;
          transition: color .25s ease, transform .25s ease;
        }

        .vf-links a:hover {
          color: var(--footer-gold);
          transform: translateX(4px);
        }

        .vf-link-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity .25s ease, transform .25s ease;
        }

        .vf-links a:hover .vf-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .vf-newsletter-copy {
          max-width: 290px;
          margin: -9px 0 22px;
          color: rgba(255,255,255,.62);
          font-size: 11px;
          font-weight: 300;
          line-height: 1.9;
        }

        .vf-form {
          display: flex;
          width: 100%;
          max-width: 340px;
          min-height: 48px;
          border: 1px solid rgba(255,255,255,.24);
          transition: border-color .3s ease, box-shadow .3s ease;
        }

        .vf-form:focus-within {
          border-color: var(--footer-gold);
          box-shadow: 0 0 0 3px rgba(215,189,131,.08);
        }

        .vf-input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #fff;
          padding: 13px 14px;
          font: inherit;
          font-size: 11px;
        }

        .vf-input::placeholder {
          color: rgba(255,255,255,.48);
        }

        .vf-submit {
          flex: 0 0 48px;
          display: grid;
          place-items: center;
          background: var(--footer-gold);
          color: var(--footer-green);
          border: 0;
          cursor: pointer;
          transition: background .25s ease, color .25s ease;
        }

        .vf-submit:hover {
          background: #fff;
          color: var(--footer-green);
        }

        .vf-privacy {
          color: rgba(255,255,255,.42);
          font-size: 9px;
          line-height: 1.8;
          margin-top: 13px;
        }

        .vf-message {
          color: var(--footer-gold);
          font-size: 10px;
          margin-top: 10px;
          line-height: 1.6;
        }

        .vf-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 76px;
          color: rgba(255,255,255,.5);
          font-size: 9px;
          font-weight: 300;
        }

        .vf-bottom-center {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .vf-bottom-center svg {
          color: var(--footer-gold);
          animation: vf-heartbeat 2.2s ease-in-out infinite;
        }

        .vf-legal {
          display: flex;
          gap: 18px;
        }

        .vf-legal a {
          color: rgba(255,255,255,.5);
          transition: color .25s ease;
        }

        .vf-legal a:hover {
          color: var(--footer-gold);
        }

        @keyframes vf-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vf-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes vf-heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.13); }
        }

        @media (max-width: 1024px) {
          .vf-grid {
            grid-template-columns: 1fr 1fr;
            gap: 44px 36px;
          }

          .vf-top {
            padding: 64px 0 52px;
          }

          .vf-newsletter-copy {
            max-width: 340px;
          }
        }

        @media (max-width: 560px) {
          .vf-container {
            width: calc(100% - 36px);
          }

          .vf-top {
            padding: 50px 0 42px;
          }

          .vf-grid {
            grid-template-columns: 1fr 1fr;
            gap: 38px 20px;
          }

          .vf-brand,
          .vf-newsletter {
            grid-column: 1 / -1;
          }

          .vf-wordmark {
            font-size: 32px;
          }

          .vf-heading {
            margin-bottom: 18px;
            font-size: 11px;
          }

          .vf-links {
            gap: 13px;
          }

          .vf-bottom {
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 13px;
            padding: 23px 0;
          }

          .vf-bottom-center {
            order: 3;
          }

          .vf-legal {
            gap: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vinodhan-footer *,
          .vinodhan-footer *::before,
          .vinodhan-footer *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="vf-top">
        <div className="vf-container vf-grid">
          {/* BRAND */}
          <div className="vf-brand">
            <Link className="vf-wordmark" to="/">
              VINODHAN<span>.</span>
            </Link>

            <p className="vf-tagline">
              Thoughtful finds for everyday living.
              <br />
              Tradition, meaning, and timeless simplicity.
            </p>

            <a
              className="vf-social"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="vf-social-icon">
                <Instagram size={16} />
              </span>
              <span>Follow our world</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* EXPLORE */}
          <div className="vf-column">
            <h4 className="vf-heading">Explore</h4>
            <nav className="vf-links" aria-label="Explore">
              <Link to="/shop">
                Shop all <ArrowUpRight className="vf-link-arrow" size={13} />
              </Link>
              <Link to="/collections">
                Collections <ArrowUpRight className="vf-link-arrow" size={13} />
              </Link>
              <Link to="/new-arrivals">
                New arrivals <ArrowUpRight className="vf-link-arrow" size={13} />
              </Link>
              <Link to="/about">
                Our story <ArrowUpRight className="vf-link-arrow" size={13} />
              </Link>
            </nav>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div className="vf-column">
            <h4 className="vf-heading">Need help?</h4>
            <nav className="vf-links" aria-label="Customer support">
              <a href="mailto:hello@vinodhan.com">Contact us</a>
              <Link to="/shipping">Shipping & returns</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/product-care">Product care</Link>
            </nav>
          </div>

          {/* NEWSLETTER */}
          <div className="vf-column vf-newsletter">
            <h4 className="vf-heading">A little note from us</h4>

            <p className="vf-newsletter-copy">
              Thoughtful ideas, collection updates, and a little inspiration
              for everyday living.
            </p>

            <form className="vf-form" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="vf-email">
                Email address
              </label>
              <input
                id="vf-email"
                className="vf-input"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button className="vf-submit" type="submit" aria-label="Subscribe">
                <ArrowUpRight size={19} />
              </button>
            </form>

            {message && (
              <p className="vf-message" role="status">
                {message}
              </p>
            )}

            <p className="vf-privacy">
              Occasional updates, thoughtfully sent. Unsubscribe whenever you
              like.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="vf-container vf-bottom">
        <span>© {new Date().getFullYear()} Vinodhan. All rights reserved.</span>

        <span className="vf-bottom-center">
          Made with <Heart size={12} fill="currentColor" /> for everyday living
        </span>

        <div className="vf-legal">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
