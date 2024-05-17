// store.js
import { configureStore} from "@reduxjs/toolkit";
import cartReducer from "../lib/CartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;