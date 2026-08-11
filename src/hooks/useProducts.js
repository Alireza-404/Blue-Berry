import { useEffect, useState } from "react";
import { addProduct, getProducts } from "../services/ProductsService";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/Slices/ToastSlice";
import { useTranslation } from "react-i18next";

export default function useProducts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGetProducts = async () => {
    setLoading(true);
    setError(false);

    const result = await getProducts();

    if (!result.success) {
      console.log(result.error);
      setError(true);
      dispatch(
        showToast({
          type: "error",
          message: t("homePageProducts.failedToLoadProducts"),
        }),
      );
    } else {
      setError(false);
      setProducts(result.data);
    }
    setLoading(false);
  };

  const handleAddProduct = async (values) => {
    const { success, error } = await addProduct(values);

    if (!success && error === "insert_error") {
      return dispatch(
        showToast({
          type: "error",
          message: "Failed to add product.",
        }),
      );
    }

    if (!success && error === "catch_error") {
      return dispatch(
        showToast({
          type: "error",
          message: "Something went wrong.",
        }),
      );
    }

    dispatch(
      showToast({
        type: "primary",
        message: "Product added successfully.",
      }),
    );
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return { handleGetProducts, handleAddProduct, products, loading, error };
}
