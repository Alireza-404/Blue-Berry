export default function SecondaryButton({
  className,
  click,
  type,
  disabled,
  children,
}) {
  return (
    <button
      type={type}
      className={`rounded-lg bg-primary text-white hover:bg-[#5869b4]
            transition-all duration-200 select-none
         ${className || ""}`}
      onClick={click}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
