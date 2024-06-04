import React, { Suspense, useEffect, useState } from "react";
import { useUserContext, useUserContextUpdate } from "../HelperComponents/ThemeProvider/UserContext";
import { useCurrentUser, useCurrentUserUpdate } from "../HelperComponents/ThemeProvider/CurrentUserContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOut, faUserEdit} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Doctor from './Images/Doctor.png'
import './MainPageLog.css'

export default function MainPageLog(){
    const currentUserToken = useUserContext();
    const currentUserTokenHandler = useUserContextUpdate();
    const currentUser = useCurrentUser();
    const currentUserUpdate = useCurrentUserUpdate();
    const currentVisitArray = []
    const [currentVisitArrayState, setCurrentVisitArrayState] = useState(currentVisitArray)
   

    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUserToken}`
            },
        }
        
        
        const fetchData = async()=>{
            const response = await fetch('https://localhost:7083/api/account/informations', requestOptions);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();
            currentUserUpdate(data);
        }

        fetchData().catch(console.error)
    },[currentUserToken])
    


    useEffect(()=>{
        if(currentUser.visits===null || currentUser.visits===undefined){
            return
        }
        for (let index = 0; index < currentUser.visits.length; index++) {
            const element = currentUser.visits[index]
            console.log(element);
            currentVisitArray.push(element)
        }
        setCurrentVisitArrayState(currentVisitArray)
        console.log(currentVisitArrayState);
    },[currentUser])

    const handleLogOut = ()=>{
        currentUserTokenHandler('');
        currentUserUpdate({});
    }
    return(
        <>
            <section  className="user-main__page">
                    <div className="user-main-container">
                        <div className="user-main__img">
                            <div className="user-main__img-container">
                                <img className="user-main__img-doc" src={Doctor} alt="doctor"></img>
                            </div>
                        </div>
                        <div className="user-main__content">
                            <nav className="user-main__navbar">
                                <div className="user-main__navbar-container">
                                    <div className="user-main__navbar-list">
                                        <div className="user-main__list">
                                            <UserMainNavItem label = 'Utwórz wizyte'>
                                                <Link className="user-main__link" to = {'/user/create-visit'}>
                                                    <span>Utwórz wizyte</span>
                                                </Link>
                                            </UserMainNavItem>
                                            <UserMainNavItem>
                                                <Link className="user-main__link" to='/user/visits'>Edytuj Wizyte</Link>
                                            </UserMainNavItem>
                                            <UserMainNavItem >
                                                <Link className="user-main__link" to='/visits'>Informacje o koncie</Link>
                                            </UserMainNavItem>
                                            <UserMainNavItem >
                                                <Link className="user-main__link" to='/visits'>Ustawienia konta</Link>
                                            </UserMainNavItem>
                                            <div className="user-main__logout-container">
                                                <div className="user-main__logout">
                                                    <div className="user__logout-button">
                                                        <button className="logut__button" onClick={handleLogOut}>
                                                            <FontAwesomeIcon icon={faSignOut}/>
                                                            <span>Wyloguj się</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                            <div className="user-main__informations">
                                <div className="user-main__info-container">
                                    <div className="user-main__info-account">
                                        <div className="user-main__greetings">
                                            <div className="user-main-greetings-container">
                                                <h1>Witaj!</h1>
                                                <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <Suspense fallback={<div>Loading</div>}>
                                        <div className="user-main__info-visits">
                                            <div className="user-main-visits__container">
                                                <div className="user-main-visits__titile">
                                                    <h2>Twoje wizyty</h2>
                                                </div>
                                                <div className="user-visits__box">
                                                    {
                                                        currentUser.visits === undefined || currentUser.visits ===null ||currentUser.visits.length===0?
                                                        <div className="user-visits__null">
                                                              <div className="user-visits__null-info">
                                                                <h2>Nie masz zaplanowanych wizyt</h2>
                                                              </div>  
                                                        </div>
                                                        :
                                                        <div className="user-visits__notnull">
                                                            <div className="user-visits__items-container">
                                                                <div className="user-visit__items-box">
                                                                {currentVisitArrayState.map((input)=>{
                                                                    return(
                                                                    <OneVisit 
                                                                        key={input.id} 
                                                                        id= {input.id} specialization = {input.doctorSpecializaton} 
                                                                        doctor = {input.doctorName} 
                                                                        date = {input.dateOfVisit}
                                                                        handleClick = {()=>{
                                                                            
                                                                        }}>
                                                                        
                                                                        <FontAwesomeIcon icon={faUserEdit} />
                                                                    </OneVisit>
                                                                    )
                                                                })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Suspense>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )

}




const UserMainNavItem = (props)=>{
    const {children} = props
    return(
        <>
             <div className="user-main__list-item">
                <div className="user-main__list-link">
                    {children}
                </div>
             </div>
        </>
    )
}


const OneVisit = (props)=>{

    const {id, doctor, specialization, date, key, children, handleClick} = props

    return(
        <>
            <div key={key} className="user-visit__visit-item">
                <div className="user-visit__item-box">
                    <div className="user-visit__item">
                        <span>{id}</span>
                    </div>
                    <div className="user-visit__item">
                        <span>{doctor}</span>
                    </div>
                    <div className="user-visit__item">
                        <span>{specialization}</span>
                    </div>
                    <div className="user-visit__item">
                        <span>{date}</span>
                    </div>


                    <div onClick={handleClick} className="user-visit__item-edit">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}