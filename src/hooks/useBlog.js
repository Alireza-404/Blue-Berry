import { useState } from "react";
import {
  addBlog,
  deleteBlog,
  getBlogs,
  getSignleBlog,
  updateBlog,
} from "../services/BlogService";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showToast } from "../redux/Slices/ToastSlice";
import { useNavigate } from "react-router-dom";

export default function useBlog() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);

  const [error, setError] = useState(false);
  const [getBlogByIdError, setGetBlogByIdError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [addBlogLoading, setAddBlogLoading] = useState(false);
  const [deleteBlogLoading, setDeleteBlogLoading] = useState(false);
  const [updateBlogLoading, setUpdateBlogLoading] = useState(false);
  const [getBlogByIdLoading, setGetBlogByIdLoading] = useState(false);

  const handleGetBlogs = async () => {
    setLoading(true);
    setError(false);

    const { data, success, error } = await getBlogs();

    if (!success && error) {
      setLoading(false);
      setError(true);
      dispatch(
        showToast({ type: "error", message: t("blogs.blogsLoadError") })
      );
      return;
    }

    setLoading(false);
    setError(false);
    setBlogs(data);
  };

  const handleAddBlog = async (values, resetForm) => {
    setAddBlogLoading(true);
    const { success, error } = await addBlog(values);

    if (!success && error === "insert_error") {
      setAddBlogLoading(false);
      dispatch(showToast({ type: "error", message: "Failed to add blog." }));
      return;
    }

    if (!success && error === "catch_error") {
      setAddBlogLoading(false);
      dispatch(showToast({ type: "error", message: "Something went wrong." }));
      return;
    }

    resetForm();
    setAddBlogLoading(false);
    dispatch(
      showToast({ type: "primary", message: "Blog added successfully." })
    );
  };

  const handleDeleteBlog = async (blogId) => {
    setDeleteBlogLoading(true);
    const { success, error } = await deleteBlog(blogId);

    if (!success && error === "delete_error") {
      setDeleteBlogLoading(false);
      dispatch(showToast({ type: "error", message: "Failed to delete blog." }));
      return;
    }

    if (!success && error === "catch_error") {
      setDeleteBlogLoading(false);
      dispatch(showToast({ type: "error", message: "Something went wrong." }));
      return;
    }

    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));

    dispatch(
      showToast({ type: "primary", message: "Blog deleted successfully." })
    );
    setDeleteBlogLoading(false);
  };

  const handleUpdateBlog = async (blogId, values) => {
    setUpdateBlogLoading(true);
    const { success, error } = await updateBlog(blogId, values);

    if (!success && error === "update_error") {
      setUpdateBlogLoading(false);
      dispatch(showToast({ type: "error", message: "Failed to update blog" }));
      return;
    }

    if (!success && error === "catch_error") {
      setUpdateBlogLoading(false);
      dispatch(showToast({ type: "error", message: "Something went wrong" }));
      return;
    }

    setUpdateBlogLoading(true);
    dispatch(
      showToast({ type: "primary", message: "Blog updated successfully." })
    );
    navigate("/panel/blogs", { replace: true });
  };

  const handleGetBlogById = async (blogTitle) => {
    setGetBlogByIdError(false);
    setGetBlogByIdLoading(true);

    const { data, success, error } = await getSignleBlog(blogTitle);

    if (!success && error === "fetch_error") {
      setGetBlogByIdError(true);
      setGetBlogByIdLoading(false);
      dispatch(
        showToast({
          type: "error",
          message: "Failed to load blog.",
        })
      );
      return;
    }

    if (!success && error === "catch_error") {
      setGetBlogByIdError(true);
      setGetBlogByIdLoading(false);
      dispatch(
        showToast({
          type: "error",
          message: "Something went wrong.",
        })
      );
      return;
    }

    setSingleBlog(data);
    setGetBlogByIdError(false);
    setGetBlogByIdLoading(false);
  };

  return {
    handleGetBlogs,
    handleAddBlog,
    handleDeleteBlog,
    handleUpdateBlog,
    handleGetBlogById,
    blogs,
    singleBlog,
    loading,
    addBlogLoading,
    deleteBlogLoading,
    updateBlogLoading,
    getBlogByIdLoading,
    error,
    getBlogByIdError,
  };
}
