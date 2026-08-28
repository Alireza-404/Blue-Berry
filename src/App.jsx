import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import HomePage from "./pages/HomePage";

import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Toast from "./components/Ui/Toast/Toast";
import FullScreenLoader from "./components/Ui/FullScreenLoader/FullScreenLoader";

import useAuthSession from "./hooks/useAuthSession";
import useUserData from "./hooks/useUserData";

import "./App.css";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const BlogPage = lazy(() => import("./pages/Blog"));
const SingleBlog = lazy(() => import("./pages/SingleBlog"));
const NotFoundPage = lazy(() => import("./pages/404"));

const Panel = lazy(() => import("./pages/Panel/Panel"));
const AddProduct = lazy(() => import("./pages/Panel/AddProduct"));
const Products = lazy(() => import("./pages/Panel/Products"));
const UpdateProduct = lazy(() => import("./pages/Panel/UpdateProduct"));
const AddBlog = lazy(() => import("./pages/Panel/AddBlog"));
const Blogs = lazy(() => import("./pages/Panel/Blogs"));
const UpdateBlog = lazy(() => import("./pages/Panel/UpdateBlog"));

function App() {
  const { i18n } = useTranslation();
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [i18n.language]);

  useAuthSession();
  useUserData();

  return (
    <BrowserRouter>
      <Toast />

      <Suspense fallback={<FullScreenLoader />}>
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

          <Route path="/shop" element={<ShopPage />} />

          <Route path="/blog" element={<BlogPage />} />

          <Route path="/blog/:title" element={<SingleBlog />} />

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

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// (Get-ChildItem .\src -Recurse -File -Include *.js,*.jsx,*.css,*.json | Get-Content | Measure-Object -Line).Lines
