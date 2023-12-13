import axios from "axios";
import { useEffect, useState } from "react";
import '../sass/components/ProductsPage.scss';
import { useDispatch, useSelector } from "react-redux";
import { CurrencyDataState, fetchCurrencyData } from "../redux/CurrencyData";
import { setEndAmount, setEndCurrencyCode, setStartAmount, setStartCurrencyCode } from "../redux/CurrencyState";
import { Product, convertCurrency, getCurrencyOptions, option } from "../shared/utils";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import CurrencySelect from "../components/CurrencySelect";
import CurrencyList from 'currency-list';
import RadioGroup from "../components/RadioGroup";
import Spinner from "../components/Spinner";

const Products = () => {

    const [productsList, setProductsList] = useState([] as Product[]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isProductsLoading, setisProductsLoading] = useState(true);
    const [priceCurrencyCode, setPriceCurrencyCode] = useState('USD');
    const [productPrices, setProductPrices] = useState({} as {[key:number]: number});
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const currencyDataState: CurrencyDataState = useSelector((state: any) => {
        return state.currencyData;
    });

    const api = axios.create({
        baseURL: "https://fakestoreapi.com/"
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = (await api.get('/products/categories')).data;

            setCategories(response);
            setCategory(response[0]);
            setIsDataLoading(false);
        }
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = (await api.get(`/products/category/${category}`)).data as Product[];
            setProductsList(response);
            setisProductsLoading(false);
        }
        if(category.length > 0){
            setisProductsLoading(true);
            fetchData();
        }
        
    } , [category]);

    useEffect(() => {
        if(currencyDataState.rates.length === 0) {
            dispatch(fetchCurrencyData());
        }
    }, [dispatch]);

    const updateCurrencyState = (amount: number, currencyCode: string) => {
        dispatch(setEndCurrencyCode('EUR'));
        dispatch(setEndAmount(convertCurrency(amount, currencyCode, 'EUR', currencyDataState.rates)));
        dispatch(setStartCurrencyCode(currencyCode));
        dispatch(setStartAmount(amount));
        navigate("/");
    }

    const updateProductPrices = () => {
        let newPrices = {} as {[key:number]: number};
        productsList.forEach(product => {
            let num = convertCurrency(product.price, 'USD', priceCurrencyCode, currencyDataState.rates);
            newPrices[product.id] = parseFloat((Math.round(num * 100) / 100).toFixed(2));
        });
        setProductPrices(newPrices);
    }

    useEffect(() => {
        updateProductPrices();
    }, [priceCurrencyCode, productsList]);

    const currencyOptions: option[] = getCurrencyOptions(currencyDataState.rates);

    const isLoading = isDataLoading || currencyDataState.isLoading;

    const onRadioClick = (category: string) => {
        setCategory(category);
    }
    
    return (
        <div className="products-container">
            <br />
            <div> 
                See how the price of some example products look in different currencies!
            </div>
            <br />
            {isLoading ? 
            <div className="spinner-container">
                <Spinner />
            </div> :
            <div>
                <div className="toggle-container">
                    <RadioGroup options={categories} selectedOption={category} onClick={onRadioClick}/>
                    <CurrencySelect
                        optionsList={currencyOptions}
                        currentValue={{code: priceCurrencyCode, label: CurrencyList.get(priceCurrencyCode).name}}
                        onOptionClick={setPriceCurrencyCode}
                        size="small"
                    />
                </div>
                <br />
                <div className="product-cards-container"> 
                {
                    isProductsLoading ? 
                    <div className="spinner-container">
                        <Spinner size="large"/>
                    </div> : 
                    <div className="cards-container"> {
                        productsList.map(product => {
                            return <ProductCard 
                                        product={product} 
                                        productPrice={productPrices[product.id]}
                                        priceCurrencyCode={priceCurrencyCode}
                                        onButtonClick={updateCurrencyState}
                                    />
                        })
                    } </div>
                }
                </div>
            </div>}
        </div>
    )
}

export default Products