import { createSlice } from '@reduxjs/toolkit';
import { getCampers, getCamperById } from './operations';

const initialState = {
  total: 0,
  items: [],
  favoriteCampers: [],
  currentCamper: null,
  filters: {}, // Додаємо фільтри в стейт
  loading: false,
  error: null,
  page: 1, // Поточна сторінка
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    clearCampers: state => {
      state.items = [];
    },
    setFilters: (state, action) => {
      state.filters = action.payload; // Оновлюємо фільтри
    },
    setPage: (state, action) => {
      state.page = action.payload; // Оновлюємо сторінку
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        const { items, total } = action.payload;
        state.loading = false;
        state.total = total;
        const uniqueItems = items.filter(
          item => !state.items.some(existingItem => existingItem.id === item.id)
        );
        state.items = [...state.items, ...uniqueItems];
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCamperById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(getCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { setFilters, clearCampers, setPage } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
