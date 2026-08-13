import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";
import Image from "../components/SingleProduct/Image/Image";

import { useParams } from "react-router-dom";
import FullScreenLoader from "../components/Ui/FullScreenLoader/FullScreenLoader";
import Product from "../components/SingleProduct/Product/Product";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import InfoAndDetail from "../components/SingleProduct/InfoAndDetail/InfoAndDetail";
import { useSelector } from "react-redux";
import useWishlist from "../hooks/useWishlist";

export default function SingleProduct() {
  const { id } = useParams();
  const { heartLoading } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.log(error.message);
          setLoading(false);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading || heartLoading) return <FullScreenLoader />;

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
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
      </main>

      <footer className="bg-gray-200/85 dark:bg-box-D">
        <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-12 pb-4">
          <Footer />
        </div>
      </footer>
    </>
  );
}
