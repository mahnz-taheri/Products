import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// thunk to fetch slider images
export const fetchImages = createAsyncThunk("slider/fetchImages", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data.map((product) => product.image);
});

// thunk to fetch a product by ID
export const fetchProductById = createAsyncThunk(
  "slider/fetchProductById",
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }
);

// thunk to fetch initial products for the product list
export const fetchProducts = createAsyncThunk(
  "slider/fetchProducts",
  async (_, { getState }) => {
    const { slider } = getState();
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data
      .filter((product) => !slider.usedProductIds.includes(product.id))
      .slice(0, 5);
  }
);

const initialState = {
  images: [],
  products: [],
  usedProductIds: [],
  status: "idle",
  error: null,
};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    nextSlide: (state) => {
      const firstImage = state.images.shift();
      state.images.push(firstImage);
    },
    replaceProduct: (state, action) => {
      const { index, product } = action.payload;
      state.products[index] = product;
      state.usedProductIds = state.products.map((p) => p.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.usedProductIds = action.payload.map((product) => product.id);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { nextSlide, replaceProduct } = sliderSlice.actions;
export default sliderSlice.reducer;
