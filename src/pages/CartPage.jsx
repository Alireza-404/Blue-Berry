import gsap from "gsap";
import CartProducts from "../components/Cart/CartProducts/CartProducts";
import Summary from "../components/Cart/Summary/Summary";
import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";

import { useEffect, useLayoutEffect, useRef } from "react";

export default function CartPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.from(self.selector("#summary-section"), {
        x: -200,
        opacity: 0,
        ease: "power3.out",
        duration: 0.6,
        delay: 0.1,
      });

      gsap.from(self.selector("#cart-products-section"), {
        x: 200,
        opacity: 0,
        ease: "power3.out",
        duration: 0.6,
        delay: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div
          ref={containerRef}
          className="flex flex-col gap-y-12 lg:flex-row lg:gap-x-12 container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-[72px]
            lg:py-20"
        >
          <section id="summary-section" className="duration-0">
            <Summary />
          </section>

          <section id="cart-products-section" className="w-full duration-0">
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
