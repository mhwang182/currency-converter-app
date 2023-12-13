import axios from "axios";
import { useEffect, useState } from "react";
import '../sass/components/CountryCard.scss';
import RadioGroup from "../components/RadioGroup";
import SearchInput from "../components/SearchInput";
import PaginationButtons from "../components/PaginationButtons";

interface Country {
    flags: {
        png: string,
        svg: string,
        alt: string
    },
    name: {
        common: string,
        official: string,
        nativeName: {}
    },
    currencies: { [key: string]: {name: string, symbol: string}},
    capital: string[],
    region: string,
    population: number
}

const CountryInfo = () => {

    const [countries, setCountries] = useState([] as Country[]);
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const [region, setRegion] = useState('europe');
    const [filter, setFilter] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countries);

    const regions = ['all', 'europe', 'asia', 'americas', 'oceania', 'africa'];

    const api = axios.create({
        baseURL: "https://restcountries.com/v3.1/"
    });

    useEffect(() => {
        const fetchData = async () => {
            const fields = 'name,capital,currencies,flags,region,population';
            const response = region === 'all' ? await api.get(`/all?fields=${fields}`) :
            await api.get(`/region/${region}?fields=${fields}`);

            setCountries(response.data as Country[]);
            //setFilteredCountries(response.data as Country[]);
        }
        
        fetchData();
        setPageNumber(1);
    }, [region]);

    useEffect(() => {
        let searchCountries = countries.filter(country => filterString(country.name.common));
        setFilteredCountries(searchCountries);
        setPageNumber(1);
    }, [filter, countries]);

    const onTextChange = (e: any) => {
        const value = e.target.value;
        setFilter(value);
    }    

    const getCurrencyCodes = (currencies: { [key: string]: {name: string, symbol: string}}) => {
        let strings: string[] = [];
        Object.keys(currencies).forEach(code => {
            strings.push(getCurrencyString(code, currencies[code]));
            
        });

        return strings.join(', ');
    }

    const getCurrencyString = (code: string, info: {name: string, symbol: string}) => {
        return `${info.name} (${code})`;
    }

    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage < filteredCountries.length ? startIndex + itemsPerPage : countries.length;

    const onPageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    }

    const CountryCard = ({ country }: { country: Country}) => {
        return (
            <div className="country-card">
                <img src={country.flags.png}></img>
                <br />
                <div><b>{country.name.common}</b></div>
                <br />
                <div><b>Capital: </b>{country.capital}</div>
                <div><b>Region: </b>{country.region}</div>
                <div><b>Population: </b>{country.population}</div>
                <div><b>Currency: </b>{getCurrencyCodes(country.currencies)}</div>
            </div>
        )
    }

    const filterString = (name: string) => {
        return name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }

    return (
        <div className="country-info-container">
            <br />
            <div className="filters-container">
                <SearchInput placeholder="Search for a country..." value={filter} onChange={onTextChange}/>
                <RadioGroup options={regions} selectedOption={region} onClick={setRegion}/>
            </div>
            <br />
            <br />
            <div className="country-card-container"> 
            {
                filteredCountries.slice(startIndex, endIndex).map(country => <CountryCard country={country}/>)
            } 
            </div>
            <br />
            <br />
            <div className="page-num-buttons">
            {
                totalPages > 1 ? 
                <PaginationButtons
                    pageNumber={pageNumber}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    setPageNumber={setPageNumber}
                /> 
                : null
            }
            </div>
            <br />
            <br />
        </div>
    )
}

export default CountryInfo