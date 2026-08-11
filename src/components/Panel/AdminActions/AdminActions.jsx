import { LuPackagePlus } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function AdminActions() {
  const AdminActionsArray = [
    {
      id: 1,
      title: "Add Product",
      description: "Add a new product to your store",
      link: "/panel/products/new",
    },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {AdminActionsArray.map((item) => (
        <Link
          key={item.id}
          to={item.link}
          className="md:h-52 lg:h-44 rounded-2xl border border-white/10 bg-neutral-900/20
            hover:border-blue-600/30 hover:bg-neutral-900/35 flex flex-col justify-center
            gap-y-1.5 px-10 py-5"
        >
          <span
            className="rounded-lg bg-blue-500/10 w-12 h-12 mb-3 flex items-center 
            justify-center"
          >
            <LuPackagePlus className="text-blue-600 text-2xl" />
          </span>

          <strong className="text-white">Add Product</strong>

          <span className="text-zinc-500 text-sm">
            Add a new product to your store
          </span>
        </Link>
      ))}
    </div>
  );
}
