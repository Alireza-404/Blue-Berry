import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Counter({
  from = 0,
  to,
  duration = 2,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let control;

    const timer = setTimeout(() => {
      control = animate(from, to, {
        duration,
        onUpdate: (value) => {
          setCount(Math.floor(value));
        },
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      control?.stop();
    };
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}
