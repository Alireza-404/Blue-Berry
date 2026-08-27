import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function RecentArticles({ blogs }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "de" ? "de-DE" : "en-US";

  return (
    <div
      className="p-5 rounded-2xl border border-TB/15 dark:border-box-border-D flex flex-col
        gap-y-4 lg:w-96 flex-1 lg:flex-auto lg:shrink-0"
    >
      <h3 className="text-[22px] text-TB dark:text-white">
        {t("blogs.singleBlog.recentArticles")}
      </h3>

      <div className="flex flex-col gap-y-6">
        {blogs.slice(0, 4).map((blog, i) => {
          return (
            <div
              key={i}
              className="flex items-center gap-x-2.5 bg-gray-200/85 dark:bg-box-D p-4
                rounded-3xl border border-TB/15 dark:border-box-border-D"
            >
              <div className="aspect-square rounded-xl overflow-hidden shrink-0">
                <img
                  src={blog.image}
                  alt={`blog-image-${i + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </div>

              <div className="flex flex-col gap-y-1.5">
                <h4 className="text-TB dark:text-white line-clamp-2">
                  <Link to={`/blog/${blog.title_en}`}>
                    {i18n.language === "de" ? blog.title_de : blog.title_en}
                  </Link>
                </h4>

                <span className="text-sm text-secondary dark:text-secondary-D">
                  {new Date(blog.created_at).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
