import axios from "axios";
import { useEffect, useState } from "react";
import '../sass/components/ProductsPage.scss';
import { useDispatch, useSelector } from "react-redux";
import { CurrencyDataState } from "../redux/CurrencyData";
import { CurrencyState, setEndAmount, setEndCurrencyCode, setStartAmount, setStartCurrencyCode } from "../redux/CurrencyState";
import { convertCurrency } from "../shared/utils";
import { useNavigate } from "react-router-dom";

interface Product {
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

const Products = () => {

    const [productsList, setProductsList] = useState([] as Product[]);

    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState('');
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currencyData: CurrencyDataState = useSelector((state: any) => {
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
        }
        fetchData();
    }, []);
    
    useEffect(() => {
       
        const fetchData = async () => {
            const response = (await api.get(`/products/category/${category}`)).data as Product[];

            setProductsList(response);
        }
        if(category.length > 0){
            fetchData();
        }
        
    } , [category]);

    const updateCurrencyState = (amount: number) => {
        dispatch(setEndCurrencyCode('EUR'));
        dispatch(setEndAmount(convertCurrency(amount, 'USD', 'EUR', currencyData.rates)));
        dispatch(setStartCurrencyCode('USD'));
        dispatch(setStartAmount(amount));
        navigate("/");
    }

    const productCard = (product: Product) => {
        return (
            <div className="product-card">
                <div 
                    className="image-container"
                    style={{backgroundImage: `url(${product.image})`}}
                >
                </div>
                <br />
                <div className="product-title">{product.title}</div>
                <br />
                <div className="product-price">${product.price}</div>
                <br />
                <button onClick={() => {updateCurrencyState(product.price)}}>View Price Conversion</button>
            </div>
        );
    }

    const onCategoryChange = (e: any) => {
        setCategory(e.target.value);
    }
    
    return (
        <div className="products-container">
            <div className="toggle-container">
                <select onChange={onCategoryChange}> 
                    {
                        categories.map(category => {
                            return (<option value={category}>{category}</option>)
                        })
                    }
                </select>
            </div>
            <br />
            <div className="product-cards-container"> 
            {
                productsList.map(product => {return productCard(product)})
            }
            </div>
        </div>
    )
}

export default Products