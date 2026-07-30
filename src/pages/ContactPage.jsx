import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";
import SecondaryButton from "../components/Ui/SecondaryButton/SecondaryButton";

import gsap from "gsap";

import { Trans, useTranslation } from "react-i18next";
import { useLayoutEffect, useRef } from "react";

export default function ContactPage() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

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

    return () => ctx.revert();
  }, []);
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
          >
            <input
              id="firstname"
              type="text"
              name="firstname"
              spellCheck={false}
              placeholder={t("contactPage.firstName")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
              required
            />

            <input
              id="lastname"
              type="text"
              name="lastname"
              spellCheck={false}
              placeholder={t("contactPage.lastName")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
              required
            />

            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              spellCheck={false}
              placeholder={t("contactPage.email")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
              required
            />

            <textarea
              name="comment"
              id="comment"
              placeholder={t("contactPage.comment")}
              className="py-3 px-3.5 border border-TB/15 dark:border-box-border-D
              w-full focus:border-TB/40 outline-none rounded-lg dark:bg-box-D resize-none
              dark:focus:border-[#5a606f] placeholder:select-none text-TB dark:text-white"
              rows={7}
              required
            ></textarea>

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
