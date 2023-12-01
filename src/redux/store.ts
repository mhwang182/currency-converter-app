import { configureStore } from "@reduxjs/toolkit";
import currencyDataReducer from './CurrencyData';
import currencyStateReducer from './CurrencyState';

export default configureStore({
    reducer: {
        currencyData: currencyDataReducer,
        currencyState: currencyStateReducer
    }
});
  