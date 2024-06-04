import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Images, Phone } from "./ImageData";
import './MainPage.css';
import Banner from "../Banner/Banner";
import Tooth from "./svg/tooth";
import Stetoscope from "./svg/stetoscope";
import Lift from "./svg/lift";
import Benifications from "./Benifcations";
function MainPage(){



    const [counter, setCounter] = useState(0)
    useEffect(()=>{
        if(counter<3){
            const timer = setInterval(()=>{
                setCounter((prevCount)=>(prevCount+1)%Images.length)
             }, 10000);
             return ()=>clearInterval(timer);
        }
        else{
            setCounter(0)
        }
        
    },[counter])

    const handleCounter = (parms)=>{
        setCounter(parms)
    }
    
    

    return(
        <>
            <section className='conainer__banner'>
                <Banner Phone={Phone} />
            </section> 
            <section className="main-container">
                <div className="main-container__offert">
                    <div className="container__offert-box">
                        <section className="offert-box__carousel">
                            <div className="box__carousel-container">
                                <div className="offert-box__title">
                                    <h2>{Images[counter].image_alt}</h2>
                                    <span>{Images[counter].image_text}</span>
                                </div>
                                <img className="carousel_img" src={Images[counter].image_source} alt={Images[counter].image_alt}></img>
                                <div className="offer-box__about">
                                    <div className="box__about-container"
                                         typeof="button">
                                        <span>
                                            <a href={Images[counter].image_link}>
                                                <span>Dowiedz się wiecej</span>
                                                <FontAwesomeIcon className="arrow-svg" icon={faArrowRight}/>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <div className="caroulse__buttons">
                                    <div className="carousle__buttons-container">
                                        {Images.map((image)=>{
                                            return (
                                                <>
                                                    <button style={counter==image.image_id?{backgroundColor:'#58a16d'}:{backgroundColor:'#234a2e'}}
                                                        key={image.image_id} 
                                                        className="caroulse__button"
                                                        onClick={()=>{
                                                            handleCounter(image.image_id)
                                                        }}>
                                                    </button>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="offert-box__cards">
                            <div className="box__cards-container">
                                <div className="box__cards card1">
                                    <a href="#">
                                        <div className="box__cards-title">
                                            <span>Stomatologia</span>
                                        </div>
                                        <div className="box__cards-svg">
                                            <Tooth/>
                                        </div>
                                        <div className="box__cards-about">
                                            <span>Dowiedz się wiecej</span>
                                            <FontAwesomeIcon className="arrow-svg" icon={faArrowRight}/>
                                        </div>

                                    </a>
                                </div>
                                <div className="box__cards card2">
                                    <a href="#">
                                        <div className="box__cards-title2 ">
                                                <span>Poradnie Specjalistyczne</span>
                                        </div>
                                        <div className="box__cards-svg">
                                            <Stetoscope/>
                                         </div>
                                         <div className="box__cards-about">
                                                <span>Dowiedz się wiecej</span>
                                                <FontAwesomeIcon className="arrow-svg" icon={faArrowRight}/>
                                        </div>
                                    </a>
                                </div>
                                <div className="box__cards card3">
                                    <a href="#">
                                        <div className="box__cards-title">
                                                <span>Fizjoterapia</span>
                                            </div>
                                            <div className="box__cards-svg">
                                            <Lift/>
                                        </div>
                                        <div className="box__cards-about">
                                                <span>Dowiedz się wiecej</span>
                                                <FontAwesomeIcon className="arrow-svg" icon={faArrowRight}/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </section>



                        <section className="benifications-box">
                             <div className="benifications-box__container">
                                <div className="benifications-header">
                                    <h5>Udogodnienia</h5>
                                    <h3>Centrum Medyczne z troską o pacjenta</h3>
                                    <p>Każdego dnia dokładamy wszelkich starań aby pobyt w Centrum Medycznym ClinicAPI był dla pacjenta komfortowy.</p>
                                </div>
                                <div className="benifications-items__container">
                                    <Benifications/>
                                </div>
                            </div>                           
                        </section>
                    </div>
                </div>
            </section>
        </>

    )
}


export default MainPage