import { useDispatch } from "react-redux";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "../redux/Slices/ToastSlice";
import { setUser } from "../redux/Slices/AuthSlice";

export default function useAuth() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginServerError, setLoginServerError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoginLoading(true);
    const { data, success, error } = await login(values.email, values.password);

    if (!success && error === "login_error") {
      setLoginServerError(t("validation.loginErrorMessage"));
      setLoginLoading(false);
      return;
    }

    if (!success && error === "catch_error") {
      setLoginLoading(false);
      setLoginServerError(t("validation.serverError"));
      return;
    }

    dispatch(setUser(data.user));
    dispatch(
      showToast({
        type: "success",
        message: t("validation.success.login"),
      }),
    );
    setLoginLoading(false);
    navigate("/", { replace: true });
  };

  return { handleLogin, loginServerError, loginLoading };
}
