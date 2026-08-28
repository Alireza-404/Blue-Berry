import { useEffect } from "react";

import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";
import ShopCategory from "../components/Shop/Category/Category";
import ShopProducts from "../components/Shop/ShopProducts/ShopProducts";

export default function ShopPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="overflow-hidden">
        <section id="categories-section">
          <div
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-20 
                  lg:pt-28 pb-10"
          >
            <ShopCategory />
          </div>
        </section>

        <section id="shop-products-section">
          <div
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pb-20 
                  lg:pb-28 pt-10"
          >
            <ShopProducts />
          </div>
        </section>
      </main>

      <footer className="bg-gray-200/85 dark:bg-box-D">
        <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-12 pb-4">
          <Footer />
        </div>
      </footer>
    </>
  );
}
