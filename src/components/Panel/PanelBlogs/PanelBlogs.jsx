import { useEffect } from "react";
import useBlog from "../../../hooks/useBlog";
import ErrorSkeleton from "../../Ui/ErrorSkeleton/ErrorSkeleton";
import { Link } from "react-router-dom";
import PanelButton from "../PanelButton/PanelButton";

export default function PanelBlogs() {
  const {
    handleGetBlogs,
    handleDeleteBlog,
    blogs,
    loading,
    deleteBlogLoading,
    error,
  } = useBlog();

  useEffect(() => {
    handleGetBlogs();
  }, []);

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
        <ErrorSkeleton
          className={"h-72 justify-center"}
          text={
            "couldn’t load the products. Please try again later or refresh the page."
          }
          get={handleGetBlogs}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group overflow-hidden rounded-2xl border border-white/10
                bg-neutral-900/30 hover:border-blue-600/30 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                <img
                  src={blog.image}
                  alt={blog.title_en}
                  className="w-full h-full object-cover transition-transform duration-300
                    group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black
                    via-transparent to-black/20"
                />

                <span
                  className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg
                    bg-black/50 backdrop-blur-md text-white text-xs"
                >
                  {blog.author}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-y-3">
                <h2
                  className="text-white text-lg font-semibold line-clamp-1
                    group-hover:text-blue-500 transition-colors"
                >
                  {blog.title_en}
                </h2>

                <p className="text-zinc-500 text-sm leading-6 line-clamp-2">
                  {blog.description_en}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <PanelButton type={"button"}>
                    <Link
                      to={`/panel/blogs/${blog.title_en}/edit`}
                      className={`text-blue-600 bg-blue-500/10 px-6 py-2 rounded-lg border 
                      border-blue-600/30 hover:border-blue-600/45 hover:bg-blue-500/15
                      flex items-center justify-center gap-x-2.5`}
                    >
                      Edit
                    </Link>
                  </PanelButton>

                  <PanelButton
                    type={"button"}
                    disabled={deleteBlogLoading}
                    className={`text-red-600 bg-red-500/10 px-6 py-2 rounded-lg border 
                    border-red-600/30 hover:border-red-600/45 hover:bg-red-500/15
                    flex items-center justify-center gap-x-2.5
                    ${deleteBlogLoading ? "opacity-50" : "opacity-100"}`}
                    click={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </PanelButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
