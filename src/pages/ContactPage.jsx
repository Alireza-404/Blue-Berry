import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";
import SecondaryButton from "../components/Ui/SecondaryButton/SecondaryButton";

import gsap from "gsap";

import { Trans, useTranslation } from "react-i18next";
import { useLayoutEffect, useRef, useState } from "react";

export default function ContactPage() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline();

      tl.from(self.selector("#contact-title"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.4,
      })
        .from(self.selector("#contact-description"), {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        })
        .from(self.selector("#contact-form"), {
          y: 120,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        });
    }, containerRef);

    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { firstname, lastname, email, comment } = value;

    if (!firstname) {
      setErrorMessage(t("contactPage.messages.firstNameRequired"));
      return;
    }

    if (firstname.length < 3 || firstname.length > 40) {
      setErrorMessage(t("contactPage.messages.invalidFirstName"));
      return;
    }

    if (!lastname) {
      setErrorMessage(t("contactPage.messages.lastNameRequired"));
      return;
    }

    if (lastname.length < 3 || lastname.length > 40) {
      setErrorMessage(t("contactPage.messages.invalidLastName"));
      return;
    }

    if (!email) {
      setErrorMessage(t("contactPage.messages.emailRequired"));
      return;
    }

    const emailRegex = /^[\w.+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage(t("contactPage.messages.invalidEmail"));
      return;
    }

    if (!comment) {
      setErrorMessage(t("contactPage.messages.messageRequired"));
      return;
    }

    if (comment.length < 10) {
      setErrorMessage(t("contactPage.messages.invalidMessage"));
      return;
    }

    setErrorMessage("");
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div
          className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28
          flex flex-col items-center gap-y-6 lg:gap-y-12"
          ref={containerRef}
        >
          <div className="flex flex-col gap-y-3 items-center">
            <h2
              className="text-[33px] lg:text-[40px] font-bold text-center
             text-TB dark:text-white duration-0"
              id="contact-title"
            >
              <Trans
                i18nKey={"contactPage.title"}
                components={{
                  1: <span className="text-primary" />,
                }}
              />
            </h2>

            <p
              className="text-center text-secondary dark:text-secondary-D lg:text-lg
              duration-0 lg:w-[600px]"
              id="contact-description"
            >
              {t("contactPage.description")}
            </p>
          </div>

          <form
            className="p-8 border border-TB/15 dark:border-box-border-D
            rounded-3xl flex flex-col gap-y-6 w-full lg:w-[650px] duration-0"
            id="contact-form"
            onSubmit={onSubmitHandler}
          >
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={value.firstname}
              onChange={onChangeHandler}
              spellCheck={false}
              placeholder={t("contactPage.firstName")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
            />

            <input
              id="lastname"
              type="text"
              name="lastname"
              value={value.lastname}
              onChange={onChangeHandler}
              spellCheck={false}
              placeholder={t("contactPage.lastName")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
            />

            <input
              id="email"
              type="text"
              name="email"
              autoComplete="email"
              value={value.email}
              onChange={onChangeHandler}
              spellCheck={false}
              placeholder={t("contactPage.email")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
              formNoValidate
            />

            <textarea
              name="comment"
              id="comment"
              value={value.comment}
              onChange={onChangeHandler}
              placeholder={t("contactPage.comment")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D resize-none
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white
              my-scroll"
              rows={7}
            ></textarea>

            {errorMessage && (
              <p className="text-red-500 font-bold text-lg text-center">
                {errorMessage}
              </p>
            )}

            <SecondaryButton
              type={"submit"}
              className={"px-5 py-2 w-fit mx-auto"}
            >
              {t("contactPage.submit")}
            </SecondaryButton>
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
