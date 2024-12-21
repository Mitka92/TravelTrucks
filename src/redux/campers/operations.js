import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectFilters } from './selectors.js';
import { useSelector } from 'react-redux';
axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async (
    { page = 1, limit = 4, filterParams = useSelector(selectFilters) },
    thunkApi
  ) => {
    try {
      // Формуємо параметри запиту
      const params = {
        page,
        limit,
        ...filterParams, // Додаємо всі фільтри безпосередньо
      };
      // Відправляємо запит
      const { data } = await axios.get('/campers', { params });

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getCamperById = createAsyncThunk(
  'campers/getCampersById',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get('/campers/' + id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const setFilters = filters => ({
  type: 'campers/setFilters',
  payload: filters,
});
