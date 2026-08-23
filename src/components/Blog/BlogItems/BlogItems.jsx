import { useEffect, useState } from "react";
import useBlog from "../../../hooks/useBlog";
import BlogsSkeleton from "../../Ui/BlogsSkeleton/BlogsSkeleton";
import ErrorSkeleton from "../../Ui/ErrorSkeleton/ErrorSkeleton";
import { useTranslation } from "react-i18next";
import SecondaryButton from "../../Ui/SecondaryButton/SecondaryButton";
import { Link } from "react-router-dom";

const BLOGS_PER_PAGE = 6;

export default function BlogItems() {
  const { t, i18n } = useTranslation();
  const { handleGetBlogs, blogs, error, loading } = useBlog();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const paginationBlogs = blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  useEffect(() => {
    handleGetBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <BlogsSkeleton />
        ) : error ? (
          <ErrorSkeleton
            className={"h-72 justify-center"}
            text={"Hello world"}
            get={handleGetBlogs}
          />
        ) : (
          blogs.map((blog, i) => (
            <div
              key={i}
              className="group rounded-3xl overflow-hidden flex flex-col border border-TB/15
                dark:border-box-border-D bg-gray-200/85 dark:bg-box-D"
            >
              <div className="overflow-hidden">
                <img
                  className="w-full group-hover:scale-110"
                  src={blog.image}
                  alt={`blog-image-${i + 1}`}
                />
              </div>

              <div className="p-6 flex flex-col gap-y-4">
                <h3 className="text-lg text-TB dark:text-white font-bold line-clamp-1">
                  {i18n.language === "de" ? blog.title_de : blog.title_en}
                </h3>

                <p className="text-secondary dark:text-secondary-D line-clamp-3">
                  {i18n.language === "de"
                    ? blog.description_de
                    : blog.description_en}
                </p>

                <SecondaryButton className={"w-28 h-10"}>
                  <Link
                    to={`/blog/${blog.title_en}`}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {i18n.language === "de" ? "Mehr lesen" : "Read More"}
                  </Link>
                </SecondaryButton>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-secondary dark:text-secondary-D font-normal">
          Showing {startIndex + 1}-{blogs.length} of {blogs.length} items
        </span>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded-lg border transition ${
                  currentPage === page
                    ? "border-primary bg-primary text-white"
                    : `border-TB/15 dark:border-box-border-D text-secondary
                    dark:text-secondary-D hover:border-primary hover:text-primary
                    dark:hover:border-primary dark:hover:text-primary`
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
