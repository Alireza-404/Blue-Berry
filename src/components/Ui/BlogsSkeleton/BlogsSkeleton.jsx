export default function BlogsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => {
    return (
      <div
        key={i}
        className="h-[444px] md:h-[428px] lg:h-[417px] xl:h-[470px] bg-secondary/50
           dark:bg-secondary-D/50 rounded-3xl
                animate-pulse"
      ></div>
    );
  });
}
