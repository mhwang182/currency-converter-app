import VenmoImg from '../images/venmo_icon.png';
import ZelleImg from '../images/Zelle_Logo.png';
import CashAppImg from '../images/Cash_app_logo.png';

export const convertCurrency = (amount: number, startCode: string, endCode: string, currencyRates: { [key:string]: number; }) => {

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