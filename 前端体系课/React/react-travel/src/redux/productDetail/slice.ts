import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getProductDetail: any = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log("error", e.message);

      throw new Error(e.message);
        // return Promise.reject(e.message);
    }
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending.type]: state => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
    //   console.log('action.payload:',action.payload);
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (state, action) => {
    //   console.log("action.payload:", action.payload);
      state.loading = false;
    //   state.error = action.error || 'Error';
      state.error = action.error.message;
    },
  },
});
