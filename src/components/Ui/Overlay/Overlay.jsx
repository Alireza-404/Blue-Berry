import { motion } from "framer-motion";

export default function Overlay({ click }) {
  return (
    <motion.div
      id="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bg-black/40 dark:bg-black/60 inset-0 z-30 duration-0"
      onClick={click}
    ></motion.div>
  );
}
