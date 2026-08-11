import Sidebar from "../../Panel/Sidebar/Sidebar";
import { AnimatePresence } from "framer-motion";
import Overlay from "../../Ui/Overlay/Overlay";

export default function PanelLayout({ showMenu, setShowMenu, children }) {
  return (
    <div className="bg-neutral-950 min-h-screen flex">
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />

      {children}
    </div>
  );
}
