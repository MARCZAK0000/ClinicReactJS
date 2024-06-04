import { useEffect, useRef, useState } from "react";
import { Inputs } from "./inputs";
import Image from './Images/Image.png'
import './Login.css'
import { useUserContextUpdate, useUserContext } from "../HelperComponents/ThemeProvider/UserContext";
import { Link } from "react-router-dom";


function Login(){
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const userLoginUpdate = useUserContextUpdate();
    const userLoginToken = useUserContext();
    const abortController = useRef(null); 
    const onChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value})
        
    }


    async function loginRequest (){
        try {

            abortController.current = new AbortController();
            const requestOptions = {
                signal : abortController.current.signal,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    { 
                        "email": values.email,
                        "password": values.password,
                        
                    }
                
                )          
    
            }

            setTimeout(()=>{
                if(userLoginToken.trim()===''){
                    console.log("Timeout");
                    abortController.current.abort();
                }
                
            },10000)
            const response  = await fetch("https://localhost:7083/api/account/login", requestOptions);

            if(!response.status===200){
                throw new Error(response.statusText)
            }
            const data = await response.text()
            userLoginUpdate(data);



        } catch (error) {
            console.log(error);
        }
        
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await loginRequest()
    }
    return(
    <>
        <section className="container-login">
            <div className="login-container">
                <div className="login-container__image">
                    <img src={Image} alt="doctor"/>
                </div>
                
                <div className="login-container__box">
                    {userLoginToken===''?
                        <div className="login-container__box-content">
                        <div className="login-container__title">
                            <span>Zaloguj się</span>
                        </div>
        
                        <div className="login-container__form">
                            <form className="login-content__form" onSubmit={handleSubmit}>
                                {Inputs.map(input=>{
                                    return(<FormInput key = {input.id} {...input} value={values[input.name]} onChange={onChange}/>)
                                })}
                            <div className="login-content__form__button">
                                    <button type="submit">Zaloguj się</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="login-container__successfull">
                        <div className="login__successfull-box">
                            <div className="login__successfull-infromations"> 
                                    <div>
                                        <h2>Gratulacje</h2>
                                        <h4>Proces logowania się powiódł</h4>
                                        <Link to={'/'}>Strona głowna</Link>
                                    </div>
                            </div>
                        </div>
                    </div>   
                    }
            </div>
                
                
            </div> 
        </section>
    </>)
}


const FormInput = (props)=>{
    const {label, onChange, id, ...inputProps} = props
    return (
        <div className="login-form">
            <div className="login-form-input">
                { <div className="loign-form-input__label">
                    <label>{label}</label>
                </div>}
                
                <div className="login-form-input__input">
                    <div className="login-form-input__input">
                        <input 
                            {...inputProps}
                            onChange={onChange}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;