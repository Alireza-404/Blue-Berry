export default function Hero() {
  return (
    <div className="w-full h-[404px] border border-white/10 rounded-3xl bg-neutral-900/20">
      <div
        className="relative flex flex-col items-center justify-center h-full w-full
        after:w-[420px] after:h-[420px] after:rounded-full after:border-blue-600/20 after:border 
        after:shadow-[0_0_0_80px_rgba(37,99,235,0.025),0_0_0_160px_rgba(37,99,235,0.018)]
        after:absolute after:top-0 after:-translate-y-1/2 overflow-hidden
        before:w-72 before:h-72 before:absolute before:top-0 before:-translate-y-1/2
        before:bg-blue-600/30 before:rounded-full before:blur-3xl p-4"
      >
        <div className="relative z-10 flex flex-col items-center justify-center gap-y-4">
          <span
            className="border border-blue-600/30 bg-blue-500/10 rounded-full text-blue-600
            w-48 sm:w-56 h-9 flex items-center justify-center gap-x-2.5 tracking-wider
            text-xs sm:text-sm"
          >
            <span
              className="w-2 h-2 rounded-full bg-blue-600
                shadow-[0_0_15px_4px_rgba(37,99,235,0.45)]"
            ></span>
            STORE MANAGEMENT
          </span>

          <h2
            className="font-bold text-3xl xs:text-4xl md:text-5xl text-white tracking-wider
            text-center"
          >
            Welcome back, <span className="text-blue-600">Admin.</span>
          </h2>

          <p className="text-zinc-500 text-center md:text-base text-sm">
            Everything you need to manage your store, organized in one simple
            and clean place.
          </p>
        </div>
      </div>
    </div>
  );
}
