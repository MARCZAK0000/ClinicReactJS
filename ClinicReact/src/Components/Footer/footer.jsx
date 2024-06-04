import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPhone,faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { Phone, Email } from "../MainPage/ImageData";
import './Footer.css'
function Footer(){
    return(
        <>
            <div className="footer-container">
                <div className="footer-container__contact">
                    <div className="footer__contact-header">
                        <h2 className="footer-h2">Kontakt</h2>
                    </div>
                    <div className="footer__contact-address">
                        <ul className="footer-ul">
                            <li className="footer-li">ul.Bukowa 69</li>
                            <li className="footer-li">42-215 Częstochowa</li>
                        </ul>
                    </div>
                    <div className="footer__contact-list">
                        <ul className="footer-ul">
                            <li className="footer-li">
                                <FontAwesomeIcon icon={faPhone}/>
                                <span style={{padding:'0px 10px'}}>{Phone}</span>
                            </li>
                            <li className="footer-li">
                                <FontAwesomeIcon icon={faMailBulk}/>
                                <span style={{padding:'0px 10px'}}>{Email}</span>
                            </li>
                            <li className="footer-li">
                                <span>Znajdz nas na facebooku: </span>
                                <a className="footer-a" href="#">Facebook</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-container__created">
                    <p className="footer-p">Created by jezbob</p>
            </div>
        </>
    )

}


export default Footer;