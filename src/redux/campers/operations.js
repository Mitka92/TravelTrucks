import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';
export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/campers');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
