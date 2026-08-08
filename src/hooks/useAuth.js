import { useDispatch } from "react-redux";
import { login, logout, register } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "../redux/Slices/ToastSlice";
import { clearUser, setLoading, setUser } from "../redux/Slices/AuthSlice";

export default function useAuth() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginServerError, setLoginServerError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerServerError, setRegisterServerError] = useState("");

  const handleLogin = async (values) => {
    setLoginLoading(true);
    setLoginServerError("");

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
    setLoginServerError("");
    navigate("/", { replace: true });
  };

  const handleRegister = async (values) => {
    setRegisterLoading(true);
    setRegisterServerError("");

    const { data, success, error } = await register(
      values.email,
      values.password,
      values.firstname,
      values.lastname,
      values.phoneNumber,
      values.address,
      values.city,
      values.postCode,
    );

    if (!success && error === "sign-up-error") {
      setRegisterLoading(false);
      setRegisterServerError(t("validation.registerErrorMessage"));
      return;
    }

    if (!success && error === "profile-error") {
      setRegisterLoading(false);
      setRegisterServerError(t("validation.profileErrorMessage"));
      return;
    }

    if (!success && error === "catch-error") {
      setRegisterLoading(false);
      setRegisterServerError(t("validation.serverError"));
      return;
    }

    if (!success && error) {
      const { success: logoutSuccess, error: logoutError } = await logout();

      if (!logoutSuccess && logoutError) {
        dispatch(setLoading(false));
        return;
      }

      dispatch(clearUser());
      return;
    }

    dispatch(setUser(data));
    dispatch(
      showToast({
        type: "success",
        message: t("validation.success.register"),
      }),
    );
    setRegisterLoading(false);
    setRegisterServerError("");
    navigate("/", { replace: true });
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    const { success, error } = await logout();

    if (!success && error) {
      dispatch(setLoading(false));
      return;
    }

    dispatch(clearUser());
    dispatch(
      showToast({ type: "success", message: t("validation.success.logout") }),
    );
    navigate("/", { replace: true });
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    loginServerError,
    loginLoading,
    registerServerError,
    registerLoading,
  };
}
