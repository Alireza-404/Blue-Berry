import LogoSrc from "../../../assets/images/logo.webp";
import LogoDarkrc from "../../../assets/images/logo-dark.webp";

export default function Logo({ className }) {
  return (
    <>
      <img
        src={LogoSrc}
        alt="main-logo"
        className={`dark:hidden block ${className || ""}`}
      />

      <img
        src={LogoDarkrc}
        alt="dark-main-logo"
        className={`dark:block hidden ${className || ""}`}
      />
    </>
  );
}
