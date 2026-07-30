import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";
import SecondaryButton from "../components/Ui/SecondaryButton/SecondaryButton";

import gsap from "gsap";
import * as Yup from "yup";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { IoChevronDown } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { supabase } from "../lib/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../redux/Slices/ToastSlice";

export default function RegisterPage() {
  const citiesArray = [
    "London",
    "Manchester",
    "Birmingham",
    "Liverpool",
    "Bristol",
    "Tokyo",
    "Kyoto",
    "Osaka",
    "Sapporo",
    "Fukuoka",
    "Berlin",
    "Munich",
    "Hamburg",
    "Frankfurt",
    "Cologne",
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
  ];

  const { t, i18n } = useTranslation();
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const validationSchema = Yup.object({
    firstname: Yup.string().required(t("validation.firstNameRequired")),

    lastname: Yup.string().required(t("validation.lastNameRequired")),

    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),

    phoneNumber: Yup.string().required(t("validation.phoneRequired")),

    password: Yup.string()
      .min(8, t("validation.passwordMin"))
      .required(t("validation.passwordRequired")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.passwordsMustMatch"))
      .required(t("validation.confirmPasswordRequired")),

    address: Yup.string().required(t("validation.addressRequired")),

    city: Yup.string().required(t("validation.cityRequired")),

    postCode: Yup.string().required(t("validation.postCodeRequired")),
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline();

      tl.from(self.selector("#register-title"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.4,
      })
        .from(self.selector("#register-description"), {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        })
        .from(self.selector("#inputs-parent"), {
          y: 120,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: citiesArray[index],
      postCode: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setServerError("");

      try {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          setServerError(t("validation.registerErrorMessage"));
          setLoading(false);
          return;
        }

        const user = data.user;
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            first_name: values.firstname,
            last_name: values.lastname,
            phone_number: values.phoneNumber,
            address: values.address,
            city: values.city,
            post_code: values.postCode,
          },
        ]);

        if (profileError) {
          setLoading(false);
          setServerError(t("validation.profileErrorMessage"));
          return;
        }

        dispatch(setUser(user));
        dispatch(
          showToast({
            type: "success",
            message: t("validation.success.register"),
          }),
        );
        navigate("/", { replace: true });
      } catch {
        setLoading(false);
        setServerError(t("validation.serverError"));
      }
    },
  });

  const firstError = Object.values(formik.errors)[0];
  const errorMessage = firstError || serverError;

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div
          className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28
          flex flex-col gap-y-8 items-center"
        >
          <form
            className="p-8 border border-TB/15 dark:border-box-border-D
            rounded-3xl flex flex-col gap-y-6 w-full lg:w-[800px]"
            ref={containerRef}
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col items-center gap-y-2.5">
              <h1
                className="text-center font-bold text-[33px] lg:text-[40px]
              text-TB dark:text-white duration-0"
                id="register-title"
              >
                {t("registerPage.register")}
              </h1>

              <p
                className="text-secondary dark:text-secondary-D text-center duration-0"
                id="register-description"
              >
                {t("registerPage.description")}
              </p>
            </div>

            <div
              className="flex flex-col gap-y-6 duration-0"
              id="inputs-parent"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="firstname"
                  >
                    {t("registerPage.firstName.label")}
                  </label>

                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    spellCheck={false}
                    placeholder={t("registerPage.firstName.placeholder")}
                    className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                    w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                  dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="lastname"
                  >
                    {t("registerPage.lastName.label")}
                  </label>

                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    spellCheck={false}
                    placeholder={t("registerPage.lastName.placeholder")}
                    className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                    w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                  dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="email"
                  >
                    {t("registerPage.email.label")}
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="email"
                    spellCheck={false}
                    placeholder={t("registerPage.email.placeholder")}
                    className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                    w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                  dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="phoneNumber"
                  >
                    {t("registerPage.phoneNumber.label")}
                  </label>

                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    spellCheck={false}
                    placeholder={t("registerPage.phoneNumber.placeholder")}
                    className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                    w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                  dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="password"
                  >
                    {t("registerPage.password.label")}
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword.password ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="new-password"
                      spellCheck={false}
                      placeholder={t("registerPage.password.placeholder")}
                      className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                      w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                    dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                    />

                    <button
                      type="button"
                      className="text-secondary text-xl dark:text-secondary-D absolute top-1/2 right-4
                      -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    >
                      {showPassword.password ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="confirmPassword"
                  >
                    {t("registerPage.confirmPassword.label")}
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="new-password"
                      spellCheck={false}
                      placeholder={t(
                        "registerPage.confirmPassword.placeholder",
                      )}
                      className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                      w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                    dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                    />

                    <button
                      type="but"
                      className="text-secondary text-xl dark:text-secondary-D absolute top-1/2 right-4
                      -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    >
                      {showPassword.confirmPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="address"
                  >
                    {t("registerPage.address.label")}
                  </label>

                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    spellCheck={false}
                    placeholder={t("registerPage.address.placeholder")}
                    className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                    w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                  dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                  />
                </div>

                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label className="text-TB dark:text-white text-lg font-normal">
                    {t("registerPage.city.label")}
                  </label>

                  <div
                    ref={dropdownRef}
                    className={`relative flex flex-col border dark:bg-box-D rounded-lg
                        ${
                          dropdown
                            ? "border-TB/40 dark:border-[#5a606f]"
                            : "border-TB/15 dark:border-box-border-D"
                        }`}
                  >
                    <div
                      className="flex items-center justify-between h-full py-3 px-3.5"
                      onClick={toggleDropdown}
                    >
                      <span className="text-TB dark:text-white select-none">
                        {citiesArray[index]}
                      </span>

                      <span
                        className={`text-secondary dark:text-secondary-D text-lg transition-all duration-200
                    ${dropdown ? "rotate-180" : "rotate-0"}`}
                      >
                        <IoChevronDown />
                      </span>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      {dropdown && (
                        <motion.ul
                          className="h-64 w-full overflow-y-auto bg-white dark:bg-body flex flex-col gap-y-1
                          rounded-lg border border-TB/15 dark:border-box-border-D
                          absolute z-20 top-16 left-0 origin-top duration-0 my-scroll"
                          initial={{ height: "0px", opacity: 0 }}
                          animate={{ height: "256px", opacity: 1 }}
                          exit={{ height: "0px", opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {citiesArray.map((city, i) => {
                            return (
                              <li
                                key={i}
                                className={`text-TB dark:text-white p-4 select-none flex items-center justify-between
                            ${i === index ? "bg-secondary/20 dark:bg-secondary-D/15" : "bg-white dark:bg-body"}`}
                                onClick={() => {
                                  setIndex(i);
                                }}
                              >
                                {city}
                                {i === index && (
                                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                                )}
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
                  <label
                    className="text-TB dark:text-white text-lg font-normal"
                    htmlFor="postCode"
                  >
                    {t("registerPage.postCode.label")}
                  </label>

                  <input
                    id="postCode"
                    type="number"
                    name="postCode"
                    value={formik.values.postCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    spellCheck={false}
                    placeholder={t("registerPage.postCode.placeholder")}
                    className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                    w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                  dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                  />
                </div>
              </div>

              <SecondaryButton
                type="submit"
                className="px-5 py-2 w-fit mx-auto flex gap-x-1 items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    {t("validation.registering")}
                    <span
                      className="animate-spin border-x border-t border-white
                                 rounded-full w-5 h-5 ml-2"
                    ></span>
                  </>
                ) : (
                  t("registerPage.submit")
                )}
              </SecondaryButton>
            </div>

            {errorMessage && (
              <p className="text-red-500 font-bold text-center text-lg">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </main>

      <footer className="bg-gray-200/85 dark:bg-box-D">
        <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-12 pb-4">
          <Footer />
        </div>
      </footer>
    </>
  );
}
