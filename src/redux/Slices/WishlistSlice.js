import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: true,
  },
  reducers: {
    setWishlistItem: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    addWishlistItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product_id !== action.payload
      );
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  setWishlistItem,
  addWishlistItem,
  removeWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
