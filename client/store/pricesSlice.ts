// store/slices/pricesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Price {
  _id: string;
  symbol: string;
  price: number;
  timestamp: string;
}

interface PricesState {
  prices: Price[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PricesState = {
  prices: [],
  status: 'idle',
  error: null,
};

export const fetchPrices = createAsyncThunk('prices/fetchPrices', async (symbol: string) => {
  const response = await axios.get(`https://fomofactory-backend.onrender.com/api/prices/${symbol}`);
  return response.data.data;
});

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prices = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default pricesSlice.reducer;
