export default function ProductsSkeleton({ homeProducts = false }) {
  return Array.from({ length: homeProducts ? 8 : 4 }).map((_, i) => {
    return (
      <div
        key={i}
        className="h-[373px] md:h-[332px] lg:h-[353px] xl:h-[421px] bg-secondary/50
         dark:bg-secondary-D/50 rounded-3xl
              animate-pulse"
      ></div>
    );
  });
}
