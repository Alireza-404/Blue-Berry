export default function PanelButton({
  type,
  className,
  disabled,
  click,
  children,
}) {
  return (
    <button
      onClick={click}
      type={type}
      className={`${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
