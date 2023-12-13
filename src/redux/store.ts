import { configureStore } from "@reduxjs/toolkit";
import currencyDataReducer from './CurrencyData';
import currencyStateReducer from './CurrencyState';

const store = configureStore({
    reducer: {
        currencyData: currencyDataReducer,
        currencyState: currencyStateReducer
    }
});

export type AppDispatch = typeof store.dispatch;

export default store;
  