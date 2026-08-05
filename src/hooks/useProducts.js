import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductsService";
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

  useEffect(() => {
    handleGetProducts();
  }, []);

  return { handleGetProducts, products, loading, error };
}
