import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Clock3, Video, Users, Award, Search, Sparkles,
  Brain, Flower2, Gem, Sun, Eye, Heart, ChevronDown, Phone, MessageCircle
} from "lucide-react";

const WHATSAPP_NUMBER = "917010054619";

const courses = [
  {
    id: "mind-mastery",
    title: "Mind Mastery Programme",
    category: "Mind & Personal Growth",
    duration: "90 days · 3 months",
    format: "Online and direct classes",
    price: "₹44,000",
    originalPrice: "₹88,000",
    badge: "Early-bird offer",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85",
    intro: "Explore practical approaches to attention, self-awareness, emotional understanding and personal development through a structured mind-mastery programme.",
    topics: ["Ancient hypnotism methods", "Mesmerism concepts", "NLP methods", "Mind power techniques", "Personality transformation", "Mentalism and inner spirituality"],
    durationLabel: "90-day programme",
  },
  {
    id: "shamanic-healing",
    title: "Shamanic Healing Workshop",
    category: "Healing & Energy Practices",
    duration: "1 day · 3 hours",
    format: "Online via Zoom",
    price: "₹10,000",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85",
    intro: "An introductory workshop exploring shamanic journeying, guided reflection, symbolism and traditional spiritual practices.",
    topics: ["Animal-spirit guide symbolism", "Mind, body and spirit connections", "Cord-release practice", "Mirror work and reflection", "Guided visualisation", "Ritual symbols and music"],
    durationLabel: "One-day workshop",
  },
  {
    id: "reiki",
    title: "Online Reiki Certification",
    category: "Healing & Energy Practices",
    duration: "Level-based sessions",
    format: "Online and one-to-one",
    price: "Enquire for fees",
    icon: Flower2,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=85",
    intro: "Explore Reiki training from introductory levels through advanced and master-level learning, subject to eligibility and assessment.",
    topics: ["Reiki Level 1 and 2", "Distance Reiki concepts", "Reiki symbols", "Master-level learning", "Meditation and practice guidance", "Ethics and responsibilities"],
    durationLabel: "Multiple levels",
  },
  {
    id: "crystal-healing",
    title: "Crystal Healing Therapy Course",
    category: "Healing & Energy Practices",
    duration: "4 hours · 1 day",
    format: "Online class / workshop",
    price: "₹15,000",
    icon: Gem,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    intro: "Learn about crystals, traditional crystal practices, chakras, crystal grids and ways practitioners use crystals as a focus for reflection.",
    topics: ["Introduction to crystals", "Chakras and colour concepts", "Choosing and caring for crystals", "Crystal programming concepts", "Crystal grids", "Aura and chakra topics"],
    durationLabel: "4-hour workshop",
  },
  {
    id: "sarakalai",
    title: "Ancient Sarakalai Breathing Workshop",
    category: "Meditation & Breathwork",
    duration: "2 days · 4 hours listed",
    format: "Online and direct classes",
    price: "₹20,000",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85",
    intro: "An introduction to traditional Siddhar perspectives on breath awareness, including the concepts of Idakalai and Pinkalai.",
    topics: ["Introduction to Sarakalai", "Traditional breath concepts", "Types of Sarakalai techniques", "Breath awareness practice", "Course Q&A", "Tamil / English learning material"],
    durationLabel: "Two-day workshop",
  },
  {
    id: "third-eye",
    title: "Third Eye Activation Workshop",
    category: "Meditation & Breathwork",
    duration: "Weekend workshop",
    format: "One-to-one class",
    price: "₹8,500",
    badge: "Early discount",
    icon: Eye,
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85",
    intro: "Explore meditation, focused attention, inner observation and spiritual-vision concepts in a guided workshop setting.",
    topics: ["Third-eye meditation concepts", "Focused attention exercises", "Quieting the mind", "Meditation practice", "Reflection and Q&A", "Developing a personal practice"],
    durationLabel: "Weekend workshop",
  },
  {
    id: "angel-communication",
    title: "ONNV Angel Communication Workshop",
    category: "Spiritual Development",
    duration: "1 day · 10 AM–1 PM listed",
    format: "Online workshop / group sessions",
    price: "₹8,000",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",
    intro: "A guided spiritual workshop focused on angel traditions, visualisation, reflection and personal spiritual practice.",
    topics: ["Introduction to angels", "Prayer and reflection", "Guided visualisation", "Journaling and auto-writing concepts", "Pendulum dowsing introduction", "Chakra-cleansing traditions"],
    durationLabel: "One-day workshop",
  },
  {
    id: "sun-yoga",
    title: "Sun Yoga Practice Workshop",
    category: "Meditation & Breathwork",
    duration: "1 day · 10 AM–1 PM listed",
    format: "Online / group / one-to-one",
    price: "₹5,000",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    intro: "An introductory workshop covering meditation, breath awareness, gentle movement and traditional sun-yoga concepts.",
    topics: ["Basic meditation techniques", "Breath-aware movement", "Yogasana introduction", "Sun meditation concepts", "Basic chakra meditation", "Everyday mindful habits"],
    durationLabel: "One-day workshop",
  },
];

