import '../sass/components/PaymentAppSection.scss';
import { appLinks } from '../shared/utils';

const PaymentAppSection = () => {

    return (
        <div className='app-section'>
            {appLinks.map(link => {
                return (
                <div className="link-box"> 
                    <a href={link.link}>
                        <img src={link.image}/>
                    </a>
                </div>
                )
            })}
        </div>
    )
}

export default PaymentAppSection;