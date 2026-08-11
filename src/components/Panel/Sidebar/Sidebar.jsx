import { AnimatePresence, motion } from "framer-motion";
import SidebarContent from "../SidebarContent/SidebarContent";
import Overlay from "../../Ui/Overlay/Overlay";

export default function Sidebar({ showMenu, setShowMenu }) {
  return (
    <>
      <aside
        className="fixed top-0 bottom-0 left-0 z-40 w-72 xl:w-80 bg-neutral-900/20 border-r
      border-r-white/10 lg:block hidden"
      >
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {showMenu && (
          <>
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="fixed top-0 bottom-0 left-0 z-40 w-72 xl:w-80 bg-[#121212] border-r
            border-r-white/10 lg:hidden blcok duration-0"
            >
              <SidebarContent />
            </motion.aside>

            <Overlay click={() => setShowMenu(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
