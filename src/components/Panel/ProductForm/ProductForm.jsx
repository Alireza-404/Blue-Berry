import { useFormik } from "formik";
import { BiChevronDown } from "react-icons/bi";
import PanelButton from "../PanelButton/PanelButton";
import useProducts from "../../../hooks/useProducts";
import * as Yup from "yup";

export default function ProductForm({ mode = "create", product = null }) {
  const {
    handleAddProduct,
    handleUpdateProduct,
    addProductLoading,
    updateLoading,
  } = useProducts();

  const validationSchema = Yup.object({
    title_en: Yup.string().trim().required("English title is required."),
    title_de: Yup.string().trim().required("German title is required."),
    description: Yup.string()
      .trim()
      .required("Product description is required."),
    category_en: Yup.string().trim().required("English category is required."),
    category_de: Yup.string().trim().required("German category is required."),
    image: Yup.string().trim().required("Main product image is required."),
    second_image: Yup.string().trim(),
    stars: Yup.number()
      .typeError("Stars must be a number.")
      .min(0, "Stars cannot be less than 0.")
      .max(5, "Stars cannot be greater than 5.")
      .required("Stars are required."),
    label: Yup.string().trim(),
    price: Yup.number()
      .typeError("Price must be a number.")
      .moreThan(0, "Price must be greater than 0.")
      .required("Price is required."),
    discount: Yup.number()
      .typeError("Discount must be a number.")
      .min(0, "Discount cannot be less than 0.")
      .max(100, "Discount cannot be greater than 100%."),
    stock: Yup.number()
      .typeError("Stock must be a number.")
      .integer("Stock must be a whole number.")
      .min(0, "Stock cannot be negative.")
      .required("Stock is required."),
    unit: Yup.string().trim().required("Product unit is required."),
    sku: Yup.string().trim().required("SKU is required."),
    country: Yup.string().trim().required("Country is required."),
    brand: Yup.string().trim().required("Brand is required."),
    shelf_life: Yup.string().trim().required("Shelf life is required."),
    color_en: Yup.string().trim().required("English color is required."),
    color_de: Yup.string().trim().required("German color is required."),
    rating: Yup.number()
      .required("Rating is required.")
      .required("Rating is required."),
    is_deal: Yup.boolean(),
    is_organic: Yup.boolean(),
  });

  const initialValues = product
    ? {
        title_en: product.title_en ?? "",
        title_de: product.title_de ?? "",
        description: product.description ?? "",
        category_en: product.category_en ?? "Vegetables",
        category_de: product.category_de ?? "Gemüse",
        image: product.image ?? "",
        second_image: product.second_image ?? "",
        stars: product.stars ?? 1,
        label: product.label ?? "",
        price: product.price ?? "",
        discount: product.discount ?? "",
        stock: product.stock ?? "",
        unit: product.unit ?? "",
        sku: product.sku ?? "",
        country: product.country ?? "Germany",
        brand: product.brand ?? "Freshora",
        shelf_life: product.shelf_life ?? "",
        color_en: product.color_en ?? "",
        color_de: product.color_de ?? "",
        rating: product.rating ?? "",
        is_deal: product.is_deal ?? false,
        is_organic: product.is_organic ?? false,
      }
    : {
        title_en: "",
        title_de: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        category_en: "Vegetables",
        category_de: "Gemüse",
        image: "",
        second_image: "",
        stars: 1,
        label: "",
        price: "",
        discount: "",
        stock: "",
        unit: "",
        sku: "",
        country: "Germany",
        brand: "Freshora",
        shelf_life: "",
        color_en: "",
        color_de: "",
        rating: "",
        is_deal: false,
        is_organic: false,
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      if (mode === "create") {
        handleAddProduct(values, formik.resetForm);
      } else {
        handleUpdateProduct(product.id, values);
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
            placeholder="Apple Juice"
            value={formik.values.title_en}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
            p-3 rounded-lg placeholder:select-none outline-none text-white
            focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
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
            placeholder="Apfelsaft"
            value={formik.values.title_de}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
            p-3 rounded-lg placeholder:select-none outline-none text-white
            focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="category_en" className="text-white">
            Category (EN)
          </label>

          <div className="relative">
            <select
              name="category_en"
              id="category_en"
              value={formik.values.category_en}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 appearance-none"
            >
              <option
                value={"Vegetables"}
                className="bg-neutral-950 text-white font-bold"
              >
                Vegetables
              </option>

              <option
                value={"Cold Drink"}
                className="bg-neutral-950 text-white font-bold"
              >
                Cold Drink
              </option>

              <option
                value={"Snack"}
                className="bg-neutral-950 text-white font-bold"
              >
                Snack
              </option>

              <option
                value={"Juice"}
                className="bg-neutral-950 text-white font-bold"
              >
                Juice
              </option>

              <option
                value={"Chips"}
                className="bg-neutral-950 text-white font-bold"
              >
                Chips
              </option>

              <option
                value={"Sauces"}
                className="bg-neutral-950 text-white font-bold"
              >
                Sauces
              </option>

              <option
                value={"Spices"}
                className="bg-neutral-950 text-white font-bold"
              >
                Spices
              </option>

              <option
                value={"Leaves"}
                className="bg-neutral-950 text-white font-bold"
              >
                Leaves
              </option>

              <option
                value={"Fruits"}
                className="bg-neutral-950 text-white font-bold"
              >
                Fruits
              </option>
            </select>

            <span className="text-white absolute top-1/2 -translate-y-1/2 right-4 text-xl">
              <BiChevronDown />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="category_de" className="text-white">
            Category (DE)
          </label>

          <div className="relative">
            <select
              name="category_de"
              id="category_de"
              value={formik.values.category_de}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 appearance-none"
            >
              <option
                value="Gemüse"
                className="bg-neutral-950 text-white font-bold"
              >
                Gemüse
              </option>

              <option
                value="Kaltgetränke"
                className="bg-neutral-950 text-white font-bold"
              >
                Kaltgetränke
              </option>

              <option
                value="Snacks"
                className="bg-neutral-950 text-white font-bold"
              >
                Snacks
              </option>

              <option
                value="Säfte"
                className="bg-neutral-950 text-white font-bold"
              >
                Säfte
              </option>

              <option
                value="Chips"
                className="bg-neutral-950 text-white font-bold"
              >
                Chips
              </option>

              <option
                value="Soßen"
                className="bg-neutral-950 text-white font-bold"
              >
                Soßen
              </option>

              <option
                value="Gewürze"
                className="bg-neutral-950 text-white font-bold"
              >
                Gewürze
              </option>

              <option
                value="Blattgemüse"
                className="bg-neutral-950 text-white font-bold"
              >
                Blattgemüse
              </option>

              <option
                value="Obst"
                className="bg-neutral-950 text-white font-bold"
              >
                Obst
              </option>
            </select>

            <span className="text-white absolute top-1/2 -translate-y-1/2 right-4 text-xl">
              <BiChevronDown />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="image" className="text-white">
            Image Link
          </label>

          <input
            type="url"
            name="image"
            id="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
            p-3 rounded-lg placeholder:select-none outline-none text-white
            focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="second_image" className="text-white">
            Second Image Link
          </label>

          <input
            type="url"
            name="second_image"
            id="second_image"
            placeholder="https://example.com/image-2.jpg"
            value={formik.values.second_image}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
            p-3 rounded-lg placeholder:select-none outline-none text-white
            focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="stars" className="text-white">
            Stars
          </label>

          <div className="relative">
            <select
              name="stars"
              id="stars"
              value={formik.values.stars}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 appearance-none"
            >
              <option
                value={"1"}
                className="bg-neutral-950 text-white font-bold"
              >
                1
              </option>

              <option
                value={"2"}
                className="bg-neutral-950 text-white font-bold"
              >
                2
              </option>

              <option
                value={"3"}
                className="bg-neutral-950 text-white font-bold"
              >
                3
              </option>

              <option
                value={"4"}
                className="bg-neutral-950 text-white font-bold"
              >
                4
              </option>

              <option
                value={"5"}
                className="bg-neutral-950 text-white font-bold"
              >
                5
              </option>
            </select>

            <span className="text-white absolute top-1/2 -translate-y-1/2 right-4 text-xl">
              <BiChevronDown />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="label" className="text-white">
            Label
          </label>

          <input
            type="text"
            name="label"
            id="label"
            placeholder="COOL"
            value={formik.values.label}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
            p-3 rounded-lg placeholder:select-none outline-none text-white
            focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="price" className="text-white">
            Price
          </label>

          <input
            type="number"
            name="price"
            id="price"
            placeholder="12"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
            p-3 rounded-lg placeholder:select-none outline-none text-white
            focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="discount" className="text-white">
            Discount
          </label>

          <input
            type="number"
            name="discount"
            id="discount"
            placeholder="25"
            value={formik.values.discount}
            onChange={formik.handleChange}
            className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
          />

          <p className="text-red-600 text-xs">
            The Discount Is Percentage Based
          </p>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="stock" className="text-white">
            Stock
          </label>

          <div className="relative">
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="2"
              value={formik.values.stock}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="unit" className="text-white">
            Unit
          </label>

          <div className="relative">
            <input
              type="text"
              name="unit"
              id="unit"
              placeholder="500g"
              value={formik.values.unit}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="sku" className="text-white">
            SKU
          </label>

          <div className="relative">
            <input
              type="text"
              name="sku"
              id="sku"
              placeholder="AZ10"
              value={formik.values.sku}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="country" className="text-white">
            Country
          </label>

          <div className="relative">
            <select
              name="country"
              id="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 appearance-none"
            >
              <option
                value={"Germany"}
                className="bg-neutral-950 text-white font-bold"
              >
                Germany
              </option>

              <option
                value={"England"}
                className="bg-neutral-950 text-white font-bold"
              >
                England
              </option>

              <option
                value={"Japan"}
                className="bg-neutral-950 text-white font-bold"
              >
                Japan
              </option>

              <option
                value={"India"}
                className="bg-neutral-950 text-white font-bold"
              >
                India
              </option>

              <option
                value={"China"}
                className="bg-neutral-950 text-white font-bold"
              >
                China
              </option>
            </select>

            <span className="text-white absolute top-1/2 -translate-y-1/2 right-4 text-xl">
              <BiChevronDown />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="brand" className="text-white">
            Brand
          </label>

          <div className="relative">
            <select
              name="brand"
              id="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 appearance-none"
            >
              <option
                value="Freshora"
                className="bg-neutral-950 text-white font-bold"
              >
                Freshora
              </option>

              <option
                value="GreenBite"
                className="bg-neutral-950 text-white font-bold"
              >
                GreenBite
              </option>

              <option
                value="DailyHarvest"
                className="bg-neutral-950 text-white font-bold"
              >
                DailyHarvest
              </option>

              <option
                value="PureNest"
                className="bg-neutral-950 text-white font-bold"
              >
                PureNest
              </option>
            </select>

            <span className="text-white absolute top-1/2 -translate-y-1/2 right-4 text-xl">
              <BiChevronDown />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="shelf_life" className="text-white">
            Shelf Life
          </label>

          <div className="relative">
            <input
              type="text"
              name="shelf_life"
              id="shelf_life"
              placeholder="12 Months"
              value={formik.values.shelf_life}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="color_en" className="text-white">
            Color (EN)
          </label>

          <div className="relative">
            <input
              type="text"
              name="color_en"
              id="color_en"
              placeholder="black, red, blue"
              value={formik.values.color_en}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="color_de" className="text-white">
            Color (DE)
          </label>

          <div className="relative">
            <input
              type="text"
              name="color_de"
              id="color_de"
              placeholder="Schwarz, Red, Blue"
              value={formik.values.color_de}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5 h-44 sm:h-52 xl:h-auto">
          <label htmlFor="description" className="text-white">
            Description
          </label>

          <textarea
            name="description"
            id="description"
            placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full h-full bg-transparent border border-white/10 focus:border-blue-600/45
            p-3 rounded-lg placeholder:select-none outline-none text-white
            focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600 resize-none"
          />
        </div>

        <div className="flex flex-col gap-y-5 sm:col-span-2 xl:col-span-1">
          <div className="flex flex-col gap-y-2.5">
            <label
              htmlFor="is_deal"
              className="block cursor-pointer font-medium text-white"
            >
              Deal Product
            </label>

            <div
              className="flex items-center justify-between gap-x-1.5 border border-white/10 rounded-lg
            bg-neutral-900/20 p-4"
            >
              <p className="mt-1 text-sm text-zinc-500">
                Mark this product as a special deal.
              </p>

              <label
                htmlFor="is_deal"
                className="relative flex cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  id="is_deal"
                  name="is_deal"
                  checked={formik.values.is_deal}
                  onChange={formik.handleChange}
                  className="peer sr-only"
                />

                <div
                  className="w-12 h-6 bg-neutral-900/60 rounded-full border
                border-blue-600/30 peer-checked:border-blue-600/45 peer-checked:bg-blue-600
                  peer-checked:ring-4 peer-checked:ring-blue-600/15"
                ></div>

                <div
                  className="w-4 h-4 rounded-full bg-white absolute left-1 top-1/2
                  -translate-y-1/2 peer-checked:translate-x-6 transition-transform"
                ></div>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-y-2.5">
            <label
              htmlFor="is_organic"
              className="block cursor-pointer font-medium text-white"
            >
              Organic Product
            </label>

            <div
              className="flex items-center justify-between gap-x-1.5 border border-white/10 rounded-lg
            bg-neutral-900/20 p-4"
            >
              <p className="mt-1 text-sm text-zinc-500">
                Mark this product as organically produced.
              </p>

              <label
                htmlFor="is_organic"
                className="relative flex cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  id="is_organic"
                  name="is_organic"
                  checked={formik.values.is_organic}
                  onChange={formik.handleChange}
                  className="peer sr-only"
                />

                <div
                  className="w-12 h-6 bg-neutral-900/60 rounded-full border
                border-blue-600/30 peer-checked:border-blue-600/45 peer-checked:bg-blue-600
                  peer-checked:ring-4 peer-checked:ring-blue-600/15"
                ></div>

                <div
                  className="w-4 h-4 rounded-full bg-white absolute left-1 top-1/2
                  -translate-y-1/2 peer-checked:translate-x-6 transition-transform"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="rating" className="text-white">
            Rating
          </label>

          <div className="relative">
            <input
              type="number"
              name="rating"
              id="rating"
              placeholder="404"
              value={formik.values.rating}
              onChange={formik.handleChange}
              className="w-full bg-transparent border border-white/10 focus:border-blue-600/45
              p-3 rounded-lg placeholder:select-none outline-none text-white
              focus:ring-4 focus:ring-blue-600/15 placeholder:text-zinc-600"
            />
          </div>
        </div>
      </div>

      <PanelButton
        type={"submit"}
        className={`text-blue-600 bg-blue-500/10 px-6 py-3 text-lg rounded-xl border 
              border-blue-600/30 hover:border-blue-600/45 hover:bg-blue-500/15
              flex items-center justify-center gap-x-2.5 mt-8`}
        disabled={mode === "create" ? addProductLoading : updateLoading}
      >
        {addProductLoading || updateLoading ? (
          <>
            {mode === "create" ? "Adding Product..." : "Updating..."}
            <span
              className="animate-spin border-x border-t border-white/20
                      rounded-full w-5 h-5 ml-2"
            ></span>
          </>
        ) : (
          <span>{mode === "create" ? "Add Product" : "Update"}</span>
        )}
      </PanelButton>

      {errorMessage && (
        <p className="text-red-500 font-bold text-lg mt-4">{errorMessage}</p>
      )}
    </form>
  );
}
