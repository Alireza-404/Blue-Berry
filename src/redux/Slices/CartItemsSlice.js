import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: true,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },
    updateQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;

      const item = state.cartItems.find((item) => item.id === cartId);

      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setCartItems, removeCartItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
