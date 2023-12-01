import '../sass/components/SavedSection.scss';

const SavedSection = () => {

    const testSavedConversion = {
        startAmount: 10,
        startCurrency: 'USD',
        endAmount: 10,
        endCurrency: 'USD',
        description: 'Pay Julien for salad'
    }

    const Card = ({startAmount, startCurrency, endCurrency} : {startAmount: number, startCurrency: string, endCurrency: string}) => {
        return (
            <div className='saved-card'>
                <span>{startAmount} {startCurrency} to {endCurrency}</span>
            </div>
        )
    }

    return (
        <div className="saved-section">
            <div>
                Saved Conversions:
            </div>
            <br />
            <Card 
                startAmount={testSavedConversion.startAmount}
                startCurrency={testSavedConversion.startCurrency}
                endCurrency={testSavedConversion.endCurrency}
            />
            <br />
            <Card 
                startAmount={testSavedConversion.startAmount}
                startCurrency={testSavedConversion.startCurrency}
                endCurrency={testSavedConversion.endCurrency}
            />
            <br />
            <Card 
                startAmount={testSavedConversion.startAmount}
                startCurrency={testSavedConversion.startCurrency}
                endCurrency={testSavedConversion.endCurrency}
            />
            <br />
            <Card 
                startAmount={testSavedConversion.startAmount}
                startCurrency={testSavedConversion.startCurrency}
                endCurrency={testSavedConversion.endCurrency}
            />
            <br />
            <Card 
                startAmount={testSavedConversion.startAmount}
                startCurrency={testSavedConversion.startCurrency}
                endCurrency={testSavedConversion.endCurrency}
            />
            <br />
            <Card 
                startAmount={testSavedConversion.startAmount}
                startCurrency={testSavedConversion.startCurrency}
                endCurrency={testSavedConversion.endCurrency}
            />
            <br />
            <div>See More</div>
        </div>
    )
}

export default SavedSection;