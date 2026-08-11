import { useState } from "react";
import PanelLayout from "../../components/Layout/PanelLayout/PanelLayout";
import AdminActions from "../../components/Panel/AdminActions/AdminActions";
import PanelFooter from "../../components/Panel/Footer/Footer";
import Hero from "../../components/Panel/Hero/Hero";

export default function Panel() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <PanelLayout showMenu={showMenu} setShowMenu={setShowMenu}>
      <div className="relative w-full px-7 py-8 xl:px-14 xl:pt-16 pb-12 lg:ml-72 xl:ml-80">
        <div
          className="w-11/12 absolute -top-32 left-1/2 -translate-x-1/2 bg-blue-600/40
            h-32 rounded-full blur-2xl"
        ></div>

        <header>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2.5">
              <h1 className="text-4xl font-bold text-white">Dashboard</h1>

              <p className="text-zinc-500">
                Welcome to your store management panel.
              </p>

              <span
                className="text-zinc-500 mt-4 cursor-pointer border-b border-blue-600
                w-fit pb-2 lg:hidden block"
                onClick={() => setShowMenu(true)}
              >
                Open Main Menu
              </span>
            </div>

            <span className="text-zinc-600 font-normal text-lg tracking-widest lg:block hidden">
              ADMIN PANEL
            </span>
          </div>
        </header>

        <main>
          <section id="hero-section">
            <div
              className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 
              lg:pt-28 lg:pb-8 flex items-center"
            >
              <Hero />
            </div>
          </section>

          <section id="admin-actions-section">
            <div
              className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 lg:pt-8 pb-16
              flex items-center"
            >
              <AdminActions />
            </div>
          </section>
        </main>

        <footer>
          <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4">
            <PanelFooter />
          </div>
        </footer>
      </div>
    </PanelLayout>
  );
}
