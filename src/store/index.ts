import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";
import productsReducer from "./productsSlice";
import settingsReducer from "./settingsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
