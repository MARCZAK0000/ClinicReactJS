import './navbar.css'
import { Link } from 'react-router-dom'
function Navbar(){
    return (
    <>
        <div className="nav-container">
            <div className="nav-container__links">
                <Links link = '/' name="Strona domowa"/>
                <Links link = '/login' name="Logowanie"/>
                <Links link = '/registration' name="Rejestracja"/>
                <Links link = '/team' name="Zespół"/>
                <Links link = '/offer' name="Oferta"/>
                <Links link = '/price' name="Cennik"/>
                <Links link = '/contact' name="Kontakt"/>
            </div>
        </div>
    </>
    )


}

const Links = (props)=>{

    const {link, name} = props
    return(
        <>
            <div className="nav-link">
                <div className="nav-link__title">
                    <Link className='nav__link' to={link}><span>{name}</span></Link>
                </div>      
            </div>
        </>
    )
}


export default Navbar;