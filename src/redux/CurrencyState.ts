import { createSlice } from "@reduxjs/toolkit"

export interface CurrencyState {
    startCurrencyCode: string,
    endCurrencyCode: string,
    startAmount: number,
    endAmount: number
};

const initialState: CurrencyState = {
    startCurrencyCode: "EUR",
    endCurrencyCode: "GBP",
    startAmount: 0,
    endAmount: 0
};

export const currencyStateSlice = createSlice({
    name: 'currencyState',
    initialState: initialState,
    reducers: {
        setStartCurrencyCode: (state, action) => {
            state.startCurrencyCode = action.payload;
        },
        setEndCurrencyCode: (state, action) => {
            state.endCurrencyCode = action.payload;
        },
        setStartAmount: (state, action) => {
            state.startAmount = action.payload;
        },
        setEndAmount: (state, action) => {
            state.endAmount = action.payload;
        },
        reset: (state) => {
            state.startAmount = 0;
            state.endAmount = 0;
            state.startCurrencyCode = 'EUR';
            state.endCurrencyCode = 'GBP';
        },
        reverse: (state) => {
            let startAmount = state.startAmount;
            let startCode = state.startCurrencyCode;

            state.startAmount = state.endAmount;
            state.startCurrencyCode = state.endCurrencyCode;
            state.endAmount = startAmount;
            state.endCurrencyCode = startCode;
        }
    }
});

export const { 
    setStartCurrencyCode, 
    setEndCurrencyCode, 
    setStartAmount, 
    setEndAmount, 
    reset,
    reverse
} = currencyStateSlice.actions;

export default currencyStateSlice.reducer;
