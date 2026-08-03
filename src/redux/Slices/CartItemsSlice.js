import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: true,
    error: false,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
      state.error = false;
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;

      const item = state.cartItems.find((item) => item.id === cartId);

      if (item) {
        item.quantity = quantity;
      }
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
      state.error = false;
    },
    setCartError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setCartItems,
  removeCartItem,
  updateQuantity,
  setCartLoading,
  setCartError,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
