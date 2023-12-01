import { createSlice } from "@reduxjs/toolkit";

export interface CurrencyDataState {
    base: string,
    rates: { [key:string]: number; }
}

const getInitialRates = () => {
    const rates = localStorage.getItem('rates');

    if(rates == null){
        return [];
    }

    return JSON.parse(rates);
}

const initialState: CurrencyDataState = {
    base: 'EUR',
    rates: getInitialRates()
}

export const currencyDataSlice = createSlice({
    name: "currencyData",
    initialState: initialState,
    reducers: {
       setCurrrencyData: (state, action) => {
            console.log('setting state data');
            state.base = action.payload.base;
            state.rates = action.payload.rates;
            localStorage.setItem('rates', JSON.stringify(state.rates));
       }
    }
  });

  export const { setCurrrencyData } = currencyDataSlice.actions;

  export default currencyDataSlice.reducer;