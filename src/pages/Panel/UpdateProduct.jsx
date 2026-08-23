import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useProducts from "../../hooks/useProducts";
import PanelLayout from "../../components/Layout/PanelLayout/PanelLayout";
import PanelFooter from "../../components/Panel/Footer/Footer";
import ProductForm from "../../components/Panel/ProductForm/ProductForm";
import ErrorSkeleton from "../../components/Ui/ErrorSkeleton/ErrorSkeleton";

export default function UpdateProduct() {
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const {
    handleGetProductById,
    singleProductForEdit,
    getProductByIdError,
    getProductByIdLoading,
  } = useProducts();

  useEffect(() => {
    handleGetProductById(id);
  }, [id]);

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
              <h1 className="text-4xl font-bold text-white">Edit Product</h1>

              <p className="text-zinc-500">
                Update your product details and information.
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
              {getProductByIdError ? (
                <ErrorSkeleton
                  className={"h-72 justify-center"}
                  text={"Failed to load product."}
                  get={handleGetProductById(id)}
                />
              ) : getProductByIdLoading ? (
                <div className="flex justify-center items-center w-full h-72">
                  <span
                    className="animate-spin border-x-2 border-t-2 border-white/20
                    rounded-full w-10 h-10 ml-2"
                  ></span>
                </div>
              ) : (
                <ProductForm mode="update" product={singleProductForEdit} />
              )}
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
