import '../sass/components/CurrencySelect.scss';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { option } from '../pages/landing';
import CurrencyFlag from 'react-currency-flags';

interface ICurrencySelectProps {
    currentValue: option, 
    optionsList: option[],
    onOptionClick: (code: string) => void
}

const CurrencySelect = ({currentValue, optionsList, onOptionClick} : ICurrencySelectProps) => {

    const [openDropdown, setOpenDropdown] = useState(false);
    const [filter, setFilter] = useState('');

    const [inputText, setInputText] = useState(currentValue.label);

    const toggleOpen = () => {
        setOpenDropdown(!openDropdown);
    }

    const closeDropdown = () => {
        setInputText(currentValue.label);
        setOpenDropdown(false);
    }

    const onTextChange = (e: any) => {
        setOpenDropdown(true);
        const value = e.target.value;
        setInputText(value);
        setFilter(value);
    }    

    const clearInput = () => {
        setOpenDropdown(true);
        setInputText('');
        setFilter('');
    }

    const filterString = (label: string) => {
        return label.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }

    const ref = useDetectClickOutside({ onTriggered: closeDropdown });

    return (
        <div className='container' ref={ref}>
            <CurrencyFlag currency={currentValue.code} size="lg"/>
            &nbsp;
            <input className='value' value={inputText} onChange={onTextChange}></input>
            <button className='clear-button' onClick={clearInput}>&times;</button>
            <button onClick={toggleOpen}>▼</button>
            <ul className={`options`} style={openDropdown ? {} : {display: 'none'}}>
                {optionsList
                    .filter(opt => filterString(opt.label))
                    .map(option => {
                    return (
                        <li 
                            key={option.code} 
                            onClick={() => {
                                onOptionClick(option.code);
                                setInputText(option.label);
                                setFilter('');
                                setOpenDropdown(false);
                            }}
                            style={option.code === currentValue.code ? {backgroundColor: 'gray'} : {}}
                        >
                            {option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CurrencySelect
