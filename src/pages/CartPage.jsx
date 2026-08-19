import CartProducts from "../components/Cart/CartProducts/CartProducts";
import Summary from "../components/Cart/Summary/Summary";
import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";

import { useEffect } from "react";

export default function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div
          className="flex flex-col gap-y-12 lg:flex-row lg:gap-x-12 container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-[72px]
            lg:py-20"
        >
          <section id="summary-section">
            <Summary />
          </section>

          <section id="products-section" className="w-full">
            <CartProducts />
          </section>
        </div>
      </main>

      <footer className="bg-gray-200/85 dark:bg-box-D">
        <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-12 pb-4">
          <Footer />
        </div>
      </footer>
    </>
  );
}
