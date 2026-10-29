
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Leaf,
  Heart,
  Sun,
  Play,
  Youtube,
  BookOpen,
  Brain,
  Compass,
  Instagram,
  Facebook,
  Mail,
  Globe,
  Lightbulb,
  Sparkles,
  MessageCircle,
} from "lucide-react";

const shorts = [
  {
    id: "YOUR_SHORT_ID_1",
    title: "Spiritual Knowledge for Everyday Life",
    category: "Spiritual Wisdom",
  },
  {
    id: "YOUR_SHORT_ID_2",
    title: "Understand Life Beyond the Surface",
    category: "Real-Life Insights",
  },
  {
    id: "YOUR_SHORT_ID_3",
    title: "Simple Practices for Self-Awareness",
    category: "Practical Guidance",
  },
];

const contentTypes = [
  {
    number: "01",
    icon: <Brain size={23} strokeWidth={1.5} />,
    title: "Real-Life Information",
    description:
      "Explore information, observations and ideas that help you understand everyday life with greater clarity.",
  },
  {
    number: "02",
    icon: <Sparkles size={23} strokeWidth={1.5} />,
    title: "Spiritual Understanding",
    description:
      "Discover spiritual concepts, deeper questions and perspectives that invite you to reflect and learn.",
  },
  {
    number: "03",
    icon: <Compass size={23} strokeWidth={1.5} />,
    title: "Practice and Experience",
    description:
      "Explore practical approaches that you can reflect on and apply in everyday life at your own pace.",
  },
];

const principles = [
  {
    icon: <BookOpen size={22} />,
    title: "Learn with Curiosity",
    text: "Stay open to information, new perspectives and meaningful questions.",
  },
  {
    icon: <Heart size={22} />,
    title: "Reflect with Awareness",
    text: "Take time to observe your experiences and consider what they teach you.",
  },
  {
    icon: <Sun size={22} />,
    title: "Practice in Daily Life",
    text: "Explore practical ideas thoughtfully and discover what works for you.",
  },
];

const socialLinks = [
  {
    name: "Website",
    detail: "vinodhan.com",
    href: "https://vinodhan.com/",
    icon: <Globe size={19} />,
  },
  {
    name: "YouTube",
    detail: "Videos and Shorts",
    href: "https://www.youtube.com/results?search_query=Bodhi+Spiritual+Path",
    icon: <Youtube size={19} />,
  },
  {
    name: "Instagram",
    detail: "@vinodhan.b",
    href: "https://www.instagram.com/vinodhan.b/",
    icon: <Instagram size={19} />,
  },
  {
    name: "Facebook",
    detail: "Bodhi Spiritual Path",
    href: "https://www.facebook.com/Bodhispiritiualpath",
    icon: <Facebook size={19} />,
  },
  {
    name: "Email",
    detail: "bodispritiualpath@gmail.com",
    href: "mailto:bodispritiualpath@gmail.com",
    icon: <Mail size={19} />,
  },
  {
    name: "Twitter / X",
    detail: "@bvinod871",
    href: "https://twitter.com/bvinod871",
    icon: <MessageCircle size={19} />,
  },
];

