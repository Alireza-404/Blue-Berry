import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";
import SecondaryButton from "../components/Ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "../components/Ui/PrimaryButton/PrimaryButton";

import gsap from "gsap";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { supabase } from "../lib/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/AuthSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { showToast } from "../redux/Slices/ToastSlice";

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .min(8, t("validation.passwordMin"))
      .required(t("validation.passwordRequired")),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline();

      tl.from(self.selector("#login-title"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.4,
      })
        .from(self.selector("#login-description"), {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        })
        .from(self.selector("#login-form"), {
          y: 120,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoading(true);
      setServerError("");

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          setServerError(t("validation.loginErrorMessage"));
          setLoading(false);
          return;
        }

        dispatch(setUser(data.user));
        dispatch(
          showToast({
            type: "success",
            message: t("validation.success.login"),
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
          ref={containerRef}
        >
          <div className="flex flex-col gap-y-2.5">
            <h1
              className="text-center font-bold text-[33px] lg:text-[40px]
              text-TB dark:text-white duration-0"
              id="login-title"
            >
              <Trans
                i18nKey={"loginPage.login"}
                components={{
                  1: <span className="text-primary" />,
                }}
              />
            </h1>

            <p
              className="text-secondary dark:text-secondary-D duration-0"
              id="login-description"
            >
              {t("loginPage.description")}
            </p>
          </div>

          <form
            className="p-8 border border-TB/15 dark:border-box-border-D
            rounded-3xl flex flex-col gap-y-6 w-full lg:w-[450px] duration-0"
            id="login-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
              <label
                className="text-TB dark:text-white text-lg font-normal"
                htmlFor="email"
              >
                {t("loginPage.email.label")}
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
                placeholder={t("loginPage.email.placeholder")}
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
                {t("loginPage.password.label")}
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                  spellCheck={false}
                  placeholder={t("loginPage.password.placeholder")}
                  className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
                w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
                dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
                />

                <button
                  type="button"
                  className="text-secondary text-xl dark:text-secondary-D absolute top-1/2 right-4
                            -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            <Link
              to={"#"}
              className="text-secondary dark:text-secondary-D w-fit"
            >
              {t("loginPage.forgotPassword")}
            </Link>

            <div className="flex justify-between items-center">
              <SecondaryButton
                type="submit"
                className={`px-5 py-2 flex gap-x-1 items-center`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    {t("validation.loggingIn")}
                    <span
                      className="animate-spin border-x border-t border-white
                      rounded-full w-5 h-5 ml-2"
                    ></span>
                  </>
                ) : (
                  <Trans
                    i18nKey={"loginPage.login"}
                    components={{
                      1: <span />,
                    }}
                  />
                )}
              </SecondaryButton>

              <Link to={"/auth/register"} replace>
                <PrimaryButton
                  type="button"
                  className="px-5 py-2 dark:text-white"
                >
                  {t("loginPage.register")}
                </PrimaryButton>
              </Link>
            </div>

            {errorMessage && (
              <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
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
