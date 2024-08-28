import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./src/features/cart/CartSlice";
// import productReducer from "./src/features/product/Saveproduct";
import userReducer from "./src/features/user/UserSlice"
import menuReducer from "./src/features/menu/MenuSlice"

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    // product: productReducer,
    user: userReducer,
    menu: menuReducer,
    // Add other reducers here if you have any
  },
});

export const persistor = persistStore(store);
