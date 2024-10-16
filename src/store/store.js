import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { shopApi } from '../services/shopServices'
import { authApi } from "../services/authServices";

const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    userReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export default store