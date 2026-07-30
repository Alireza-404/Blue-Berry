export default function PrimaryButton({ className, click, type, children }) {
  return (
    <button
      type={type}
      className={`rounded-lg border border-TB/70 dark:border-box-border-D
         text-TB hover:bg-primary hover:text-white
          hover:border-primary dark:hover:border-primary dark:hover:text-white
            transition-all duration-200 select-none
         ${className || ""}`}
      onClick={click}
    >
      {children}
    </button>
  );
}
