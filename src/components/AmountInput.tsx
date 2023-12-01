import '../sass/components/AmountInput.scss';

interface AmountInputProps {
    value: string, 
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const AmountInput = ({value, onChange} : AmountInputProps) => {
    return (
        <input 
            type="number" 
            value={value} 
            onChange={onChange}
            className='amount-input'
        />
    )
}

export default AmountInput;