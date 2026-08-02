import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import GuestRoute from "./routes/GuestRoute";
import Toast from "./components/Ui/Toast/Toast";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./routes/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTheme } from "./redux/Slices/ThemeSlice";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "./lib/supabase";
import { clearUser, setUser } from "./redux/Slices/AuthSlice";
import { getCartItems } from "./services/CartService";
import { clearCart, setCartItems } from "./redux/Slices/CartItemsSlice";

import "./App.css";
import { useTranslation } from "react-i18next";
import SingleProduct from "./pages/SingleProduct";
import { getWishlistItems } from "./services/ProductsService";
import { clearWishlist, setWishlistItem } from "./redux/Slices/WishlistSlice";

function App() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const root = window.document.documentElement;

  const { i18n } = useTranslation();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        dispatch(setUser(data.session.user));
      } else {
        dispatch(clearUser());
      }
    };

    getUser();
  }, [dispatch]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    dispatch(setTheme(theme || "light"));
  }, [dispatch]);

  useEffect(() => {
    if (currentTheme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [currentTheme]);

  useEffect(() => {
    const cartHandler = async () => {
      if (user) {
        const cartItems = await getCartItems(user.id);
        dispatch(setCartItems(cartItems));
      } else {
        dispatch(clearCart());
      }
    };

    const wishlistHandler = async () => {
      if (user) {
        const wishlistItems = await getWishlistItems(user.id);
        if (wishlistItems.success) {
          dispatch(setWishlistItem(wishlistItems.data));
        }
      } else {
        dispatch(clearWishlist());
      }
    };

    cartHandler();
    wishlistHandler();
  }, [user]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Toast />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/auth/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
