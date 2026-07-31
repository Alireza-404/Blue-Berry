export default function Image({ src }) {
  const images = [
    {
      id: 1,
      src,
      filter: "none",
    },
    {
      id: 2,
      src,
      filter: "brightness(1.1) saturate(1.3)",
    },
    {
      id: 3,
      src,
      filter: "contrast(1.15) hue-rotate(20deg)",
    },
  ];

  return (
    <div className="rounded-2xl border border-TB/15 dark:border-box-border-D p-4">
      <img src={src} alt={"Big-Image"} className="w-full rounded-2xl" />
    </div>
  );
}
