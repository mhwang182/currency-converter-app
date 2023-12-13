import { useEffect } from "react";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import { useDispatch, useSelector } from "react-redux";
import '../sass/components/MainContentCard.scss';
import { CurrencyDataState, fetchCurrencyData } from "../redux/CurrencyData";
import CurrencyList from 'currency-list';
import { 
    CurrencyState, 
    reset, 
    reverse, 
    setEndAmount, 
    setEndCurrencyCode, 
    setStartAmount, 
    setStartCurrencyCode 
} from "../redux/CurrencyState";
import { convertCurrency, getCurrencyOptions, option } from "../shared/utils";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";

const MainContentCard = () => {

    const currencyData: CurrencyDataState = useSelector((state: any) => {
        return state.currencyData;
    });

    const currencyState: CurrencyState = useSelector((state: any) => {
        return state.currencyState;
    });

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const onInputChange = (e: React.FormEvent<HTMLInputElement>, isStartInput: boolean) => {
        let amount: number = parseFloat(e.currentTarget.value);
        if(!isStartInput) {
            let startAmount = convertCurrency(amount, currencyState.endCurrencyCode, currencyState.startCurrencyCode, currencyData.rates);
            dispatch(setEndAmount(amount));
            dispatch(setStartAmount(startAmount));
            return;
        }

        dispatch(setStartAmount(amount));
        let endAmount = convertCurrency(amount, currencyState.startCurrencyCode, currencyState.endCurrencyCode, currencyData.rates);
        dispatch(setEndAmount(endAmount));
    }

    const onStartInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        onInputChange(e, true);
    }

    const onEndInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        onInputChange(e, false);
    }

    useEffect(() => {
        if(currencyData.rates.length === 0) {
            dispatch(fetchCurrencyData());
        }
    }, [dispatch]);

    const currencyOptions: option[] = getCurrencyOptions(currencyData.rates);

    const getCurrencyInfo = (code: string) => {
        return {label: CurrencyList.get(code).name, code: code}
    }

    const onStartCurrencyChange = (code: string) => {
        dispatch(setStartCurrencyCode(code));
        let endAmount = convertCurrency(currencyState.startAmount, code, currencyState.endCurrencyCode, currencyData.rates);
        dispatch(setEndAmount(endAmount));
    }

    const onEndCurrencyChange = (code: string) => {
        dispatch(setEndCurrencyCode(code));
        let startAmount = convertCurrency(currencyState.endAmount, code, currencyState.startCurrencyCode, currencyData.rates);
        dispatch(setStartAmount(startAmount));
    }
    
    return (
        <div className='main-content-card'>
            {currencyData.isLoading ? 
            <div>
                Loading...
            </div> : <div className='content'>
                <div>
                    <CurrencySelect 
                        optionsList={currencyOptions} 
                        currentValue={getCurrencyInfo(currencyState.startCurrencyCode)} 
                        onOptionClick={onStartCurrencyChange}
                    />
                    <AmountInput 
                        value={'' + currencyState.startAmount}
                        onChange={onStartInputChange}
                    />
                </div>
                <div>
                    <CurrencySelect
                        optionsList={currencyOptions}
                        currentValue={getCurrencyInfo(currencyState.endCurrencyCode)}
                        onOptionClick={onEndCurrencyChange}
                    />
                    <AmountInput 
                        value={'' + currencyState.endAmount}
                        onChange={onEndInputChange}
                    />
                </div>
            </div>}
            <div className='button-content'>
                <button onClick={() => dispatch(reverse())}>Reverse Currencies</button>
                <br />
                <button onClick={() => dispatch(reset())}>Reset</button>
                <br />
                <button onClick={() => {navigate("products")}}>View Products</button>
            </div>

        </div>
    )
}

export default MainContentCard