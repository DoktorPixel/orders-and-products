import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import { Product } from "@/types/models";

type ProductsState = {
  list: Product[];
  loading: boolean;
};

const initialState: ProductsState = {
  list: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeProductsByOrder(state, action: PayloadAction<number>) {
      state.list = state.list.filter((p) => p.order !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { removeProductsByOrder } = productsSlice.actions;
export default productsSlice.reducer;
