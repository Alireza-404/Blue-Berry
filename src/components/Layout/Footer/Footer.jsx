import Logo from "../../../assets/images/logo.png";
import DarkLogo from "../../../assets/images/logo-dark.png";
import AndroidImg from "../../../assets/images/Footer/android.png";
import AppleImg from "../../../assets/images/Footer/apple.png";

import { Trans, useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoChevronDown, IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";

export default function Footer() {
  const { t } = useTranslation();
  const [category, setCategory] = useState(false);
  const [company, setCompany] = useState(false);
  const [account, setAccount] = useState(false);
  const [contact, setContact] = useState(false);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8 lg:grid lg:grid-cols-5 lg:gap-5">
        <div className="flex flex-col gap-y-8 lg:gap-y-4 lg:pt-4">
          <img
            src={DarkLogo}
            alt="main-logo"
            className="w-fit select-none dark:block hidden"
          />

          <img
            src={Logo}
            alt="main-logo"
            className="w-fit select-none block dark:hidden"
          />

          <p className="text-secondary dark:text-secondary-D md:w-[450px] lg:w-auto">
            {t("footer.headerText")}
          </p>

          <div
            className="flex items-center gap-x-2.5 lg:flex-col lg:items-start
            lg:gap-y-2.5 xl:gap-y-3"
          >
            <img
              src={AndroidImg}
              alt="android-image"
              className="w-32 rounded-md select-none xl:w-36"
            />

            <img
              src={AppleImg}
              alt="apple-image"
              className="w-32 rounded-md select-none xl:w-36"
            />
          </div>
        </div>

        <ul className="hidden lg:flex flex-col">
          <li
            className="p-4 text-TB dark:text-white border-b border-b-TB/15
          dark:border-b-box-border-D lg:font-bold"
          >
            {t("footer.category")}
          </li>

          <ul className="overflow-hidden px-4 py-2 flex flex-col gap-y-3.5">
            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("productsCategory.snacks")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("productsCategory.juice")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("productsCategory.chips")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("productsCategory.spices")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("productsCategory.sauces")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("productsCategory.fruits")}
              </Link>
            </li>
          </ul>
        </ul>

        <ul className="hidden lg:flex flex-col">
          <li
            className="p-4 text-TB dark:text-white border-b border-b-TB/15
          dark:border-b-box-border-D lg:font-bold"
          >
            {t("footer.category")}
          </li>

          <ul className="overflow-hidden px-4 py-2 flex flex-col gap-y-3.5">
            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.company.aboutUs")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.company.contactUs")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.company.delivery")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.company.terms&Conditions")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.company.legelNotice")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.company.securePayment")}
              </Link>
            </li>
          </ul>
        </ul>

        <ul className="hidden lg:flex flex-col">
          <li
            className="p-4 text-TB dark:text-white border-b border-b-TB/15
          dark:border-b-box-border-D lg:font-bold"
          >
            {t("footer.category")}
          </li>

          <ul className="overflow-hidden px-4 py-2 flex flex-col gap-y-3.5">
            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.account.signIn")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.account.viewCart")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.account.returnPolicy")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.account.becomeAVendor")}
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
              >
                {t("footer.links.account.payments")}
              </Link>
            </li>
          </ul>
        </ul>

        <ul className="hidden lg:flex flex-col">
          <li
            className="p-4 text-TB dark:text-white border-b border-b-TB/15
          dark:border-b-box-border-D lg:font-bold"
          >
            {t("footer.category")}
          </li>

          <ul className="overflow-hidden px-4 py-2 flex flex-col gap-y-3.5">
            <li
              className="text-secondary dark:text-secondary-D flex items-start gap-x-2.5
                    text-sm"
            >
              <span className="text-primary text-2xl">
                <IoLocationOutline />
              </span>
              {t("footer.links.contact.contactText")}
            </li>

            <li
              className="text-secondary dark:text-secondary-D flex items-start gap-x-2.5
                    text-sm"
            >
              <span className="text-primary text-2xl">
                <AiOutlinePhone />
              </span>
              +98 0904 477 0260
            </li>

            <li
              className="text-secondary dark:text-secondary-D flex items-start gap-x-2.5
                    text-sm"
            >
              <span className="text-primary text-2xl">
                <AiOutlineMail />
              </span>
              example@email.com
            </li>

            <li className="flex items-center gap-x-2.5">
              <Link
                to={"#"}
                className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-TB dark:bg-white
                flex items-center justify-center text-white dark:text-TB text-lg xl:text-2xl
                cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
              >
                <AiFillFacebook />
              </Link>

              <Link
                to={"#"}
                className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-TB dark:bg-white
                flex items-center justify-center text-white dark:text-TB text-lg xl:text-2xl
                cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
              >
                <AiFillTwitterCircle />
              </Link>

              <Link
                to={"https://github.com/Alireza-404"}
                className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-TB dark:bg-white
                flex items-center justify-center text-white dark:text-TB text-lg xl:text-2xl
                cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
              >
                <AiFillGithub />
              </Link>

              <Link
                to={"#"}
                className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-TB dark:bg-white
                flex items-center justify-center text-white dark:text-TB text-lg xl:text-2xl
                cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
              >
                <AiOutlineInstagram />
              </Link>
            </li>
          </ul>
        </ul>

        <div className="lg:hidden block">
          <ul className="flex flex-col">
            <li
              className="p-4 text-TB dark:text-white flex items-center justify-between
              border-b border-TB/15 dark:border-box-border-D cursor-pointer"
              onClick={() => {
                setCategory((prev) => !prev);
              }}
            >
              {t("footer.category")}
              <span className={`${category ? "rotate-180" : "rotate-0"}`}>
                <IoChevronDown />
              </span>
            </li>
            <AnimatePresence mode="wait" initial={false}>
              {category && (
                <motion.ul
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="duration-0 origin-top overflow-hidden px-8 py-2 flex flex-col
                  gap-y-3.5"
                >
                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("productsCategory.snacks")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("productsCategory.juice")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("productsCategory.chips")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("productsCategory.spices")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("productsCategory.sauces")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("productsCategory.fruits")}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </ul>

          <ul className="flex flex-col">
            <li
              className="p-4 text-TB dark:text-white flex items-center justify-between
              border-b border-TB/15 dark:border-box-border-D cursor-pointer"
              onClick={() => {
                setCompany((prev) => !prev);
              }}
            >
              {t("footer.company")}
              <span className={`${company ? "rotate-180" : "rotate-0"}`}>
                <IoChevronDown />
              </span>
            </li>
            <AnimatePresence mode="wait" initial={false}>
              {company && (
                <motion.ul
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="duration-0 origin-top overflow-hidden px-8 py-2 flex flex-col
                  gap-y-3.5"
                >
                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.company.aboutUs")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.company.contactUs")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.company.delivery")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.company.terms&Conditions")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.company.legelNotice")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.company.securePayment")}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </ul>

          <ul className="flex flex-col">
            <li
              className="p-4 text-TB dark:text-white flex items-center justify-between
              border-b border-TB/15 dark:border-box-border-D cursor-pointer"
              onClick={() => {
                setAccount((prev) => !prev);
              }}
            >
              {t("footer.account")}
              <span className={`${account ? "rotate-180" : "rotate-0"}`}>
                <IoChevronDown />
              </span>
            </li>
            <AnimatePresence mode="wait" initial={false}>
              {account && (
                <motion.ul
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="duration-0 origin-top overflow-hidden px-8 py-2 flex flex-col
                  gap-y-3.5"
                >
                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.account.signIn")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.account.viewCart")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.account.returnPolicy")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.account.becomeAVendor")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="text-sm text-secondary dark:text-secondary-D
                      hover:text-primary dark:hover:text-primary"
                    >
                      {t("footer.links.account.payments")}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </ul>

          <ul className="flex flex-col">
            <li
              className="p-4 text-TB dark:text-white flex items-center justify-between
              border-b border-TB/15 dark:border-box-border-D cursor-pointer"
              onClick={() => {
                setContact((prev) => !prev);
              }}
            >
              {t("footer.contact")}
              <span className={`${contact ? "rotate-180" : "rotate-0"}`}>
                <IoChevronDown />
              </span>
            </li>
            <AnimatePresence mode="wait" initial={false}>
              {contact && (
                <motion.ul
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="duration-0 origin-top overflow-hidden px-8 py-2 flex flex-col
                  gap-y-6"
                >
                  <li
                    className="text-secondary dark:text-secondary-D flex items-start gap-x-2.5
                    text-sm"
                  >
                    <span className="text-primary text-2xl">
                      <IoLocationOutline />
                    </span>
                    {t("footer.links.contact.contactText")}
                  </li>

                  <li
                    className="text-secondary dark:text-secondary-D flex items-start gap-x-2.5
                    text-sm"
                  >
                    <span className="text-primary text-2xl">
                      <AiOutlinePhone />
                    </span>
                    +98 0904 477 0260
                  </li>

                  <li
                    className="text-secondary dark:text-secondary-D flex items-start gap-x-2.5
                    text-sm"
                  >
                    <span className="text-primary text-2xl">
                      <AiOutlineMail />
                    </span>
                    example@email.com
                  </li>

                  <li className="flex items-center gap-x-2.5">
                    <Link
                      to={"#"}
                      className="w-9 h-9 md:w-10 h-10 rounded-lg bg-TB dark:bg-white
                      flex items-center justify-center text-white dark:text-TB text-lg
                      cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
                    >
                      <AiFillFacebook />
                    </Link>

                    <Link
                      to={"#"}
                      className="w-9 h-9 md:w-10 h-10 rounded-lg bg-TB dark:bg-white
                      flex items-center justify-center text-white dark:text-TB text-lg
                      cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
                    >
                      <AiFillTwitterCircle />
                    </Link>

                    <Link
                      to={"https://github.com/Alireza-404"}
                      className="w-9 h-9 md:w-10 h-10 rounded-lg bg-TB dark:bg-white
                      flex items-center justify-center text-white dark:text-TB text-lg
                      cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
                    >
                      <AiFillGithub />
                    </Link>

                    <Link
                      to={"#"}
                      className="w-9 h-9 md:w-10 h-10 rounded-lg bg-TB dark:bg-white
                      flex items-center justify-center text-white dark:text-TB text-lg
                      cursor-pointer hover:bg-TB/80 dark:hover:bg-gray-300"
                    >
                      <AiOutlineInstagram />
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      <div className="px-4 pt-4 border-t border-t-TB/15 dark:border-t-box-border-D">
        <p className="text-secondary dark:text-secondary-D text-center">
          <Trans
            i18nKey={"footer.text"}
            components={{ 1: <span className="text-primary" /> }}
          />
        </p>
      </div>
    </div>
  );
}
