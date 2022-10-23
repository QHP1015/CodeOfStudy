import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RecommendProductsState {
  productList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendProductsState = {
  productList: [],
  loading: true,
  error: null,
};

export const giveMeData: any = createAsyncThunk("recommendProducts/giveMeData", async () => {
  const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections");
  return data;
});

export const recommendProductsSlice = createSlice({
  name: "recommendProducts",
  initialState,
  reducers: {},
  extraReducers: {
    [giveMeData.pending.type]: state => {
      state.loading = true;
      state.error = null;
    },
    [giveMeData.fulfilled.type]: (state, action) => {
      state.productList = action.payload;
      state.loading = false;
      state.error = null;
    },
    [giveMeData.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
