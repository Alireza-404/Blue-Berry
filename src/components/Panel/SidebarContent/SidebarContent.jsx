import { Link, NavLink } from "react-router-dom";
import { AiFillBook, AiFillHome, AiFillProduct } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import PanelButton from "../PanelButton/PanelButton";

export default function SidebarContent() {
  const user = useSelector((state) => state.auth.user);

  const username = user.user_metadata.email.split("@")[0];

  return (
    <nav className="h-full flex flex-col justify-between px-4 py-6 xl:px-8 xl:py-12 overflow-y-auto">
      <div className="flex flex-col gap-y-12">
        <div className="flex items-center gap-x-2.5">
          <div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700/75
            text-white font-bold flex items-center justify-center text-2xl"
            style={{ boxShadow: "0 8px 25px rgb(37 99 235 / 0.5)" }}
          >
            BB
          </div>

          <span className="text-white font-bold text-2xl">
            <span className="text-blue-600">BLUE</span> BERRY
          </span>
        </div>

        <div className="flex flex-col gap-y-8">
          <span className="text-zinc-500">MAIN MENU</span>

          <ul className="flex flex-col gap-y-4">
            <li>
              <NavLink to={"/panel"} end>
                {({ isActive }) => (
                  <div
                    className={`group relative flex items-center gap-x-4 py-4 px-6 rounded-xl 
                        hover:translate-x-1.5 overflow-hidden
                        ${
                          isActive
                            ? `bg-gradient-to-r from-blue-600/30 to-blue-600/5 after:w-3
                            after:h-10 after:absolute after:left-0 after:top-1/2 after:-translate-x-1/2
                            after:-translate-y-1/2 after:bg-blue-500 after:rounded-lg
                            after:shadow-[0_0_20px_6px_rgba(59,130,246,0.3)]`
                            : "bg-transparent hover:bg-white/5"
                        }`}
                  >
                    <span
                      className={`text-xl ${
                        isActive ? "text-blue-600" : "text-zinc-500"
                      }`}
                    >
                      <AiFillHome />
                    </span>

                    <span
                      className={`text-lg ${
                        isActive
                          ? "text-white"
                          : "text-zinc-500 group-hover:text-white"
                      }`}
                    >
                      Dashboard
                    </span>
                  </div>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to={"/panel/products"} end>
                {({ isActive }) => (
                  <div
                    className={`group relative flex items-center gap-x-4 py-4 px-6 rounded-xl 
                        hover:translate-x-1.5 overflow-hidden
                        ${
                          isActive
                            ? `bg-gradient-to-r from-blue-600/30 to-blue-600/5 after:w-3
                            after:h-10 after:absolute after:left-0 after:top-1/2 after:-translate-x-1/2
                            after:-translate-y-1/2 after:bg-blue-500 after:rounded-lg
                            after:shadow-[0_0_20px_6px_rgba(59,130,246,0.3)]`
                            : "bg-transparent hover:bg-white/5"
                        }`}
                  >
                    <span
                      className={`text-xl ${
                        isActive ? "text-blue-600" : "text-zinc-500"
                      }`}
                    >
                      <AiFillProduct />
                    </span>

                    <span
                      className={`text-lg ${
                        isActive
                          ? "text-white"
                          : "text-zinc-500 group-hover:text-white"
                      }`}
                    >
                      Products
                    </span>
                  </div>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to={"/panel/blogs"} end>
                {({ isActive }) => (
                  <div
                    className={`group relative flex items-center gap-x-4 py-4 px-6 rounded-xl 
                        hover:translate-x-1.5 overflow-hidden
                        ${
                          isActive
                            ? `bg-gradient-to-r from-blue-600/30 to-blue-600/5 after:w-3
                            after:h-10 after:absolute after:left-0 after:top-1/2 after:-translate-x-1/2
                            after:-translate-y-1/2 after:bg-blue-500 after:rounded-lg
                            after:shadow-[0_0_20px_6px_rgba(59,130,246,0.3)]`
                            : "bg-transparent hover:bg-white/5"
                        }`}
                  >
                    <span
                      className={`text-xl ${
                        isActive ? "text-blue-600" : "text-zinc-500"
                      }`}
                    >
                      <AiFillBook />
                    </span>

                    <span
                      className={`text-lg ${
                        isActive
                          ? "text-white"
                          : "text-zinc-500 group-hover:text-white"
                      }`}
                    >
                      Blogs
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="p-4 rounded-2xl border border-white/10 flex items-center gap-x-4">
          <div
            className="w-[50px] h-[50px] rounded-xl bg-gradient-to-br from-blue-500 to-blue-700/75
            text-white font-bold flex items-center justify-center text-lg"
            style={{ boxShadow: "0 8px 25px rgb(37 99 235 / 0.5)" }}
          >
            AD
          </div>

          <div className="flex flex-col">
            <strong className="text-white">Admin</strong>
            <span className="text-zinc-500 text-[15px]">{username}</span>
          </div>
        </div>

        <PanelButton type={"button"}>
          <Link
            to={"/"}
            className="text-blue-600 bg-blue-500/10 px-4 py-3 text-lg rounded-xl border 
              border-blue-600/30 hover:border-blue-600/45 hover:bg-blue-500/15
              flex items-center justify-center gap-x-2.5"
            replace
          >
            <span className="text-xl">
              <FiLogOut />
            </span>
            Exit Panel
          </Link>
        </PanelButton>
      </div>
    </nav>
  );
}
