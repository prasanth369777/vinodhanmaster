
import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import CartDrawer from "./components/CartDrawer";
import SearchModal from "./components/SearchModal";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import NewArrivals from "./pages/NewArrivals";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";

import {
  products as productData,
  collections,
} from "./data/products";

const PRODUCTS_KEY = "vinodhan_admin_products_v1";

function getStoreProducts() {
  let adminProducts = [];

  try {
    const saved = localStorage.getItem(PRODUCTS_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) adminProducts = parsed;
    }
  } catch (error) {
    console.error("Could not read admin products:", error);
  }

  const merged = new Map(
    productData.map((product) => [
      String(product.id),
      {
        ...product,
        status: product.status || "Published",
      },
    ])
  );

  adminProducts.forEach((product) => {
    if (!product || product.id == null) return;

    merged.set(String(product.id), {
      ...(merged.get(String(product.id)) || {}),
      ...product,
      id: product.id,
    });
  });

  return Array.from(merged.values()).filter(
    (product) =>
      product.status !== "Draft" &&
      product.status !== "Archived"
  );
}

export default function App() {
  const location = useLocation();

  const [storeProducts, setStoreProducts] =
    useState(getStoreProducts);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const refreshProducts = () => {
      setStoreProducts(getStoreProducts());
    };

    window.addEventListener("storage", refreshProducts);
    window.addEventListener(
      "vinodhan-products-updated",
      refreshProducts
    );

    return () => {
      window.removeEventListener("storage", refreshProducts);
      window.removeEventListener(
        "vinodhan-products-updated",
        refreshProducts
      );
    };
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.qty, 0),
    [cart]
  );

  const addToCart = (product) => {
    if (
      product.status === "Out of stock" ||
      product.status === "Draft" ||
      product.price == null
    ) {
      return;
    }

    setCart((current) => {
      const existing = current.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        return current.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...current, { ...product, qty: 1 }];
    });

    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          String(item.id) === String(id)
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((current) =>
      current.filter((item) => String(item.id) !== String(id))
    );
  };

  return (
    <div className="app-shell">
      {!isAdmin && (
        <Header
          cartCount={cartCount}
          onCart={() => setCartOpen(true)}
          onSearch={() => setSearchOpen(true)}
        />
      )}

      <div
        key={location.pathname}
        className={isAdmin ? "" : "route-content"}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={storeProducts}
                onAdd={addToCart}
              />
            }
          />

          <Route
            path="/shop"
            element={
              <Shop
                products={storeProducts}
                onAdd={addToCart}
              />
            }
          />

          <Route
            path="/collections"
            element={
              <Collections
                products={storeProducts}
                collections={collections}
                onAdd={addToCart}
              />
            }
          />

          <Route
            path="/new-arrivals"
            element={
              <NewArrivals
                products={storeProducts}
                onAdd={addToCart}
              />
            }
          />

          <Route path="/about" element={<About />} />

          <Route path="/courses" element={<Courses />} />

          <Route path="/admin/*" element={<Admin />} />

          <Route
            path="*"
            element={
              <Shop
                products={storeProducts}
                onAdd={addToCart}
              />
            }
          />
        </Routes>
      </div>

      {!isAdmin && (
        <>
          <Footer />
          <WhatsApp />

          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            onQty={changeQty}
            onRemove={removeItem}
          />

          <SearchModal
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            products={storeProducts}
          />
        </>
      )}
    </div>
  );
}
