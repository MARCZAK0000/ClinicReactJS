import {benficationArray} from './Data/Benifications';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCar, faBicycle, faCreditCard, faSnowflake, 
    faChild, faWifi, faWheelchair, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

function BenificationsItems(){
    return(
        <div className='benifications-items'>
            {benficationArray.map((item)=>{
                return(
                  <div key={item.benefication_id} className='benfication-item'>
                        <div className='benfication-item__svg'>
                            <FontAwesomeIcon fill='white' icon={iconArray[item.benefication_id]}/>
                            
                        </div>
                        <div className='benfication-item__title'>
                            <h4>{item.benefication_name}</h4>
                        </div>
                  </div>  
                );
            })}
        </div>
    )
}    


const iconArray=[
    faCar,
    faBicycle,
    faCreditCard,
    faSnowflake,
    faChild,
    faWifi,
    faWheelchair,
    faPeopleGroup
]

export default  BenificationsItems;



