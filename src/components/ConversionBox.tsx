import { useDispatch, useSelector } from "react-redux";
import { setEndAmount, setEndCurrencyCode, setStartAmount, setStartCurrencyCode } from "../redux/CurrencyState";
import { CurrencyDataState } from "../redux/CurrencyData";
import { convertCurrency } from "../shared/utils";

interface IConversionBoxProps {
    amount: number,
    startCode: string,
    endCode: string
}

const ConversionBox = (props: IConversionBoxProps) => {

    const dispatch = useDispatch();

    const currencyData: CurrencyDataState = useSelector((state: any) => {
        return state.currencyData;
    });

    const { amount, startCode, endCode } = props;

    const onClick = () => {
        dispatch(setEndCurrencyCode(endCode));
        dispatch(setEndAmount(convertCurrency(amount, startCode, endCode, currencyData.rates)));
        dispatch(setStartCurrencyCode(startCode));
        dispatch(setStartAmount(amount));
    }

    return (
        <div className='conversion-box'>
            <div>{`${amount} ${startCode} to ${endCode}`}</div>
            <div onClick={onClick}>{'>'}</div>
        </div>
    )
}

export default ConversionBox;