const categories = ["All Courses", ...new Set(courses.map((course) => course.category))];

function whatsappLink(courseTitle = "") {
  const message = `Hello, I would like to enquire about ${courseTitle || "your courses"}. Please share the latest schedule, fees and enrolment details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();
    return courses.filter((course) => {
      const categoryMatch = activeCategory === "All Courses" || course.category === activeCategory;
      const searchMatch = !term || [course.title, course.category, course.intro, ...course.topics].join(" ").toLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <main className="courses-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        .courses-page{--forest:#183d2d;--forest2:#264d3a;--gold:#c7a96b;--cream:#f7f5ef;--ink:#1e3027;--muted:#707970;background:#fbfaf7;color:var(--ink);font-family:'Poppins',sans-serif;min-height:100vh}
        .courses-page *{box-sizing:border-box}.courses-page a{text-decoration:none}.cp-container{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .courses-page{overflow:hidden}.courses-page .cp-hero-grid>div:first-child{animation:cp-rise .8s cubic-bezier(.2,.7,.2,1) both}.cp-eyebrow{animation:cp-fade .7s ease both}.cp-hero h1{animation:cp-rise .85s .08s cubic-bezier(.2,.7,.2,1) both}.cp-hero p{animation:cp-rise .85s .16s cubic-bezier(.2,.7,.2,1) both}.cp-hero-actions{animation:cp-rise .85s .24s cubic-bezier(.2,.7,.2,1) both}.cp-hero-art{animation:cp-art-in 1s .1s cubic-bezier(.2,.7,.2,1) both}.cp-hero-image img{animation:cp-image-drift 16s ease-in-out infinite alternate;transform-origin:center}.cp-floating-note{animation:cp-float 5s ease-in-out infinite}.cp-trust-item{animation:cp-rise .65s ease both}.cp-trust-item:nth-child(2){animation-delay:.1s}.cp-trust-item:nth-child(3){animation-delay:.2s}.cp-section-head{animation:cp-rise .7s ease both}.cp-card{animation:cp-card-in .65s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--card-index,0)*70ms);will-change:transform,opacity}.cp-card:nth-child(1){--card-index:1}.cp-card:nth-child(2){--card-index:2}.cp-card:nth-child(3){--card-index:3}.cp-card:nth-child(4){--card-index:4}.cp-card:nth-child(5){--card-index:5}.cp-card:nth-child(6){--card-index:6}.cp-card:nth-child(7){--card-index:7}.cp-card:nth-child(8){--card-index:8}.cp-btn{position:relative;overflow:hidden}.cp-btn:after{content:'';position:absolute;top:-60%;left:-40%;width:25%;height:220%;background:rgba(255,255,255,.3);transform:rotate(22deg) translateX(-220%);transition:transform .6s ease}.cp-btn:hover:after{transform:rotate(22deg) translateX(650%)}.cp-tab{transition:background .25s ease,color .25s ease,border-color .25s ease,transform .25s ease}.cp-tab:hover{transform:translateY(-2px)}.cp-search input{transition:border-color .25s,box-shadow .25s}.cp-search input:focus{box-shadow:0 0 0 3px rgba(199,169,107,.15)}.cp-details{animation:cp-details-in .3s ease both}
        @keyframes cp-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}@keyframes cp-fade{from{opacity:0}to{opacity:1}}@keyframes cp-art-in{from{opacity:0;transform:translateX(24px) scale(.98)}to{opacity:1;transform:translateX(0) scale(1)}}@keyframes cp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}@keyframes cp-image-drift{from{transform:scale(1.02)}to{transform:scale(1.09)}}@keyframes cp-card-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes cp-details-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .cp-hero{position:relative;overflow:hidden;background:var(--forest);color:#fff;padding:88px 0 82px}
        .cp-hero:before{content:'';position:absolute;width:560px;height:560px;border:1px solid rgba(199,169,107,.22);border-radius:50%;right:-120px;top:-270px;box-shadow:0 0 0 55px rgba(199,169,107,.04),0 0 0 110px rgba(199,169,107,.035)}
        .cp-hero-grid{position:relative;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:56px}
        .cp-eyebrow{display:inline-flex;align-items:center;gap:9px;color:#e3ce9e;font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:700}.cp-eyebrow:before{content:'';width:27px;height:1px;background:var(--gold)}
        .cp-hero h1{font-family:'Poppins',sans-serif;font-weight:500;font-size:clamp(42px,5.5vw,72px);line-height:1.08;letter-spacing:-.035em;margin:20px 0}.cp-hero h1 em{font-style:normal;color:#dec58f}.cp-hero p{max-width:590px;color:rgba(255,255,255,.72);font-size:15px;line-height:1.9;margin:0}
        .cp-hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.cp-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;border:1px solid transparent;border-radius:3px;padding:14px 19px;font:600 12px 'Poppins',sans-serif;transition:transform .2s,background .2s,border-color .2s;cursor:pointer}.cp-btn:hover{transform:translateY(-2px)}.cp-btn-gold{background:var(--gold);color:#1b3023}.cp-btn-outline{border-color:rgba(255,255,255,.35);color:#fff;background:transparent}.cp-hero-art{position:relative;min-height:390px}.cp-hero-image{position:absolute;inset:0 0 0 30px;border-radius:180px 180px 6px 6px;overflow:hidden;border:1px solid rgba(225,204,151,.55)}.cp-hero-image img{width:100%;height:100%;object-fit:cover;opacity:.78}.cp-hero-image:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,49,34,.08),rgba(18,49,34,.55))}.cp-floating-note{position:absolute;left:0;bottom:27px;z-index:1;background:var(--cream);color:var(--forest);padding:20px 22px;max-width:220px;box-shadow:0 15px 45px #07190e35}.cp-floating-note strong{display:block;font-family:'Poppins',sans-serif;font-size:22px;font-weight:600}.cp-floating-note span{display:block;margin-top:5px;font-size:10px;line-height:1.6;color:#667267}
        .cp-trust{border-bottom:1px solid #e9e6dc;background:#fff}.cp-trust-grid{display:grid;grid-template-columns:repeat(3,1fr)}.cp-trust-item{display:flex;align-items:center;justify-content:center;gap:13px;padding:22px 10px;border-right:1px solid #eeeae0}.cp-trust-item:last-child{border-right:0}.cp-trust-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#f3efe4;color:#927744}.cp-trust-item strong{display:block;font-size:12px}.cp-trust-item span{display:block;color:var(--muted);font-size:10px;margin-top:3px}
        .cp-catalog{padding:76px 0 90px}.cp-section-head{text-align:center;max-width:680px;margin:0 auto 34px}.cp-kicker{color:#a1844f;text-transform:uppercase;letter-spacing:.19em;font-weight:700;font-size:10px}.cp-section-head h2{font-family:'Poppins',sans-serif;font-size:clamp(32px,4vw,47px);font-weight:500;line-height:1.2;margin:12px 0}.cp-section-head p{font-size:13px;color:var(--muted);line-height:1.8;margin:0}
        .cp-filters{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:36px 0 27px;flex-wrap:wrap}.cp-tabs{display:flex;gap:8px;flex-wrap:wrap}.cp-tab{border:1px solid #e5e2d8;background:transparent;color:#687269;border-radius:2px;padding:10px 13px;font:500 11px 'Poppins',sans-serif;cursor:pointer}.cp-tab.active,.cp-tab:hover{background:var(--forest);border-color:var(--forest);color:#fff}.cp-search{position:relative;min-width:min(100%,260px)}.cp-search svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#879087}.cp-search input{width:100%;border:1px solid #e5e2d8;background:#fff;padding:12px 12px 12px 37px;font:12px 'Poppins',sans-serif;outline:none}.cp-search input:focus{border-color:#9b895d}
        .cp-course-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.cp-card{background:#fff;border:1px solid #eae7de;min-width:0;transition:transform .25s,box-shadow .25s,border-color .25s}.cp-card:hover{transform:translateY(-5px);box-shadow:0 20px 45px #1a35210d;border-color:#d9d0b9}.cp-card-image{height:205px;position:relative;overflow:hidden;background:#e8e5da}.cp-card-image img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.cp-card:hover .cp-card-image img{transform:scale(1.045)}.cp-card-image:after{content:'';position:absolute;inset:40% 0 0;background:linear-gradient(transparent,rgba(14,37,24,.25))}.cp-card-badge{position:absolute;top:14px;left:14px;z-index:1;background:#f6efdc;color:#755e32;font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:8px 10px}.cp-card-body{padding:21px}.cp-card-category{color:#a1844f;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em}.cp-card h3{font-family:'Poppins',sans-serif;font-size:23px;line-height:1.25;font-weight:500;margin:9px 0 10px}.cp-card-intro{font-size:12px;line-height:1.8;color:#717a71;min-height:65px;margin:0}.cp-meta{display:flex;flex-wrap:wrap;gap:12px;margin:17px 0;padding:14px 0;border-top:1px solid #efede6;border-bottom:1px solid #efede6}.cp-meta span{display:inline-flex;align-items:center;gap:6px;font-size:10px;color:#667167}.cp-meta svg{color:#a1844f}.cp-card-footer{display:flex;align-items:center;justify-content:space-between;gap:12px}.cp-price{font-size:14px;font-weight:700;color:var(--forest)}.cp-price small{display:block;font-size:9px;font-weight:400;color:#858d83;margin-top:3px}.cp-card-link{display:inline-flex;align-items:center;gap:6px;color:var(--forest);font-size:11px;font-weight:700;background:transparent;border:0;cursor:pointer;padding:8px 0}.cp-details{margin-top:17px;padding-top:16px;border-top:1px solid #efede6}.cp-details h4{font-size:10px;text-transform:uppercase;letter-spacing:.12em;margin:0 0 10px;color:#7c704f}.cp-details ul{list-style:none;padding:0;margin:0;display:grid;gap:8px}.cp-details li{font-size:11px;color:#69746a;display:flex;gap:8px;line-height:1.5}.cp-details li:before{content:'•';color:#b39457;font-size:15px;line-height:1}.cp-details .cp-btn{width:100%;margin-top:16px}.cp-empty{text-align:center;padding:45px 20px;color:var(--muted);font-size:13px;grid-column:1/-1}
        .cp-cta{background:#f0ede3;padding:68px 0}.cp-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}.cp-cta h2{font-family:'Poppins',sans-serif;font-weight:500;font-size:clamp(28px,3vw,40px);margin:10px 0}.cp-cta p{font-size:12px;line-height:1.8;color:#697369;max-width:600px;margin:0}.cp-cta .cp-btn{flex-shrink:0}.cp-note{padding:20px 0;text-align:center;color:#8a9087;font-size:10px;line-height:1.7}
        @media(max-width:950px){.cp-hero-grid{gap:28px;grid-template-columns:1fr .8fr}.cp-hero-art{min-height:330px}.cp-course-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.cp-tabs{width:100%}.cp-search{width:100%;max-width:none}}
        @media(max-width:650px){.cp-container{width:min(100% - 30px,520px)}.cp-hero{padding:58px 0 50px}.cp-hero-grid{grid-template-columns:1fr;gap:30px}.cp-hero h1{font-size:44px}.cp-hero p{font-size:13px}.cp-hero-art{min-height:280px;margin:0 8px 0 15px}.cp-hero-image{left:25px;right:10px}.cp-floating-note{bottom:15px;padding:15px;max-width:190px}.cp-trust-grid{grid-template-columns:1fr}.cp-trust-item{justify-content:flex-start;padding:14px 5px;border-right:0;border-bottom:1px solid #eeeae0}.cp-trust-item:last-child{border-bottom:0}.cp-catalog{padding:55px 0 60px}.cp-section-head{margin-bottom:25px}.cp-filters{margin:25px 0 20px}.cp-tabs{flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px}.cp-tab{white-space:nowrap}.cp-course-grid{grid-template-columns:1fr;gap:16px}.cp-card-image{height:220px}.cp-card-intro{min-height:0}.cp-cta-inner{align-items:flex-start;flex-direction:column}.cp-cta{padding:48px 0}.cp-hero-actions .cp-btn{flex:1}.cp-price{font-size:13px}}
        @media(prefers-reduced-motion:reduce){.courses-page *, .courses-page *:before, .courses-page *:after{animation:none!important;scroll-behavior:auto!important;transition:none!important}}
      `}</style>

      <section className="cp-hero">
        <div className="cp-container cp-hero-grid">
          <div>
            <span className="cp-eyebrow">Learn · Practise · Grow</span>
            <h1>Make space for a <em>deeper you.</em></h1>
            <p>Explore guided workshops and courses in mind mastery, meditation, traditional spiritual practices and personal growth. Choose a programme that fits your interests and enquire about the next available batch.</p>
            <div className="cp-hero-actions">
              <a className="cp-btn cp-btn-gold" href="#course-catalog">Explore courses <ArrowRight size={15} /></a>
              <a className="cp-btn cp-btn-outline" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Enquire on WhatsApp</a>
            </div>
          </div>
          <div className="cp-hero-art" aria-label="Meditation in a peaceful natural setting">
            <div className="cp-hero-image"><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85" alt="Peaceful meditation setting" /></div>
            <div className="cp-floating-note"><strong>Find your practice.</strong><span>Small steps. Meaningful learning. A practice of your own.</span></div>
          </div>
        </div>
      </section>

      <section className="cp-trust" aria-label="Course formats">
        <div className="cp-container cp-trust-grid">
          <div className="cp-trust-item"><div className="cp-trust-icon"><Video size={18} /></div><div><strong>Online & direct classes</strong><span>Choose a suitable learning format</span></div></div>
          <div className="cp-trust-item"><div className="cp-trust-icon"><Users size={18} /></div><div><strong>One-to-one & group options</strong><span>Ask about available arrangements</span></div></div>
          <div className="cp-trust-item"><div className="cp-trust-icon"><Award size={18} /></div><div><strong>Course details before enrolment</strong><span>Confirm syllabus, schedule and fees</span></div></div>
        </div>
      </section>

      <section className="cp-catalog" id="course-catalog">
        <div className="cp-container">
          <div className="cp-section-head"><span className="cp-kicker">Explore the programmes</span><h2>Find the course for you</h2><p>Browse the available programmes, review the main topics and contact us for the latest dates, course structure and enrolment information.</p></div>
          <div className="cp-filters">
            <div className="cp-tabs" aria-label="Filter courses by category">
              {categories.map((category) => <button key={category} type="button" className={`cp-tab ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <label className="cp-search"><Search size={15} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses or topics..." aria-label="Search courses" /></label>
          </div>
          <div className="cp-course-grid">
            {filteredCourses.map((course) => {
              const Icon = course.icon;
              const isExpanded = expanded === course.id;
              return <article className="cp-card" key={course.id}>
                <div className="cp-card-image"><img src={course.image} alt="" loading="lazy" />{course.badge && <span className="cp-card-badge">{course.badge}</span>}</div>
                <div className="cp-card-body">
                  <span className="cp-card-category">{course.category}</span>
                  <h3>{course.title}</h3>
                  <p className="cp-card-intro">{course.intro}</p>
                  <div className="cp-meta"><span><Clock3 size={13} />{course.duration}</span><span><Icon size={13} />{course.format}</span></div>
                  <div className="cp-card-footer"><div className="cp-price">{course.price}<small>{course.originalPrice ? `Regular price ${course.originalPrice}` : "Contact us to confirm current fees"}</small></div><button className="cp-card-link" type="button" onClick={() => setExpanded(isExpanded ? null : course.id)} aria-expanded={isExpanded}>{isExpanded ? "Hide details" : "View details"}<ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform .2s" }} /></button></div>
                  {isExpanded && <div className="cp-details"><h4>Topics covered</h4><ul>{course.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><a className="cp-btn cp-btn-gold" href={whatsappLink(course.title)} target="_blank" rel="noreferrer">Enquire about this course <ArrowRight size={14} /></a></div>}
                </div>
              </article>;
            })}
            {filteredCourses.length === 0 && <div className="cp-empty">No courses match your search. Try another topic or choose “All Courses”.</div>}
          </div>
        </div>
      </section>

      <section className="cp-cta"><div className="cp-container cp-cta-inner"><div><span className="cp-kicker">Not sure where to begin?</span><h2>Let’s find the right course.</h2><p>Ask us about upcoming batches, online or in-person options, course prerequisites, fees and what to prepare before your first session.</p></div><a className="cp-btn cp-btn-gold" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Contact / WhatsApp <ArrowRight size={15} /></a></div></section>
      <div className="cp-container cp-note">Course descriptions are for general information. Please confirm current pricing, dates, format and any certification details directly before enrolling. Spiritual and complementary practices are not a substitute for professional medical or mental-health care.</div>
    </main>
  );
}
