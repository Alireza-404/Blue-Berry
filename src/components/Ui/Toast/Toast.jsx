import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../../../redux/Slices/ToastSlice";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export default function Toast() {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const { message, isOpen, type } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!isOpen) {
      setVisible(false);
      return;
    }

    const delay = setTimeout(() => {
      setVisible(true);
    }, 120);

    const handleTimer = setTimeout(() => {
      setVisible(false);
      dispatch(closeToast());
    }, 2800);

    return () => {
      clearTimeout(delay);
      clearTimeout(handleTimer);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-4 z-50 flex w-72 md:w-80 items-center gap-3 overflow-hidden rounded-2xl
      px-5 py-4 transition-all !duration-300
    ${
      visible
        ? "left-4 translate-x-0 opacity-100"
        : "left-4 -translate-x-[120%] opacity-0"
    }
    ${
      type === "success"
        ? "bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400"
        : type === "error"
        ? "bg-gradient-to-r from-red-600 via-rose-500 to-red-400"
        : "bg-gradient-to-r from-purple-600 via-primary to-purple-400"
    }`}
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
        {type === "success" || type === "primary" ? (
          <AiFillCheckCircle className="text-3xl text-white" />
        ) : (
          <AiFillCloseCircle className="text-3xl text-white" />
        )}
      </div>

      <div className="relative flex flex-col">
        <span className="text-base font-semibold text-white">
          {type === "success" || type === "primary" ? "Success" : "Error"}
        </span>

        <span className="text-sm leading-5 text-white/90">{message}</span>
      </div>
    </div>
  );
}
