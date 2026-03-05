import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import { Order } from "@/types/models";
import { removeProductsByOrder } from "./productsSlice";
import { AppDispatch } from ".";

type OrdersState = {
  list: Order[];
  loading: boolean;
};

const initialState: OrdersState = {
  list: [],
  loading: false,
};

export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const { data } = await api.get<Order[]>("/orders");
  return data;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    removeOrder(state, action: PayloadAction<number>) {
      state.list = state.list.filter((o) => o.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const removeOrderCascade =
  (orderId: number) =>
  (dispatch: AppDispatch): void => {
    dispatch(removeOrder(orderId));
    dispatch(removeProductsByOrder(orderId));
  };

export const { removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
