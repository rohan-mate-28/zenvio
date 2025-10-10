import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage"; // defaults to localStorage
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice"; // 👈 import payment slice

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  payments: paymentReducer, // 👈 add payments slice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // 👈 persist only auth (not payments)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
