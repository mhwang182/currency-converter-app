import MainContentCard from '../components/MainContentCard';
import PaymentAppSection from '../components/PaymentAppSection';
// import SavedSection from '../components/SavedSection';
import { useSelector } from 'react-redux';
import '../sass/LandingPage.scss';
import CurrencyList from 'currency-list';
import QuickConversions from '../components/QuickConversions';

export type option = {
    label: string,
    code: string
}

const Landing = () => {

    const currencyState = useSelector((state: any) => {
        return state.currencyState;
    });

    const {startCurrencyCode, endCurrencyCode, startAmount} = currencyState;

    return(
        <div className='landing-container'>
            <div className='main-content-container'>
                <div>
                    <h1>{`${isNaN(startAmount) ? 0 : startAmount} ${CurrencyList.get(startCurrencyCode).name_plural} to ${CurrencyList.get(endCurrencyCode).name_plural}`}</h1>
                </div>
                <MainContentCard />
                <br />
                <p>Popular Conversions:</p>
                <QuickConversions />
                <br />
                <p>Quick Links:</p>
                <PaymentAppSection />
            </div>
        </div>
    )
}

export default Landing