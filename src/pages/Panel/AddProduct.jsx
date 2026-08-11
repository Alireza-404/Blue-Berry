import { useState } from "react";
import PanelLayout from "../../components/Layout/PanelLayout/PanelLayout";
import AddProductForm from "../../components/Panel/AddProductForm/AddProductForm";
import PanelFooter from "../../components/Panel/Footer/Footer";

export default function AddProduct() {
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
              <h1 className="text-4xl font-bold text-white">Add Product</h1>

              <p className="text-zinc-500">
                Add a new product to your store and provide its essential
                details.
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
              className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-4 py-20 
                flex items-center"
            >
              <AddProductForm />
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
