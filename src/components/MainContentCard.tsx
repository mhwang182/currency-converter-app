import { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import '../sass/components/MainContentCard.scss';
import { CurrencyDataState, setCurrrencyData } from "../redux/CurrencyData";
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
import { convertCurrency } from "../shared/utils";
import { useNavigate } from "react-router-dom";

export type option = {
    label: string,
    code: string
}

type CurrencyData = {
    success: boolean,
    timestamp: number,
    base: string,
    date: string,
    rates: []
}

const MainContentCard = () => {

    const currencyData: CurrencyDataState = useSelector((state: any) => {
        return state.currencyData;
    });

    const currencyState: CurrencyState = useSelector((state: any) => {
        return state.currencyState;
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

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
        const api = axios.create({
            baseURL: "http://data.fixer.io/api"
        });
        
        const apiKey = process.env.CURRENCY_API_KEY;
        
        const fetchData = async () => {

            if(currencyData.rates.length === 0) {
                const response = (await api.get(`/latest?access_key=${apiKey}&format=1`)).data as CurrencyData;
                if(response.success){
                    dispatch(setCurrrencyData(response));
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);


    const currencyOptions: option[] = Object.keys(currencyData.rates)
                                            .filter(key => CurrencyList.get(key))
                                            .map(key => {
                                                return {label: CurrencyList.get(key).name, code: CurrencyList.get(key).code}
                                            });

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
            {isLoading ? 
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