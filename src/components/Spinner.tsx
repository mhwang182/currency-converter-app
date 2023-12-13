import '../sass/components/Spinner.scss';

interface ISpinnerProps {
    size? : string
}

const Spinner = (props: ISpinnerProps) => {

    return (
        <>
          <span className={`loader ${props.size}`}></span>
        </>
    )
}

export default Spinner