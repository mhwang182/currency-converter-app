
interface IPaginationButtonsProps {
    pageNumber: number,
    totalPages: number,
    onPageChange: (pageNumber: number) => void,
    setPageNumber: (pageNumber: number) => void
}

const PaginationButtons = (props: IPaginationButtonsProps) => {

    const {pageNumber, totalPages, onPageChange, setPageNumber} = props;

    const Pagination = () => {
        return (<>
            <button onClick={() => { pageNumber - 1 > 0 && setPageNumber(pageNumber - 1); } }>Previous</button>
            {Array(totalPages).fill(0).map((_, i) => {
                return (<>
                    <button className={i + 1 === pageNumber ? 'checked' : ''} onClick={() => { onPageChange(i + 1); } }>{i + 1}</button>
                </>);
            })}
            <button onClick={() => { pageNumber + 1 <= totalPages && setPageNumber(pageNumber + 1); } }>Next</button>
        </>);
    }

    const LargePagination = () => {

        const getMiddle = (pageNumber: number) => {
            
            if(pageNumber < 4) {
                return (
                <>
                    <button className={2 === pageNumber ? 'checked' : ''} onClick={() => { onPageChange(2); } }>2</button>
                    <button className={3 === pageNumber ? 'checked' : ''} onClick={() => { onPageChange(3); } }>3</button>
                    <button>{'...'}</button>
                </>
                )
            } else if (pageNumber + 2 < totalPages) {
                console.log(pageNumber);
                return (
                <>
                    <button>{'...'}</button>
                    <button className={'checked'}>{pageNumber}</button>
                    <button>{'...'}</button>
                </>
                )
            } else {
                return (
                <>
                    <button>{'...'}</button>
                    <button className={totalPages - 2 === pageNumber ? 'checked' : ''} onClick={() => { onPageChange(totalPages - 2); } }>
                        {totalPages - 2}
                    </button>
                    <button className={totalPages - 1 === pageNumber ? 'checked' : ''} onClick={() => { onPageChange(totalPages - 1); } }>
                        {totalPages - 1}
                    </button>
                </>
                )
            }
        }

        return (<>
            <button onClick={() => { pageNumber - 1 > 0 && setPageNumber(pageNumber - 1); } }>Previous</button>
            <button className={1 === pageNumber ? 'checked' : ''} onClick={() => { onPageChange(1); } }>1</button>
            {
                getMiddle(pageNumber)
            }
            <button className={totalPages === pageNumber ? 'checked' : ''} onClick={() => { onPageChange(totalPages); } }>{totalPages}</button>
            <button onClick={() => { pageNumber + 1 <= totalPages && setPageNumber(pageNumber + 1); } }>Next</button>
        </>);
    }

    return (
        <>
        {totalPages < 6 ? <Pagination /> : <LargePagination />}
        </>
    );
}

export default PaginationButtons