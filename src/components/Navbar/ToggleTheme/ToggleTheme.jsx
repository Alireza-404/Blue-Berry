import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../redux/Slices/ThemeSlice";

export default function ToggleTheme() {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="w-12 h-12 flex items-center justify-center rounded-lg border border-TB/15 dark:border-box-border-D"
      onClick={() => dispatch(toggleTheme())}
    >
      <span className="inline-block dark:hidden text-[22px] text-TB dark:text-white">
        <AiOutlineMoon />
      </span>

      <span className="hidden dark:inline-block text-[22px] text-TB dark:text-white">
        <AiOutlineSun />
      </span>
    </button>
  );
}
