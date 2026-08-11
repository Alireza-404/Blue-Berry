export default function PanelButton({ type, className, children }) {
  return (
    <button type={type} className={`${className || ""}`}>
      {children}
    </button>
  );
}
