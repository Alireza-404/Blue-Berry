export default function HeroLabels() {
  return (
    <div
      className="w-44 hidden xl:flex items-center gap-x-6 -rotate-90 absolute -left-12 bottom-28
          select-none"
    >
      <span className="text-secondary dark:text-secondary-D font-thin text-xl">
        EN
      </span>

      <span className="text-secondary dark:text-secondary-D font-thin text-xl">
        DE
      </span>

      <span className="text-primary font-thin text-xl">BB</span>
    </div>
  );
}
