import { useTranslation } from "react-i18next";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export default function ErrorSkeleton({ get, text, className }) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col items-center gap-y-4 col-span-4 ${
        className || ""
      }`}
    >
      <h4 className="text-3xl text-red-500 dark:text-red-600 text-center">
        {text}
      </h4>

      <PrimaryButton
        type={"button"}
        className={"px-6 py-3 dark:text-secondary-D w-fit"}
        click={get}
      >
        {t("retry")}
      </PrimaryButton>
    </div>
  );
}
