import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";
import Image from "../components/SingleProduct/Image/Image";

import { useParams } from "react-router-dom";
import FullScreenLoader from "../components/Ui/FullScreenLoader/FullScreenLoader";
import Product from "../components/SingleProduct/Product/Product";
import { useEffect } from "react";
import InfoAndDetail from "../components/SingleProduct/InfoAndDetail/InfoAndDetail";
import useWishlist from "../hooks/useWishlist";
import useProducts from "../hooks/useProducts";
import RelatedProducts from "../components/SingleProduct/RelatedProducts/RelatedProducts";
import RelatedProductsText from "../components/SingleProduct/RelatedProductsText/RelatedProductsText";
import { useTranslation } from "react-i18next";

export default function SingleProduct() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { heartLoading } = useWishlist();
  const {
    handleGetProductById,
    getProductByIdLoading,
    singleProductForEdit: product,
    getProductByIdError,
  } = useProducts();

  useEffect(() => {
    handleGetProductById(id);
  }, []);

  if (getProductByIdLoading || heartLoading) return <FullScreenLoader />;
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        {getProductByIdError ? (
          <section id="connectio-error-section">
            <div
              className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20
                    lg:py-28 h-[calc(100vh-586px)] flex items-center justify-center"
            >
              <p
                className="font-bold text-3xl text-red-500 dark:text-red-600 lg:w-[707px]
                text-center"
              >
                {t("singleProduct.connectionError")}
              </p>
            </div>
          </section>
        ) : (
          <>
            <section id="single-product-section">
              <div
                className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 
                    lg:py-28 "
              >
                {product && (
                  <>
                    <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
                      <Image src={product.image} title={product.title} />

                      <Product product={product} />
                    </div>

                    <InfoAndDetail product={product} />
                  </>
                )}
              </div>
            </section>

            <section id="related-products-section">
              <div
                className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-8 
                    lg:pb-28"
              >
                {product && (
                  <div className="flex flex-col gap-y-6 lg:gap-y-12">
                    <RelatedProductsText />

                    <RelatedProducts productCategory={product.category_en} />
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-gray-200/85 dark:bg-box-D">
        <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-12 pb-4">
          <Footer />
        </div>
      </footer>
    </>
  );
}
