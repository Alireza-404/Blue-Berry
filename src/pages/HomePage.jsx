import Articles from "../components/Home/Articles/Articles";
import Categories from "../components/Home/Categories/Categories";
import CategoryImage from "../components/Home/CategoryImage/CategoryImage";
import CategoryText from "../components/Home/CategoryText/CategoryText";
import DOTDText from "../components/Home/DOTDText/DOTDText";
import DOTDProducts from "../components/Home/DOTDProducts/DOTDProducts";
import Footer from "../components/Layout/Footer/Footer";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import HomePageProducts from "../components/Home/HomePageProducts/HomePageProducts";
import InstaCompontnt from "../components/Home/InstaComponent/InstaCompontnt";
import ManagerComponent from "../components/Home/ManagerComponent/ManagerComponent";
import Navbar from "../components/Layout/Navbar/Navbar";
import OrganicComponent from "../components/Home/OrganicComponent/OrganicComponent";
import Services from "../components/Home/Services/Services";
import SpecialCategories from "../components/Home/SpecialCategories/SpecialCategories";
import TopVendors from "../components/Home/TopVendors/TopVendors";
import TopVendorsText from "../components/Home/TopVendorsText/TopVendorsText";

export default function HomePage() {
  return (
    <>
      <header>
        <Navbar />

        <div className="bg-gray-200/85 dark:bg-[#1b1e26]">
          <HeroSection />
        </div>
      </header>

      <main className="overflow-hidden">
        <section id="categories-section">
          <div
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-20 
            lg:pt-28 lg:pb-44 flex items-center"
          >
            <CategoryImage />

            <div className="relative w-full lg:h-96 xl:h-[480px]">
              <CategoryText />

              <Categories />
            </div>
          </div>
        </section>

        <section
          id="day-of-the-deal-section"
          className="relative overflow-hidden border-y border-primary bg-primary/5"
        >
          <div className="relative z-20 container mx-auto px-4 py-20 lg:py-28">
            <DOTDText />

            <DOTDProducts />
          </div>

          <div
            className="w-[404px] h-[404px] bg-primary/15 rounded-full absolute top-0 left-1/2
            -translate-x-1/2 blur-3xl z-10"
          ></div>
        </section>

        <section id="special-categories-section">
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28">
            <SpecialCategories />
          </div>
        </section>

        <section id="organic-section">
          <div className="py-20 lg:py-28">
            <div className="relative">
              <OrganicComponent />
            </div>
          </div>
        </section>

        <section id="products-section">
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28">
            <HomePageProducts />
          </div>
        </section>

        <section id="services-section">
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28">
            <Services />
          </div>
        </section>

        <section id="top-vendors-section">
          <div
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28
            flex flex-col gap-y-6 lg:gap-y-12"
          >
            <TopVendorsText />

            <TopVendors />
          </div>
        </section>

        <section id="manager-section">
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28">
            <ManagerComponent />
          </div>
        </section>

        <section id="articles-section">
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28">
            <Articles />
          </div>
        </section>

        <section id="articles-section">
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28">
            <InstaCompontnt />
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
