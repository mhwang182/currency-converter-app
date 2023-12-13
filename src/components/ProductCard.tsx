import { Product } from "../shared/utils";
import '../sass/components/ProductCard.scss';

interface IProductCardProps {
    product: Product,
    productPrice: number,
    priceCurrencyCode: string,
    onButtonClick: (amount: number, currencyCode: string) => void
}

const ProductCard = (props: IProductCardProps) => { 

    const {product, productPrice, priceCurrencyCode, onButtonClick} = props;
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
            <div className="product-price">Price: {`${productPrice} (${priceCurrencyCode})`}</div>
            <br />
            <button onClick={() => {onButtonClick(productPrice, priceCurrencyCode)}}>View Price Conversion</button>
        </div>
    );
}

export default ProductCard;