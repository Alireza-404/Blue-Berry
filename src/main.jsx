import App from "./App.jsx";
import store from "./redux/Store.js";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { I18nextProvider, initReactI18next } from "react-i18next";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

import "./index.css";

// Config
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      de: {
        translation: translationDE,
      },
    },
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
  });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);
