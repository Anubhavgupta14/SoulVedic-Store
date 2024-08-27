import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMenu } from "../../../api_fetch/admin/Menu";

// Async thunk action
export const fetchMenuAsync = createAsyncThunk(
  'menu/fetchMenu',
  async (_, { dispatch }) => {
    try {
      const data = await getMenu();
      console.log(data, "okokokookooko")
      dispatch(menuSlice.actions.setCategories(data.data.reverse()));
      dispatch(menuSlice.actions.setTemp(true));
      return data.data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  }
);

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    categories: [],
    temp: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTemp: (state, action) => {
      state.temp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.temp = true;
      })
      .addCase(fetchMenuAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the synchronous reducers and async thunk action
export const { setCategories, setTemp } = menuSlice.actions;

export default menuSlice.reducer;
