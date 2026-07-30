import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    isOpen: false,
    type: "success",
    message: "",
  },
  reducers: {
    showToast: (state, action) => {
      const { type, message } = action.payload;
      state.isOpen = true;
      state.message = message;
      state.type = type;
    },
    closeToast: (state) => {
      state.isOpen = false;
      state.type = "success";
    },
  },
});

export const { showToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
