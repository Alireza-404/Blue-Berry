export default function ScrollPage() {
  return (
    <div
      className="w-44 hidden xl:flex items-center gap-x-2 -rotate-90 absolute -right-12 bottom-28
          select-none"
    >
      <span className="text-secondary dark:text-secondary-D font-thin text-xl">
        Scroll Page
      </span>
      <span className="inline-block w-16 h-px bg-primary"></span>
    </div>
  );
}
