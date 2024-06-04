import ClinicApi from'./Img2.jpg'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import './Banner.css'
function Banner(props){
    const {Phone} = props
    return(
        <>
            <div className="banner-conainer">
                <div className="banner-container__image">
                    <div className='container__image-box'>
                        <img src={ClinicApi} alt='banner logo'></img>
                    </div>
                </div>
                <div className='banner-container__infomrations'>
                    <div className='container__infromations-box'>
                        <div className='__inforamtions-box__card'>
                            <div className='__inforamtions-title'>
                                <span>Clinic API</span>
                            </div>
                            <div className='__inforamtions-phone'>
                                <FontAwesomeIcon className='__inforamtions-phone-svg' icon={faPhone}/>
                                <span>tel: {Phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;