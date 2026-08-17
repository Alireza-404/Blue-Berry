import { useDispatch } from "react-redux";
import { supabase } from "../lib/supabase";
import { clearUser, setUser } from "../redux/Slices/AuthSlice";
import { useEffect, useState } from "react";
import { getUserRole } from "../services/UserRole";
import { showToast } from "../redux/Slices/ToastSlice";
import { useTranslation } from "react-i18next";

export default function useAuthSession() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sessionError, setSessionError] = useState(false);

  const getUser = async () => {
    const { data } = await supabase.auth.getSession();
    setSessionError(false);

    if (data.session) {
      const user = data.session.user;

      const { data: roleData, success, error } = await getUserRole(user.id);

      if (!success && error) {
        dispatch(
          showToast({ type: "error", message: t("user.userLoadError") }),
        );
        setSessionError(true);
        return;
      }

      dispatch(setUser({ ...user, role: roleData.role }));
      setSessionError(false);
    } else {
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  return { sessionError };
}
