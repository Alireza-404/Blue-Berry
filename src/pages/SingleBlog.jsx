import { useEffect } from "react";
import useBlog from "../hooks/useBlog";
import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";
import { useParams } from "react-router-dom";
import FullScreenLoader from "../components/Ui/FullScreenLoader/FullScreenLoader";
import { useTranslation } from "react-i18next";
import RecentArticles from "../components/Blog/RecentArticles/RecentArticles";

export default function SingleBlog() {
  const { t, i18n } = useTranslation();
  const { title } = useParams();
  const locale = i18n.language === "de" ? "de-DE" : "en-US";

  const {
    handleGetBlogById,
    handleGetBlogs,
    getBlogByIdLoading,
    loading,
    error,
    getBlogByIdError,
    singleBlog,
    blogs,
  } = useBlog();

  useEffect(() => {
    handleGetBlogs();
    handleGetBlogById(title);
  }, [title]);

  if (getBlogByIdLoading || loading) return <FullScreenLoader />;

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        {getBlogByIdError || error ? (
          <section id="connectio-error-section">
            <div
              className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20
                      lg:py-28 h-[calc(100vh-586px)] flex items-center justify-center"
            >
              <p
                className="font-bold text-3xl text-red-500 dark:text-red-600 lg:w-[707px]
                  text-center"
              >
                {t("blogs.singleBlog.connectionError")}
              </p>
            </div>
          </section>
        ) : (
          <section
            id="recent-articles-section"
            className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 
                    lg:py-28 flex flex-col gap-y-12 lg:flex-row lg:items-start lg:gap-x-8"
          >
            <RecentArticles blogs={blogs} />

            <div className="flex flex-col gap-y-8">
              <img
                src={singleBlog?.image}
                alt={singleBlog?.title_en || ""}
                className="rounded-3xl w-full"
              />

              <div className="flex flex-col">
                <span className="text-sm text-secondary dark:text-secondary-D">
                  {new Date(singleBlog?.created_at).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>

                <h2 className="text-2xl font-bold text-TB dark:text-white">
                  {i18n.language === "de"
                    ? singleBlog?.title_de
                    : singleBlog?.title_en}
                </h2>
              </div>

              <p className="text-secondary dark:text-secondary-D whitespace-pre-wrap">
                {i18n.language === "de"
                  ? singleBlog?.description_de
                  : singleBlog?.description_en}
              </p>

              <p className="text-secondary dark:text-secondary-D whitespace-pre-wrap">
                {i18n.language === "de"
                  ? singleBlog?.content_de
                  : singleBlog?.content_en}
              </p>
            </div>
          </section>
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
