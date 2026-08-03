import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: true,
    error: false,
  },
  reducers: {
    setWishlistItem: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = false;
    },
    addWishlistItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product_id !== action.payload
      );
    },
    setWishlistLoading: (state, action) => {
      state.loading = action.payload;
      state.error = false;
    },
    setWishlistError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setWishlistItem,
  addWishlistItem,
  removeWishlist,
  setWishlistLoading,
  setWishlistError,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
