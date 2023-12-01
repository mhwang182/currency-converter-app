import '../sass/components/PopularConversions.scss';
import { popularConversionList } from '../shared/utils';
import ConversionBox from './ConversionBox';

const QuickConversions = () => {
   
    return (
        <div className='popular-container'>
            {
                popularConversionList.map(e => {
                    return (
                        <ConversionBox amount={e.amount} startCode={e.startCode} endCode={e.endCode}/>
                    )
                })
            }
        </div>
    )
}

export default QuickConversions