import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const theme = localStorage.getItem("theme");
  return theme ? theme : "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme);
    },
    setTheme: (state, action) => {
      localStorage.setItem("theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
