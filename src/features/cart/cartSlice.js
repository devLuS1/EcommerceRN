import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    user: "",
    updatedAt: "",
    total: 0,
    items: [],
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, actions) => {
      const index = state.cart.items.findIndex(
        (e) => e.product.id == actions.payload.id
      );
      if (index != -1) {
        state.cart.items[index] = {
          product: actions.payload,
          quantity: state.cart.items[index].quantity + 1,
        };
      } else {
        state.cart.items = [
          ...state.cart.items,
          { product: actions.payload, quantity: 1 },
        ];
      }
      state.cart.total = state.cart.items.reduce(
        (total, current) => (total += current.product.price * current.quantity),
        0
      );
      state.cart.updatedAt = new Date().toString();
      state.cart.user = actions.payload.user;
    },

    substractFromCart: (state, actions) => {
      const index = state.cart.items.findIndex(
        (e) => e.product.id == actions.payload.id
      );
      if (state.cart.items[index].quantity > 1) {
        state.cart.items[index] = {
          product: actions.payload,
          quantity: state.cart.items[index].quantity - 1,
        };
      }
      state.cart.total = state.cart.items.reduce(
        (total, current) => (total += current.product.price * current.quantity),
        0
      );
      state.cart.updatedAt = new Date().toString();
      state.cart.user = actions.payload.user;
    },

    removeFromCart: (state, actions) => {
      state.cart.items = state.cart.items.filter(
        (e) => e.product.id !== actions.payload
      );
      state.cart.total = state.cart.items.reduce(
        (total, current) => (total += current.product.price * current.quantity),
        0
      );
    },

    setCartUser: (state, actions) => {
      state.cart.user = actions.payload;
    },

    resetCart: (state) => {
      state.cart.total = 0;
      state.cart.items = [];
    },
  },
});

export const {
  addToCart,
  substractFromCart,
  removeFromCart,
  setCartUser,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
