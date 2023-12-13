import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CurrencyData } from "../shared/utils";

export interface CurrencyDataState {
    isLoading: boolean,
    base: string,
    rates: { [key:string]: number; }
}

export const fetchCurrencyData = createAsyncThunk(
    'currencyData/fetchData', 
    async () => {
        const api = axios.create({
            baseURL: "http://data.fixer.io/api"
        });

        const apiKey = process.env.REACT_APP_CURRENCY_API_KEY;
        console.log(apiKey);

        const response = (await api.get(`/latest?access_key=${apiKey}&format=1`)).data as CurrencyData;
        return response;
    }
)

const getInitialRates = () => {
    const rates = localStorage.getItem('rates');

    if(rates == null){
        return [];
    }

    return JSON.parse(rates);
}

const initialState: CurrencyDataState = {
    isLoading: false,
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrencyData.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCurrencyData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.rates = action.payload.rates;
            localStorage.setItem('rates', JSON.stringify(state.rates));
            state.base = action.payload.base;
        })
        builder.addCase(fetchCurrencyData.rejected, (state, action) => {
            state.isLoading = false
            //state.error = action.error.message
        })
    }
  });

  export const { setCurrrencyData } = currencyDataSlice.actions;

  export default currencyDataSlice.reducer;