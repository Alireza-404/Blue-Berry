export default function ProductsSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => {
    return (
      <div
        key={i}
        className="h-[421px] bg-secondary/50 dark:bg-secondary-D/50 rounded-3xl
              animate-pulse"
      ></div>
    );
  });
}
