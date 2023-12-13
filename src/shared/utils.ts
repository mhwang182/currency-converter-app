import VenmoImg from '../images/venmo_icon.png';
import ZelleImg from '../images/Zelle_Logo.png';
import CashAppImg from '../images/Cash_app_logo.png';
import CurrencyList from 'currency-list';

export const convertCurrency = (amount: number, startCode: string, endCode: string, currencyRates: { [key:string]: number; }) => {

    if(startCode === endCode){
        return amount;
    }
    let rateStartCurrencyToEUR = 1/currencyRates[startCode];
    let rateEURtoEndCurrency = currencyRates[endCode];

    let amountEUR = amount * rateStartCurrencyToEUR;
    let endAmount = amountEUR * rateEURtoEndCurrency;
    
    return endAmount;
};

export const popularConversionList = [
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'USD'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'CHF'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'JPY'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'CNY'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'GBP'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'HKD'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'AUD'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'NZD'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'CAD'
    },
    {
        amount: 1,
        startCode: 'EUR',
        endCode: 'SEK'
    }
];

export const appLinks = [
    {
        image: VenmoImg,
        link: 'https://venmo.com/'
    },
    {
        image: ZelleImg,
        link: 'https://www.zellepay.com/'
    },
    {
        image: CashAppImg,
        link: 'https://cash.app/'
    }
];

export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

export interface option {
    label: string,
    code: string
}

export type CurrencyData = {
    success: boolean,
    timestamp: number,
    base: string,
    date: string,
    rates: { [key:string]: number; }
}

export const getCurrencyOptions = (rates: { [key:string]: number; }) => {
    return Object.keys(rates)
    .filter(key => CurrencyList.get(key))
    .map(key => {
        return {label: CurrencyList.get(key).name, code: CurrencyList.get(key).code}
    });
}