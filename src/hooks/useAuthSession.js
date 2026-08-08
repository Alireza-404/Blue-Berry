import { useDispatch } from "react-redux";
import { supabase } from "../lib/supabase";
import { clearUser, setUser } from "../redux/Slices/AuthSlice";
import { useEffect } from "react";
import { getUserRole } from "../services/UserRole";
import { showToast } from "../redux/Slices/ToastSlice";

export default function useAuthSession() {
  const dispatch = useDispatch();

  const getUser = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      const user = data.session.user;

      const { data: roleData, success, error } = await getUserRole(user.id);

      if (!success && error) {
        dispatch(
          showToast({ type: "error", messgae: t("user.userLoadError") }),
        );
        return;
      }

      dispatch(setUser({ ...user, role: roleData.role }));
    } else {
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);
}
