import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/ThemeSlice";
import authSlice from "./Slices/AuthSlice";
import toastSlice from "./Slices/ToastSlice";
import cartSlice from "./Slices/CartItemsSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authSlice,
    toast: toastSlice,
    cart: cartSlice,
  },
});

export default store;
