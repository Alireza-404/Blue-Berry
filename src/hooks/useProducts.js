import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/ProductsService";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/Slices/ToastSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useProducts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [getProductByIdLoading, setGetProductByIdLoading] = useState(false);
  const [getProductByIdError, setGetProductByIdError] = useState(false);
  const [singleProductForEdit, setSignleProductForEdit] = useState(null);

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
        })
      );
    } else {
      setError(false);
      setProducts(result.data);
    }
    setLoading(false);
  };

  const handleAddProduct = async (values, resetForm) => {
    setAddProductLoading(true);
    const { success, error } = await addProduct(values);

    if (!success && error === "insert_error") {
      setAddProductLoading(false);
      return dispatch(
        showToast({
          type: "error",
          message: "Failed to add product.",
        })
      );
    }

    if (!success && error === "catch_error") {
      setAddProductLoading(false);
      return dispatch(
        showToast({
          type: "error",
          message: "Something went wrong.",
        })
      );
    }

    resetForm();
    dispatch(
      showToast({
        type: "primary",
        message: "Product added successfully.",
      })
    );
    setAddProductLoading(false);
  };

  const handleDeleteProduct = async (productId) => {
    setDeleteLoading(true);
    const { success, error } = await deleteProduct(productId);

    if (!success && error === "delete_error") {
      setDeleteLoading(false);
      return dispatch(
        showToast({
          type: "error",
          message: "Failed to remove product.",
        })
      );
    }

    if (!success && error === "catch_error") {
      setDeleteLoading(false);
      return dispatch(
        showToast({
          type: "error",
          message: "Something went wrong.",
        })
      );
    }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    dispatch(
      showToast({
        type: "primary",
        message: "Product removed successfully.",
      })
    );
    setDeleteLoading(false);
  };

  const handleUpdateProduct = async (productId, values) => {
    setUpdateLoading(true);
    const { success, error } = await updateProduct(productId, values);

    if (!success && error === "update_error") {
      setUpdateLoading(false);
      return dispatch(
        showToast({
          type: "error",
          message: "Failed to update product.",
        })
      );
    }

    if (!success && error === "catch_error") {
      setUpdateLoading(false);
      return dispatch(
        showToast({
          type: "error",
          message: "Something went wrong.",
        })
      );
    }

    dispatch(
      showToast({
        type: "primary",
        message: "Product updated successfully.",
      })
    );
    setUpdateLoading(false);
    navigate("/panel/products", { replace: true });
  };

  const handleGetProductById = async (productId) => {
    setGetProductByIdError(false);
    setGetProductByIdLoading(true);

    const { data, error, success } = await getProductById(productId);

    if (!success && error === "fetch_error") {
      setGetProductByIdError(true);
      setGetProductByIdLoading(false);
      dispatch(
        showToast({
          type: "error",
          message: "Failed to load product.",
        })
      );
      return;
    }

    if (!success && error === "catch_error") {
      setGetProductByIdError(true);
      setGetProductByIdLoading(false);
      dispatch(
        showToast({
          type: "error",
          message: "Something went wrong.",
        })
      );
      return;
    }

    setSignleProductForEdit(data);
    setGetProductByIdError(false);
    setGetProductByIdLoading(false);
  };

  ScrollTrigger.refresh();

  useEffect(() => {
    handleGetProducts();
  }, []);

  return {
    handleGetProducts,
    handleAddProduct,
    handleDeleteProduct,
    handleUpdateProduct,
    handleGetProductById,
    products,
    loading,
    error,
    addProductLoading,
    deleteLoading,
    updateLoading,
    getProductByIdLoading,
    getProductByIdError,
    singleProductForEdit,
  };
}
