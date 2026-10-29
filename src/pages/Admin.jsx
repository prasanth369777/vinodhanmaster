import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products as storeProducts } from "../data/products";
import {
  LayoutDashboard, Package, FileText, Plus, Search, Pencil, Trash2,
  Eye, EyeOff, Save, X, ExternalLink, ShoppingBag, BookOpen, TrendingUp,
  Image as ImageIcon, ChevronRight
} from "lucide-react";

const PRODUCTS_KEY = "vinodhan_admin_products_v1";
const BLOGS_KEY = "vinodhan_admin_blogs_v1";

const seedProducts = storeProducts.map((product) => ({
  ...product,
  id: String(product.id),
  name: product.name || product.title || "Untitled product",
  category: product.category || product.collection || product.type || "Spiritual Essentials",
  price: String(product.price ?? product.salePrice ?? ""),
  stock: String(product.stock ?? 10),
  image: product.image || product.img || product.thumbnail || "",
  description: product.description || "",
  status: "Published",
}));

const seedBlogs = [
  { id: "blog-1", title: "Creating a Meaningful Daily Ritual", category: "Lifestyle", author: "Vinodhan", date: new Date().toISOString().slice(0, 10), image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80", excerpt: "Simple ways to make room for intention in your everyday routine.", content: "A meaningful daily ritual does not need to be complicated. Start with a quiet moment, choose a practice that feels right for you, and build consistency over time.", status: "Draft" },
];

const readStore = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const blankProduct = () => ({ name: "", category: "", price: "", stock: "0", image: "", description: "", status: "Published" });
const blankBlog = () => ({ title: "", category: "Lifestyle", author: "Vinodhan", date: new Date().toISOString().slice(0, 10), image: "", excerpt: "", content: "", status: "Draft" });

function readImageFile(file, onLoaded, onError) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    onError?.("Please choose an image file.");
    return;
  }
  // Keep browser localStorage from being overwhelmed by large base64 images.
  if (file.size > 1.5 * 1024 * 1024) {
    onError?.("Please choose an image smaller than 1.5 MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => onLoaded(String(reader.result || ""));
  reader.onerror = () => onError?.("Could not read this image. Please try again.");
  reader.readAsDataURL(file);
}


function Field({ label, children, className = "" }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-[#6f776d]">{label}</span>{children}</label>;
}

function TextInput(props) {
  return <input {...props} className={`w-full rounded-lg border border-[#e2e5dc] bg-white px-3.5 py-3 text-sm text-[#203b2a] outline-none transition placeholder:text-[#a3a99f] focus:border-[#8b9b75] focus:ring-2 focus:ring-[#dfe7d8] ${props.className || ""}`} />;
}

function TextArea(props) {
  return <textarea {...props} className={`w-full resize-y rounded-lg border border-[#e2e5dc] bg-white px-3.5 py-3 text-sm leading-6 text-[#203b2a] outline-none transition placeholder:text-[#a3a99f] focus:border-[#8b9b75] focus:ring-2 focus:ring-[#dfe7d8] ${props.className || ""}`} />;
}

export default function Admin() {
  const [section, setSection] = useState("overview");
  const [products, setProducts] = useState(() => {
    const stored = readStore(PRODUCTS_KEY, null);
    if (!Array.isArray(stored)) return seedProducts;

    const merged = new Map(seedProducts.map((product) => [String(product.id), product]));
    stored.forEach((product) => {
      if (!product || product.id == null) return;
      merged.set(String(product.id), {
        ...(merged.get(String(product.id)) || {}),
        ...product,
        id: String(product.id),
        status: "Published",
      });
    });
    return Array.from(merged.values());
  });
  const [blogs, setBlogs] = useState(() => readStore(BLOGS_KEY, seedBlogs));
  const [query, setQuery] = useState("");
  const [productEditor, setProductEditor] = useState(null);
  const [blogEditor, setBlogEditor] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event("vinodhan-products-updated"));
  }, [products]);
  useEffect(() => { localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs)); }, [blogs]);

  const filteredProducts = useMemo(() => products.filter((p) =>
    [p.name, p.category, p.description].join(" ").toLowerCase().includes(query.toLowerCase())
  ), [products, query]);

  const filteredBlogs = useMemo(() => blogs.filter((b) =>
    [b.title, b.category, b.excerpt].join(" ").toLowerCase().includes(query.toLowerCase())
  ), [blogs, query]);

  const toast = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const item = { ...productEditor, id: productEditor.id || `admin-prod-${Date.now()}`, status: productEditor.status || "Published" };
    if (!item.name.trim()) return;
    setProducts((old) => productEditor.id ? old.map((p) => p.id === item.id ? item : p) : [item, ...old]);
    setProductEditor(null);
    toast("Product saved in this browser.");
  };

  const saveBlog = (event) => {
    event.preventDefault();
    const item = { ...blogEditor, id: blogEditor.id || `blog-${Date.now()}` };
    if (!item.title.trim()) return;
    setBlogs((old) => blogEditor.id ? old.map((b) => b.id === item.id ? item : b) : [item, ...old]);
    setBlogEditor(null);
    toast("Blog post saved in this browser.");
  };

  const removeProduct = (id) => {
    if (window.confirm("Delete this product from this browser's admin list?")) {
      setProducts((old) => old.filter((p) => p.id !== id));
      toast("Product deleted.");
    }
  };

  const removeBlog = (id) => {
    if (window.confirm("Delete this blog post from this browser's admin list?")) {
      setBlogs((old) => old.filter((b) => b.id !== id));
      toast("Blog post deleted.");
    }
  };

  const toggleStatus = (type, id) => {
    if (type === "product") {
      setProducts((old) => old.map((p) => p.id === id ? { ...p, status: p.status === "Published" ? "Draft" : "Published" } : p));
    } else {
      setBlogs((old) => old.map((b) => b.id === id ? { ...b, status: b.status === "Published" ? "Draft" : "Published" } : b));
    }
    toast("Status updated.");
  };

  const nav = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package, count: products.length },
    { id: "blogs", label: "Blog posts", icon: FileText, count: blogs.length },
  ];

  return (
    <main className="min-h-screen bg-[#f5f6f1] font-['Poppins',sans-serif] text-[#203b2a]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`}</style>
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#173d2b] p-5 text-white md:flex">
          <Link to="/" className="mb-10 flex items-center gap-3 px-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d7bd83] text-xl font-bold text-[#173d2b]">V</span>
            <span><strong className="block text-lg tracking-wide">VINODHAN</strong><span className="text-[10px] uppercase tracking-[.2em] text-white/55">Store admin</span></span>
          </Link>
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/40">Workspace</p>
          <nav className="space-y-1">
            {nav.map(({ id, label, icon: Icon, count }) => <button key={id} onClick={() => { setSection(id); setQuery(""); setProductEditor(null); setBlogEditor(null); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${section === id ? "bg-white text-[#173d2b]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}><Icon size={18} /> <span className="flex-1">{label}</span>{count !== undefined && <span className={`text-xs ${section === id ? "text-[#173d2b]/60" : "text-white/45"}`}>{count}</span>}</button>)}
          </nav>
          <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold">Storefront</p>
            <p className="mt-1 text-[11px] leading-5 text-white/55">Return to the customer-facing website.</p>
            <Link to="/" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#e4cf9f]">View website <ExternalLink size={13} /></Link>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e7df] bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a8050]">Vinodhan / Admin</p><h1 className="mt-1 text-xl font-semibold sm:text-2xl">{nav.find((n) => n.id === section)?.label || (productEditor ? "Edit product" : "Edit blog post")}</h1></div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9588]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search content..." className="w-52 rounded-lg border border-[#e5e7df] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#8b9b75]" /></div>
              <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-[#e1e5dc] px-3 py-2.5 text-xs font-semibold hover:bg-[#f7f8f4]"><ExternalLink size={14} /> <span className="hidden sm:inline">View store</span></Link>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] p-4 sm:p-8">
            {notice && <div role="status" className="mb-5 rounded-lg border border-[#cbdcc6] bg-[#edf5e9] px-4 py-3 text-sm text-[#2e6138]">{notice}</div>}

            {section === "overview" && !productEditor && !blogEditor && <div>
              <div className="mb-7 rounded-2xl bg-[#203f2d] p-6 text-white sm:p-9"><p className="text-xs font-medium uppercase tracking-[.2em] text-[#e0c78e]">Your content workspace</p><h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight sm:text-4xl">Manage your store, <span className="text-[#e0c78e]">your way.</span></h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/65">Create product listings and prepare blog posts from one simple dashboard.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={() => { setSection("products"); setProductEditor(blankProduct()); }} className="inline-flex items-center gap-2 rounded-lg bg-[#d7bd83] px-4 py-3 text-xs font-semibold text-[#173d2b]"><Plus size={16} /> Add product</button><button onClick={() => { setSection("blogs"); setBlogEditor(blankBlog()); }} className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-3 text-xs font-semibold text-white hover:bg-white/10"><Plus size={16} /> Write blog post</button></div></div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[{ label: "Total products", value: products.length, icon: ShoppingBag, sub: `${products.filter((p) => p.status === "Published").length} marked published` }, { label: "Blog posts", value: blogs.length, icon: BookOpen, sub: `${blogs.filter((b) => b.status === "Published").length} marked published` }, { label: "Published content", value: products.filter((p) => p.status === "Published").length + blogs.filter((b) => b.status === "Published").length, icon: TrendingUp, sub: "Across products and blog posts" }].map((card) => <article key={card.label} className="rounded-2xl border border-[#e5e7df] bg-white p-5"><div className="flex items-center justify-between"><span className="text-xs font-medium text-[#7d8678]">{card.label}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2e9] text-[#31583c]"><card.icon size={19} /></span></div><p className="mt-4 text-3xl font-semibold">{card.value}</p><p className="mt-2 text-xs text-[#8b9387]">{card.sub}</p></article>)}
              </div>
              <div className="mt-8 grid gap-5 xl:grid-cols-2">
                <article className="rounded-2xl border border-[#e5e7df] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Recent products</h3><button onClick={() => setSection("products")} className="inline-flex items-center gap-1 text-xs font-semibold text-[#8c7445]">Manage <ChevronRight size={14} /></button></div>{products.slice(0, 4).map((p) => <div key={p.id} className="flex items-center gap-3 border-t border-[#f0f1ec] py-3"><div className="h-11 w-11 overflow-hidden rounded-lg bg-[#f1eee5]">{p.image ? <img src={p.image} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="m-3 text-[#9a9d8f]" size={20} />}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{p.name}</p><p className="mt-1 text-xs text-[#8a9286]">{p.category || "Uncategorised"}</p></div><span className="text-sm font-semibold">₹{p.price || "—"}</span></div>)}</article>
                <article className="rounded-2xl border border-[#e5e7df] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Recent blog posts</h3><button onClick={() => setSection("blogs")} className="inline-flex items-center gap-1 text-xs font-semibold text-[#8c7445]">Manage <ChevronRight size={14} /></button></div>{blogs.slice(0, 4).map((b) => <div key={b.id} className="flex items-center gap-3 border-t border-[#f0f1ec] py-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#edf2e9] text-[#31583c]"><FileText size={18} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{b.title}</p><p className="mt-1 text-xs text-[#8a9286]">{b.category} · {b.date}</p></div><Status status={b.status} /></div>)}</article>
              </div>
            </div>}

            {section === "products" && !productEditor && <div>
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs text-[#8a9286]">CATALOGUE</p><h2 className="mt-1 text-2xl font-semibold">Products</h2><p className="mt-2 text-sm text-[#7b8578]">Add, edit, and organise your product details.</p></div><button onClick={() => setProductEditor(blankProduct())} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#203f2d] px-4 py-3 text-xs font-semibold text-white hover:bg-[#2d563c]"><Plus size={16} /> Add product</button></div>
              <div className="mb-4 sm:hidden"><TextInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." /></div>
              <div className="overflow-hidden rounded-2xl border border-[#e5e7df] bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-[#f8f9f5] text-[10px] uppercase tracking-[.12em] text-[#7c8578]"><tr><th className="px-5 py-4">Product</th><th className="px-4 py-4">Category</th><th className="px-4 py-4">Price</th><th className="px-4 py-4">Stock</th><th className="px-4 py-4">Status</th><th className="px-4 py-4 text-right">Actions</th></tr></thead><tbody>{filteredProducts.map((p) => <tr key={p.id} className="border-t border-[#f0f1ec]"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="h-12 w-12 overflow-hidden rounded-lg bg-[#f2efe7]">{p.image ? <img src={p.image} alt="" className="h-full w-full object-cover" /> : <ImageIcon size={18} className="m-4 text-[#9ba193]" />}</div><div><p className="max-w-[230px] truncate text-sm font-semibold">{p.name}</p><p className="mt-1 max-w-[230px] truncate text-xs text-[#8b9387]">{p.description}</p></div></div></td><td className="px-4 py-4 text-xs">{p.category || "—"}</td><td className="px-4 py-4 text-sm font-semibold">₹{p.price || "—"}</td><td className="px-4 py-4 text-sm">{p.stock || "0"}</td><td className="px-4 py-4"><Status status={p.status} /></td><td className="px-4 py-4"><div className="flex justify-end gap-1"><ActionButton label={p.status === "Published" ? "Unpublish" : "Publish"} onClick={() => toggleStatus("product", p.id)}><Eye size={15} /></ActionButton><ActionButton label="Edit" onClick={() => setProductEditor({ ...p })}><Pencil size={15} /></ActionButton><ActionButton label="Delete" danger onClick={() => removeProduct(p.id)}><Trash2 size={15} /></ActionButton></div></td></tr>)}</tbody></table>{filteredProducts.length === 0 && <Empty label="No products found." />}</div></div>
            </div>}

            {section === "products" && productEditor && <Editor title={productEditor.id ? "Edit product" : "Add product"} onCancel={() => setProductEditor(null)} onSubmit={saveProduct} onSaveLabel="Save product">
              <div className="grid gap-5 md:grid-cols-2"><Field label="Product name"><TextInput required value={productEditor.name} onChange={(e) => setProductEditor({ ...productEditor, name: e.target.value })} placeholder="e.g. Brass Diya" /></Field><Field label="Category"><TextInput value={productEditor.category} onChange={(e) => setProductEditor({ ...productEditor, category: e.target.value })} placeholder="Spiritual Essentials" /></Field><Field label="Price (INR)"><TextInput required type="number" min="0" step="0.01" value={productEditor.price} onChange={(e) => setProductEditor({ ...productEditor, price: e.target.value })} placeholder="499" /></Field><Field label="Stock quantity"><TextInput type="number" min="0" value={productEditor.stock} onChange={(e) => setProductEditor({ ...productEditor, stock: e.target.value })} placeholder="10" /></Field><Field label="Image URL"><TextInput value={productEditor.image} onChange={(e) => setProductEditor({ ...productEditor, image: e.target.value })} placeholder="https://..." /></Field>
<Field label="Or upload product image">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => readImageFile(
      e.target.files?.[0],
      (image) => setProductEditor((current) => ({ ...current, image })),
      toast
    )}
    className="w-full rounded-lg border border-dashed border-[#cbd4c5] bg-[#fbfcf9] px-3 py-3 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-[#203f2d] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
  />
  <span className="mt-1 block text-[10px] text-[#8b9387]">JPG, PNG, WebP or GIF · maximum 1.5 MB</span>
</Field><Field label="Status"><select value={productEditor.status} onChange={(e) => setProductEditor({ ...productEditor, status: e.target.value })} className="w-full rounded-lg border border-[#e2e5dc] bg-white px-3.5 py-3 text-sm"><option>Draft</option><option>Published</option></select></Field><Field label="Short description" className="md:col-span-2"><TextArea rows={4} value={productEditor.description} onChange={(e) => setProductEditor({ ...productEditor, description: e.target.value })} placeholder="Describe the product..." /></Field></div>
              {productEditor.image && <img src={productEditor.image} alt="Product preview" className="mt-5 h-40 w-40 rounded-xl border border-[#e5e7df] object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
            </Editor>}

            {section === "blogs" && !blogEditor && <div>
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs text-[#8a9286]">CONTENT</p><h2 className="mt-1 text-2xl font-semibold">Blog posts</h2><p className="mt-2 text-sm text-[#7b8578]">Draft articles and manage your content.</p></div><button onClick={() => setBlogEditor(blankBlog())} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#203f2d] px-4 py-3 text-xs font-semibold text-white hover:bg-[#2d563c]"><Plus size={16} /> Write blog post</button></div>
              <div className="mb-4 sm:hidden"><TextInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search blog posts..." /></div>
              <div className="grid gap-4 lg:grid-cols-2">{filteredBlogs.map((b) => <article key={b.id} className="overflow-hidden rounded-2xl border border-[#e5e7df] bg-white"><div className="flex gap-4 p-5">{b.image ? <img src={b.image} alt="" className="h-24 w-24 shrink-0 rounded-xl bg-[#f1eee5] object-cover" /> : <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#edf2e9] text-[#31583c]"><FileText size={24} /></div>}<div className="min-w-0 flex-1"><div className="mb-2 flex flex-wrap items-center gap-2"><Status status={b.status} /><span className="text-[10px] text-[#899184]">{b.category} · {b.date}</span></div><h3 className="line-clamp-2 font-semibold">{b.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 text-[#7b8578]">{b.excerpt}</p></div></div><div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#f0f1ec] bg-[#fbfcf9] px-5 py-3"><span className="text-[10px] text-[#8b9387]">By {b.author || "Vinodhan"}</span><div className="flex gap-1"><ActionButton label={b.status === "Published" ? "Unpublish" : "Publish"} onClick={() => toggleStatus("blog", b.id)}>{b.status === "Published" ? <EyeOff size={15} /> : <Eye size={15} />}</ActionButton><ActionButton label="Edit" onClick={() => setBlogEditor({ ...b })}><Pencil size={15} /></ActionButton><ActionButton label="Delete" danger onClick={() => removeBlog(b.id)}><Trash2 size={15} /></ActionButton></div></div></article>)}</div>{filteredBlogs.length === 0 && <Empty label="No blog posts found." />}
            </div>}

            {section === "blogs" && blogEditor && <Editor title={blogEditor.id ? "Edit blog post" : "Write blog post"} onCancel={() => setBlogEditor(null)} onSubmit={saveBlog} onSaveLabel="Save blog post">
              <div className="grid gap-5 md:grid-cols-2"><Field label="Post title" className="md:col-span-2"><TextInput required value={blogEditor.title} onChange={(e) => setBlogEditor({ ...blogEditor, title: e.target.value })} placeholder="Enter an engaging title" /></Field><Field label="Category"><TextInput value={blogEditor.category} onChange={(e) => setBlogEditor({ ...blogEditor, category: e.target.value })} placeholder="Lifestyle" /></Field><Field label="Author"><TextInput value={blogEditor.author} onChange={(e) => setBlogEditor({ ...blogEditor, author: e.target.value })} placeholder="Vinodhan" /></Field><Field label="Publish date"><TextInput type="date" value={blogEditor.date} onChange={(e) => setBlogEditor({ ...blogEditor, date: e.target.value })} /></Field><Field label="Status"><select value={blogEditor.status} onChange={(e) => setBlogEditor({ ...blogEditor, status: e.target.value })} className="w-full rounded-lg border border-[#e2e5dc] bg-white px-3.5 py-3 text-sm"><option>Draft</option><option>Published</option></select></Field><Field label="Cover image URL" className="md:col-span-2"><TextInput value={blogEditor.image} onChange={(e) => setBlogEditor({ ...blogEditor, image: e.target.value })} placeholder="https://..." /></Field>
<Field label="Or upload cover image" className="md:col-span-2">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => readImageFile(
      e.target.files?.[0],
      (image) => setBlogEditor((current) => ({ ...current, image })),
      toast
    )}
    className="w-full rounded-lg border border-dashed border-[#cbd4c5] bg-[#fbfcf9] px-3 py-3 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-[#203f2d] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
  />
  <span className="mt-1 block text-[10px] text-[#8b9387]">JPG, PNG, WebP or GIF · maximum 1.5 MB</span>
</Field><Field label="Excerpt / SEO description" className="md:col-span-2"><TextArea rows={3} value={blogEditor.excerpt} onChange={(e) => setBlogEditor({ ...blogEditor, excerpt: e.target.value })} placeholder="Short summary for blog cards and search results" /></Field><Field label="Article content" className="md:col-span-2"><TextArea rows={12} value={blogEditor.content} onChange={(e) => setBlogEditor({ ...blogEditor, content: e.target.value })} placeholder="Write your article here..." /></Field></div>
              {blogEditor.image && <img src={blogEditor.image} alt="Blog cover preview" className="mt-5 h-44 w-64 rounded-xl border border-[#e5e7df] object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
            </Editor>}

            <p className="mt-8 text-center text-[10px] leading-5 text-[#969d91]">Admin prototype · data is saved in this browser only. Connect a secured backend/database before using this to manage the live store.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Status({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${status === "Published" ? "bg-[#e9f4e7] text-[#3b7541]" : "bg-[#f4efe2] text-[#94713a]"}`}>{status || "Draft"}</span>;
}

function ActionButton({ children, label, onClick, danger = false }) {
  return <button type="button" title={label} aria-label={label} onClick={onClick} className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${danger ? "text-[#a24d45] hover:bg-[#fff0ed]" : "text-[#60705d] hover:bg-[#edf2e9] hover:text-[#203f2d]"}`}>{children}</button>;
}

function Empty({ label }) {
  return <div className="px-6 py-16 text-center"><Package size={30} className="mx-auto mb-3 text-[#9aa391]" /><p className="text-sm text-[#7b8578]">{label}</p></div>;
}

function Editor({ title, children, onCancel, onSubmit, onSaveLabel }) {
  return <form onSubmit={onSubmit} className="mx-auto max-w-4xl rounded-2xl border border-[#e5e7df] bg-white p-5 sm:p-8"><div className="mb-7 flex items-center justify-between gap-3 border-b border-[#edf0e9] pb-5"><div><p className="text-xs uppercase tracking-[.15em] text-[#9a8050]">Content editor</p><h2 className="mt-1 text-xl font-semibold">{title}</h2></div><button type="button" onClick={onCancel} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7df] hover:bg-[#f6f7f3]" aria-label="Close editor"><X size={17} /></button></div>{children}<div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-[#edf0e9] pt-5"><button type="button" onClick={onCancel} className="rounded-lg border border-[#e1e5dc] px-5 py-3 text-xs font-semibold hover:bg-[#f7f8f4]">Cancel</button><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#203f2d] px-5 py-3 text-xs font-semibold text-white hover:bg-[#2d563c]"><Save size={15} />{onSaveLabel}</button></div></form>;
}
