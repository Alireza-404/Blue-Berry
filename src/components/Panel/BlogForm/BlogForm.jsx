import { useFormik } from "formik";
import PanelButton from "../PanelButton/PanelButton";
import * as Yup from "yup";
import useBlog from "../../../hooks/useBlog";

export default function BlogForm({ mode = "create", blog = null }) {
  const { handleAddBlog, handleUpdateBlog, addBlogLoading, updateBlogLoading } =
    useBlog();

  const validationSchema = Yup.object({
    title_en: Yup.string().required("English title is required"),
    title_de: Yup.string().required("German title is required"),
    description_en: Yup.string().required("English description is required"),
    description_de: Yup.string().required("German description is required"),
    author: Yup.string().required("Author is required"),
    image: Yup.string()
      .url("Enter a valid image URL")
      .required("Image is required"),
    content_en: Yup.string().required("English content is required"),
    content_de: Yup.string().required("German content is required"),
  });

  const initialValues = blog
    ? {
        title_en: blog.title_en ?? "",
        title_de: blog.title_de ?? "",
        description_en: blog.description_en ?? "",
        description_de: blog.description_de ?? "",
        content_en: blog.content_en ?? "",
        content_de: blog.content_de ?? "",
        image: blog.image ?? "",
        author: blog.author ?? "Alireza Shabani",
      }
    : {
        title_en: "",
        title_de: "",
        description_en: "",
        description_de: "",
        content_en: "",
        content_de: "",
        image: "",
        author: "Alireza Shabani",
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      if (mode === "create") {
        handleAddBlog(values, formik.resetForm);
      } else {
        handleUpdateBlog(blog.id, values);
      }
    },
  });

  const errorMessage = Object.values(formik.errors)[0];

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="title_en" className="text-white">
            Title (EN)
          </label>

          <input
            type="text"
            name="title_en"
            id="title_en"
            placeholder="Healthy Breakfast Ideas"
            value={formik.values.title_en}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg placeholder:select-none outline-none text-white focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="title_de" className="text-white">
            Title (DE)
          </label>

          <input
            type="text"
            name="title_de"
            id="title_de"
            placeholder="Gesunde Frühstücksideen"
            value={formik.values.title_de}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg
            placeholder:select-none outline-none text-white focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="author" className="text-white">
            Author
          </label>

          <input
            type="text"
            name="author"
            id="author"
            placeholder="Alireza Shabani"
            value={formik.values.author}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg
            placeholder:select-none outline-none text-white focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5 sm:col-span-2 lg:col-span-3">
          <label htmlFor="image" className="text-white">
            Cover Image URL
          </label>

          <input
            type="url"
            name="image"
            id="image"
            placeholder="https://example.com/blog-cover.jpg"
            value={formik.values.image}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg
            placeholder:select-none outline-none text-white focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5 sm:col-span-2 lg:col-span-3">
          <label htmlFor="description_en" className="text-white">
            Description (EN)
          </label>

          <textarea
            name="description_en"
            id="description_en"
            rows={3}
            placeholder="Write a short summary of the blog post..."
            value={formik.values.description_en}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg
            placeholder:select-none outline-none text-white focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 resize-none"
          />
        </div>

        <div className="flex flex-col gap-y-2.5 sm:col-span-2 lg:col-span-3">
          <label htmlFor="description_de" className="text-white">
            Description (DE)
          </label>

          <textarea
            name="description_de"
            id="description_de"
            rows={3}
            placeholder="Schreiben Sie eine kurze Zusammenfassung des Blogbeitrags..."
            value={formik.values.description_de}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg
            placeholder:select-none outline-none text-white focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 resize-none"
          />
        </div>

        <div className="flex flex-col gap-y-2.5 sm:col-span-2 lg:col-span-3">
          <label htmlFor="content_en" className="text-white">
            Content (EN)
          </label>

          <textarea
            name="content_en"
            id="content_en"
            rows={10}
            placeholder="Write the full blog content..."
            value={formik.values.content_en}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg
            placeholder:select-none outline-none text-white focus:ring-4 resize-none focus:ring-blue-600/15
            my-scroll placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5 sm:col-span-2 lg:col-span-3">
          <label htmlFor="content_de" className="text-white">
            Content (DE)
          </label>

          <textarea
            name="content_de"
            id="content_de"
            rows={10}
            placeholder="Schreiben Sie den vollständigen Bloginhalt..."
            value={formik.values.content_de}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45 p-3 rounded-lg
            placeholder:select-none outline-none text-white focus:ring-4 resize-none focus:ring-blue-600/15
            my-scroll placeholder:text-zinc-600"
          />
        </div>
      </div>

      <PanelButton
        type={"submit"}
        className={`text-blue-600 bg-blue-500/10 px-6 py-3 text-lg rounded-xl border 
                  border-blue-600/30 hover:border-blue-600/45 hover:bg-blue-500/15
                  flex items-center justify-center gap-x-2.5 mt-8`}
        disabled={mode === "create" ? addBlogLoading : updateBlogLoading}
      >
        {addBlogLoading || updateBlogLoading ? (
          <>
            {mode === "create" ? "Adding Blog..." : "Updating..."}
            <span
              className="animate-spin border-x border-t border-white/20
                          rounded-full w-5 h-5 ml-2"
            ></span>
          </>
        ) : (
          <span>{mode === "create" ? "Add Blog" : "Update"}</span>
        )}
      </PanelButton>

      {errorMessage && (
        <p className="text-red-500 font-bold text-lg mt-4">{errorMessage}</p>
      )}
    </form>
  );
}
