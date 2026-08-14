import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";

export default function ShopPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="overflow-hidden">
        <section id="article-section">
          <div
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 
                  lg:py-28"
          ></div>
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
