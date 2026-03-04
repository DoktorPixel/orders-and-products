import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orders } from "@/data/seed";

export type Order = (typeof orders)[number];

const ordersSlice = createSlice({
  name: "orders",
  initialState: orders,
  reducers: {
    removeOrder(state, action: PayloadAction<number>) {
      return state.filter((o) => o.id !== action.payload);
    },
  },
});

export const { removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
