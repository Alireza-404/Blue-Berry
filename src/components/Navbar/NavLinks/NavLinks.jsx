import { Link, useLocation } from "react-router-dom";
import { MdOutlinePages } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function NavLinks() {
  const { t } = useTranslation();
  const location = useLocation();

  const linksArray = [
    { id: 1, text: "home", path: "/" },
    { id: 2, text: "blog", path: "/blog" },
    { id: 3, text: "shop", path: "/shop" },
    { id: 4, text: "faq", path: "/faq" },
    { id: 5, text: "about", path: "/about" },
    { id: 6, text: "contact", path: "/contact" },
  ];

  return (
    <ul className="flex flex-col gap-y-6 lg:flex-row lg:items-center lg:gap-x-8">
      <MdOutlinePages className="text-primary text-3xl hidden lg:block" />

      {linksArray.map((link) => {
        return (
          <li key={link.id} className="select-none">
            <Link
              to={link.path}
              className={`px-1 transition-colors duration-200 ${
                link.path === location.pathname
                  ? "text-primary"
                  : "text-TB dark:text-white hover:text-primary dark:hover:text-primary"
              }`}
            >
              {t(`links.${link.text}`)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
