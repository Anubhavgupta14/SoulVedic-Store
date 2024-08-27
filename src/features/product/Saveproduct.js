// productSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { getCategory, insertSave } from "../../../api_fetch/admin/Product";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, setSuccessMessage, clearError } = productSlice.actions;

export const saveProduct = (product, images, videos) => async (dispatch) => {
  dispatch(setLoading(true));
  const formData = new FormData();
  formData.append("data", JSON.stringify(product));

  if (images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  if (videos.length > 0) {
    videos.forEach((video) => {
      formData.append("videos", video);
    });
  }

  try {
    const data = await insertSave(formData);
    if (data) {
      dispatch(setSuccessMessage("Product added successfully"));
    } else {
      throw new Error(data.message || "Failed to add product");
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
