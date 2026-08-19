import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";
import HeroSection from "../components/About/HeroSection/HeroSection";
import Services from "../components/Home/Services/Services";
import ServicesText from "../components/About/ServicesText/ServicesText";
import ManagerComponent from "../components/Home/ManagerComponent/ManagerComponent";
import OurTeam from "../components/About/OurTeam/OurTeam";
import OurTeamText from "../components/About/OurTeamText/OurTeamText";

import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header>
        <Navbar />

        <div className="bg-gray-200/85 dark:bg-[#1b1e26]">
          <HeroSection />
        </div>
      </header>

      <main>
        <section id="services-section">
          <div
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28
            flex flex-col gap-y-6 lg:gap-y-12"
          >
            <ServicesText />

            <Services />
          </div>
        </section>

        <section id="manager-section">
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28">
            <ManagerComponent />
          </div>
        </section>

        <section id="our-team-section">
          <div
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28
            flex flex-col gap-y-6 lg:gap-y-12"
          >
            <OurTeamText />

            <OurTeam />
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