export default function About() {
  useEffect(() => {
    const root = document.querySelector(".bodhi-about");
    if (!root) return;
    const elements = root.querySelectorAll(
      "section:not(:first-of-type), section:not(:first-of-type) article, #youtube-shorts article, #connect a"
    );
    elements.forEach((element) => element.classList.add("motion-reveal"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    elements.forEach((element, index) => {
      if (element.tagName === "ARTICLE" || element.tagName === "A") {
        element.classList.add(`motion-delay-${(index % 3) + 1}`);
      }
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bodhi-about overflow-hidden bg-[#faf9f5] text-[#193d2b]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .bodhi-about {
          font-family: 'Poppins', sans-serif;
        }

        .bodhi-about .motion-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 750ms ease, transform 750ms cubic-bezier(.2,.7,.2,1);
        }
        .bodhi-about .motion-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .bodhi-about .motion-delay-1 { transition-delay: 100ms; }
        .bodhi-about .motion-delay-2 { transition-delay: 200ms; }
        .bodhi-about .motion-delay-3 { transition-delay: 300ms; }
        .bodhi-about .hero-copy {
          animation: bodhiHeroIn 900ms cubic-bezier(.2,.7,.2,1) both;
        }
        .bodhi-about .hero-visual {
          animation: bodhiHeroVisual 1100ms cubic-bezier(.2,.7,.2,1) both;
        }
        .bodhi-about .hero-glow {
          animation: bodhiGlow 7s ease-in-out infinite alternate;
        }
        .bodhi-about .floating-note {
          animation: bodhiFloat 5s ease-in-out infinite;
        }
        .bodhi-about .short-card {
          transition: transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease;
        }
        .bodhi-about .short-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 55px rgba(25,61,43,.12);
          border-color: #c5b486;
        }
        .bodhi-about .motion-card {
          transition: transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease;
        }
        .bodhi-about .motion-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 38px rgba(25,61,43,.08);
          border-color: #c5b486;
        }
        @keyframes bodhiHeroIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bodhiHeroVisual {
          from { opacity: 0; transform: translateX(24px) scale(.98); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes bodhiGlow {
          from { transform: translate3d(-8px,-6px,0) scale(.96); opacity: .35; }
          to { transform: translate3d(10px,8px,0) scale(1.05); opacity: .7; }
        }
        @keyframes bodhiFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bodhi-about *, .bodhi-about *::before, .bodhi-about *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
          .bodhi-about .motion-reveal { opacity: 1; transform: none; }
        }

        .bodhi-about h1,
        .bodhi-about h2,
        .bodhi-about h3,
        .bodhi-about p,
        .bodhi-about a,
        .bodhi-about button,
        .bodhi-about span {
          font-family: 'Poppins', sans-serif;
        }

        .bodhi-grain {
          background-image: radial-gradient(rgba(255,255,255,.10) .7px, transparent .7px);
          background-size: 6px 6px;
        }

        .bodhi-image {
          transition: transform 800ms cubic-bezier(.2,.7,.2,1);
        }

        .bodhi-image-wrap:hover .bodhi-image {
          transform: scale(1.045);
        }

        .bodhi-short-frame {
          aspect-ratio: 9 / 16;
        }

        .bodhi-social-card {
          transition: background-color 250ms ease, transform 250ms ease,
            border-color 250ms ease;
        }

        .bodhi-social-card:hover {
          transform: translateY(-3px);
          border-color: #bba574;
          background-color: #f3f0e7;
        }

        .bodhi-about a:focus-visible,
        .bodhi-about button:focus-visible {
          outline: 2px solid #bba574;
          outline-offset: 4px;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#193d2b] px-5 py-16 text-white sm:px-8 sm:py-24 lg:py-28">
        <div className="bodhi-grain pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="hero-copy">
            <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8c59a] sm:text-xs">
              <span className="h-px w-8 bg-[#d8c59a]" />
              BODHI SPIRITUAL PATH
            </p>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.15] sm:text-6xl lg:text-7xl">
              Understand life.
              <span className="mt-3 block font-normal italic text-[#d8c59a]">
                Explore within.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              A real-life knowledge and spiritual channel where we share
              information, explore meaningful ideas and introduce practical
              approaches that you can learn from and experience in everyday
              life.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#youtube-shorts"
                className="inline-flex items-center gap-3 rounded-full bg-[#d8c59a] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#193d2b] transition hover:bg-white"
              >
                <Play size={16} fill="currentColor" />
                Watch our Shorts
              </a>

              <a
                href="#our-purpose"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-xs font-medium text-white transition hover:bg-white/10"
              >
                Discover our purpose
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/65">
              <span className="flex items-center gap-2">
                <BookOpen size={16} className="text-[#d8c59a]" />
                Knowledge
              </span>
              <span className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#d8c59a]" />
                Spirituality
              </span>
              <span className="flex items-center gap-2">
                <Lightbulb size={16} className="text-[#d8c59a]" />
                Practical learning
              </span>
            </div>
          </div>

          <div className="hero-visual bodhi-image-wrap relative mx-auto w-full max-w-lg">
            <div className="hero-glow absolute -inset-5 rounded-[45%] bg-[#d8c59a]/10 blur-2xl" />
            <div className="absolute -inset-4 rounded-[45%] border border-white/10" />

            <img
              src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=90"
              alt="Peaceful sunrise landscape representing reflection and awareness"
              loading="eager" fetchPriority="high"
              className="bodhi-image relative h-[360px] w-full rounded-tl-[100px] rounded-br-[100px] object-cover shadow-2xl sm:h-[500px] lg:h-[560px]"
            />

            <div className="floating-note absolute -bottom-5 left-4 rounded-2xl border border-white/10 bg-[#244a36] p-5 shadow-xl sm:left-8 sm:p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#d8c59a]">
                Our guiding thought
              </p>
              <p className="mt-2 max-w-[240px] text-lg font-medium leading-snug sm:text-xl">
                Knowledge becomes meaningful when we put it into practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRODUCTION */}
      <section id="our-purpose" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.8fr_1.2fr] md:items-start">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
              A little about our path
            </p>

            <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
              Real life. Deeper questions. Practical learning.
            </h2>
          </div>

          <div className="max-w-2xl md:justify-self-end">
            <p className="text-sm leading-8 text-[#6e766b] sm:text-base">
              Bodhi Spiritual Path is a channel dedicated to sharing real-life
              information and spiritual perspectives. Our aim is to make ideas
              accessible, encourage thoughtful reflection and introduce
              practices that people can explore in their own lives.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#6e766b] sm:text-base">
              Through videos, YouTube Shorts and practical discussions, we
              invite you to keep learning, ask questions and look at everyday
              experiences with greater awareness.
            </p>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 1: WHAT WE SHARE */}
      <section className="border-y border-[#e7e2d7] bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
              What you will discover
            </p>

            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
              Knowledge for life, not just information.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77796f] sm:text-base">
              Different ways to learn, reflect and explore practical ideas.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {contentTypes.map((item) => (
              <article
                key={item.number}
                className="motion-card rounded-2xl border border-[#e6e1d6] bg-[#faf9f5] p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#a28a58]">{item.number}</span>

                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9eee5] text-[#193d2b]">
                    {item.icon}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#77796f]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 2: YOUTUBE SHORTS */}
      <section
        id="youtube-shorts"
        className="scroll-mt-8 bg-[#f0eee5] px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end sm:mb-12">
            <div>
              <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a28a58]">
                <Youtube size={16} />
                Short videos. Meaningful ideas.
              </p>

              <h2 className="text-3xl font-semibold sm:text-5xl">
                Watch our YouTube Shorts
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#77796f]">
                Explore real-life insights, spiritual perspectives and
                practical ideas in short videos.
              </p>
            </div>

            <a
              href="https://www.youtube.com/results?search_query=Bodhi+Spiritual+Path+Shorts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#193d2b] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#285b41]"
            >
              Find videos on YouTube
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shorts.map((short) => {
              const isPlaceholder =
                !short.id || short.id.startsWith("YOUR_SHORT_ID");

              const videoUrl = isPlaceholder
                ? "https://www.youtube.com/results?search_query=Bodhi+Spiritual+Path+Shorts"
                : `https://www.youtube.com/shorts/${short.id}`;

              return (
                <article
                  key={short.id}
                  className="short-card overflow-hidden rounded-2xl border border-[#e3dfd4] bg-white shadow-sm"
                >
                  <div className="bodhi-short-frame relative mx-auto w-full overflow-hidden bg-[#193d2b]">
                    {isPlaceholder ? (
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#193d2b] via-[#244a36] to-[#101f17] px-6 text-center text-white"
                      >
                        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8c59a]/50 text-[#d8c59a] transition hover:bg-white/10">
                          <Play size={26} fill="currentColor" />
                        </span>

                        <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#d8c59a]">
                          BODHI SPIRITUAL PATH
                        </span>

                        <span className="mt-4 max-w-xs text-xl font-semibold leading-snug">
                          {short.title}
                        </span>

                        <span className="mt-5 text-xs text-white/65">
                          Open YouTube to watch
                        </span>
                      </a>
                    ) : (
                      <iframe
                        className="absolute inset-0 h-full w-full border-0"
                        src={`https://www.youtube-nocookie.com/embed/${short.id}?playsinline=1&rel=0`}
                        title={short.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a28a58]">
                      {short.category}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-[#193d2b]">
                      {short.title}
                    </h3>

                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#193d2b] transition hover:text-[#a28a58]"
                    >
                      Watch on YouTube
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-6 text-[#77796f]">
            Replace the placeholder video IDs in the code with your actual
            YouTube Shorts IDs to embed your videos directly.
          </p>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="bg-[#193d2b] px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8c59a]">
              What guides us
            </p>

            <h2 className="text-3xl font-semibold sm:text-5xl">
              Learn. Reflect. Practise.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Meaningful learning begins with curiosity, reflection and the
              willingness to explore.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((item, index) => (
              <article
                key={item.title}
                className="motion-card rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#d8c59a]">0{index + 1}</span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#d8c59a]">
                    {item.icon}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 3: LEARNING JOURNEY */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="bodhi-image-wrap relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1100&q=85"
              alt="Sunrise over a peaceful natural landscape"
              loading="lazy"
              className="bodhi-image h-[300px] w-full object-cover sm:h-[450px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#122a1e]/65 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#e5d2a4]">
                A journey of understanding
              </p>

              <p className="mt-2 max-w-sm text-2xl font-semibold leading-snug sm:text-3xl">
                Every question can begin a new perspective.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
              Bring learning into life
            </p>

            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
              Not just watching. Understanding and practising.
            </h2>

            <p className="mt-5 text-sm leading-8 text-[#77796f]">
              Our content is an invitation to go beyond simply watching a
              video. Take an idea, reflect on it, ask questions and explore how
              it relates to your own experiences.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  number: "01",
                  title: "Listen and learn",
                  description: "Explore an idea with an open mind.",
                },
                {
                  number: "02",
                  title: "Pause and reflect",
                  description: "Consider how it relates to real life.",
                },
                {
                  number: "03",
                  title: "Explore a practice",
                  description:
                    "Try suitable practices thoughtfully and at your own pace.",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7cba9] text-xs font-medium text-[#8e7847]">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-xs leading-6 text-[#77796f] sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#youtube-shorts"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#193d2b] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#315941]"
            >
              Explore our Shorts
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT AND SOCIAL LINKS */}
      <section
        id="connect"
        className="border-t border-[#e7e2d7] bg-white px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28a58]">
                Stay connected
              </p>

              <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
                Let’s keep learning together.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#77796f]">
                Follow Bodhi Spiritual Path and Vinodhan for videos, ideas and
                updates. Join us in exploring knowledge and meaningful
                questions about life.
              </p>

              <a
                href="mailto:bodispritiualpath@gmail.com"
                className="mt-7 inline-flex items-center gap-3 break-all text-sm font-medium"
              >
                <Mail size={17} className="shrink-0" />
                bodispritiualpath@gmail.com
                <ArrowUpRight size={15} className="shrink-0" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.name === "Email" ? undefined : "_blank"}
                  rel={item.name === "Email" ? undefined : "noreferrer"}
                  className="bodhi-social-card flex min-w-0 items-center gap-4 rounded-2xl border border-[#e6e1d6] bg-[#faf9f5] p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9eee5] text-[#193d2b]">
                    {item.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {item.name}
                    </span>

                    <span className="mt-1 block truncate text-xs text-[#77796f]">
                      {item.detail}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-[#a28a58]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#193d2b] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="bodhi-grain pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8c59a]">
              Bodhi Spiritual Path
            </p>

            <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
              The journey begins with curiosity.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70">
              Discover information, explore spiritual ideas and bring
              meaningful learning into your everyday life.
            </p>

            <a
              href="https://www.youtube.com/results?search_query=Bodhi+Spiritual+Path"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#d8c59a] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#193d2b] transition hover:bg-white"
            >
              <Play size={15} fill="currentColor" />
              Visit our channel
              <ArrowUpRight size={16} />
            </a>

            <div className="mt-8">
              <Link
                to="/shop"
                className="text-xs text-white/60 underline underline-offset-4 transition hover:text-white"
              >
                Explore Vinodhan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e7e2d7] px-5 py-6 text-center sm:px-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#77796f]">
          Bodhi Spiritual Path · Learn · Reflect · Practise
        </p>
      </footer>
    </main>
  );
}
