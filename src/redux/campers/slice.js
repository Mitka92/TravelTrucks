import { createSlice } from '@reduxjs/toolkit';
import { getCampers } from './operations';

const initialState = {
  campers: [],
  favoriteCampers: [],
  loading: false,
  error: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.campers = action.payload.items;
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const campersReducer = campersSlice.reducer;
