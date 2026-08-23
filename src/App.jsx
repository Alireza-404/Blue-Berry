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
import SingleProduct from "./pages/SingleProduct";
import useUserData from "./hooks/useUserData";
import WishlistPage from "./pages/WishlistPage";
import useAuthSession from "./hooks/useAuthSession";
import AdminRoute from "./routes/AdminRoute";
import Panel from "./pages/Panel/Panel";
import AddProduct from "./pages/Panel/AddProduct";
import Products from "./pages/Panel/Products";
import ShopPage from "./pages/ShopPage";
import NotFoundPage from "./pages/404";
import AddBlog from "./pages/Panel/AddBlog";
import UpdateProduct from "./pages/Panel/UpdateProduct";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./redux/Slices/ThemeSlice";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

import "./App.css";
import Blogs from "./pages/Panel/Blogs";
import UpdateBlog from "./pages/Panel/UpdateBlog";
import BlogPage from "./pages/Blog";

function App() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const root = window.document.documentElement;

  const { i18n } = useTranslation();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

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
    ScrollTrigger.refresh();
  }, [i18n.language]);

  useAuthSession();
  useUserData();

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

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/panel"
          element={
            <AdminRoute>
              <Panel />
            </AdminRoute>
          }
        />

        <Route
          path="/panel/products/new"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/panel/products"
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />

        <Route
          path="/panel/products/:id/edit"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />

        <Route path="/shop" element={<ShopPage />} />

        <Route
          path="/panel/blogs/new"
          element={
            <AdminRoute>
              <AddBlog />
            </AdminRoute>
          }
        />

        <Route
          path="/panel/blogs"
          element={
            <AdminRoute>
              <Blogs />
            </AdminRoute>
          }
        />

        <Route
          path="/panel/blogs/:id/edit"
          element={
            <AdminRoute>
              <UpdateBlog />
            </AdminRoute>
          }
        />

        <Route path="/blog" element={<BlogPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// (Get-ChildItem .\src -Recurse -File -Include *.js,*.jsx,*.css,*.json | Get-Content | Measure-Object -Line).Lines
