import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Price } from './types';

const initialState: { prices: Price[], symbol: string } = {
    prices: [],
    symbol: 'GOOG',
};

const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        setPrices: (state, action: PayloadAction<Price[]>) => {
            state.prices = action.payload;
        },
        setSymbol: (state, action: PayloadAction<string>) => {
            state.symbol = action.payload;
        },
    },
});

export const { setPrices, setSymbol } = pricesSlice.actions;

const store = configureStore({
    reducer: {
        prices: pricesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
