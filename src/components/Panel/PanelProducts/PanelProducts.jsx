import { useTranslation } from "react-i18next";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

import useProducts from "../../../hooks/useProducts";
import ProductsError from "../../Ui/ProductsError/ProductsError";
import PanelButton from "../PanelButton/PanelButton";

export default function PanelProducts() {
  const { t, i18n } = useTranslation();
  const {
    handleGetProducts,
    handleDeleteProduct,
    products,
    error,
    loading,
    deleteLoading,
  } = useProducts();

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="flex justify-center items-center h-72">
          <span
            className="animate-spin border-x-2 border-t-2 border-white/20
              rounded-full w-10 h-10 ml-2"
          ></span>
        </div>
      ) : error ? (
        <ProductsError
          className={"h-72 justify-center"}
          text={t("homePageProducts.productsLoadError")}
          getProducts={handleGetProducts}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="border border-white/10 hover:border-blue-600/30
              flex flex-col gap-y-8 rounded-xl"
            >
              <div className="flex flex-col gap-y-4 xs:flex-row items-start gap-x-4 px-6 pt-6">
                <img
                  src={product.image}
                  alt={`Product Image ${i + 1}`}
                  className="w-44 h-44 mx-auto xs:mx-0 xs:w-24 xs:h-24 xl:w-32 xl:h-32 rounded-2xl"
                />

                <div className="flex flex-col justify-between h-28 xl:h-32">
                  <div className="flex items-center justify-between gap-x-1">
                    <h4 className="text-white text-lg line-clamp-1">
                      {product.title_en}
                    </h4>

                    <span className="text-blue-600 text-sm">
                      {product.category_en}
                    </span>
                  </div>

                  <p className="text-zinc-500 line-clamp-2 text-sm">
                    {product.description}
                  </p>

                  <span className="text-zinc-500 text-sm">
                    SKU#: <span className="text-blue-600">{product.sku}</span>
                  </span>
                </div>
              </div>

              <ul className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-4 px-6">
                <li className="text-zinc-500">
                  Price: <span className="text-white">${product.price}</span>
                </li>

                <li className="text-zinc-500">
                  Brand: <span className="text-white">{product.brand}</span>
                </li>

                <li className="text-zinc-500">
                  Is Deal:{" "}
                  <span className="text-white">
                    {product.is_deal ? "Yes" : "No"}
                  </span>
                </li>

                <li className="text-zinc-500">
                  Discount:{" "}
                  <span className="text-white">{product.discount}%</span>
                </li>

                <li className="text-zinc-500">
                  Country:{" "}
                  <span
                    className={
                      product.country === "Germany"
                        ? "text-yellow-300"
                        : product.country === "England"
                        ? "text-blue-300"
                        : "text-white"
                    }
                  >
                    {product.country}
                  </span>
                </li>

                <li className="text-zinc-500">
                  Stock: <span className="text-white">{product.stock}</span>
                </li>
              </ul>

              <div
                className="flex flex-col gap-y-4 xs:justify-between xs:flex-row
                lg:flex-col xl:flex-row gap-y-4xl:items-center xl:justify-between p-4 bg-neutral-900/20
                border-white/10 border-t"
              >
                <div className="flex items-center gap-x-2 xl:gap-x-4">
                  <PanelButton type={"button"}>
                    <Link
                      to={`/panel/products/${product.id}/edit`}
                      className={`text-blue-600 bg-blue-500/10 px-6 py-2 rounded-lg border 
                      border-blue-600/30 hover:border-blue-600/45 hover:bg-blue-500/15
                      flex items-center justify-center gap-x-2.5`}
                    >
                      Edit
                    </Link>
                  </PanelButton>

                  <PanelButton
                    type={"button"}
                    disabled={deleteLoading}
                    className={`text-red-600 bg-red-500/10 px-6 py-2 rounded-lg border 
                    border-red-600/30 hover:border-red-600/45 hover:bg-red-500/15
                    flex items-center justify-center gap-x-2.5
                    ${deleteLoading ? "opacity-50" : "opacity-100"}`}
                    click={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </PanelButton>
                </div>

                <div className="flex items-center gap-x-0.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    return (
                      <span key={star}>
                        {product.stars >= star ? (
                          <AiFillStar className="text-orange-400" />
                        ) : (
                          <AiOutlineStar className="text-secondary dark:text-secondary-D" />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
