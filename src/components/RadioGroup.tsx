import '../sass/components/RadioGroup.scss';

interface IRadioGroupProps {
    options: string[],
    selectedOption: string,
    onClick: (option: string) => void
}

const RadioGroup = (props: IRadioGroupProps) => {

    const { options, selectedOption, onClick } = props;

    const capitalize = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div className="radio">
            {
                options.map((option, index) => {return (
                    <>
                        <input 
                            type="radio" 
                            id={`myRadio${index}`} 
                            name="name" 
                            value={option} 
                            onClick={() => {onClick(option)}}
                            checked={option === selectedOption}
                        />
                        <label htmlFor={`myRadio${index}`}>{capitalize(option)}</label>
                    </>
                )})
            }
        </div>
    )
}

export default RadioGroup