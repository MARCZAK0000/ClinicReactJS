import { inputs } from "./input"
import { Suspense, useState } from "react";
import DoctorImage from './Images/doktor.png'
import './Registration.css'
function Registration (){
    const [values, setValues] = useState({
        email: "",
        password: "",
        confimPassword: "",
        firstName: "",
        lastName: "",
        pesel: "",
        birth: ""
    });

    
    const onChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value})
        
    }

    async function registrationRequest (){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                { 
                    "firstName": values.firstName,
                    "lastName": values.lastName,
                    "email": values.email,
                    "password": values.password,
                    "confirmPassword": values.confimPassword,
                    "pesel": values.pesel,
                    "dateOfBirth": values.birth,
            })          

        }
        console.log(requestOptions);
        const response  = await fetch("https://localhost:7083/api/account/register", requestOptions);
        console.log(response);
        if(!response.status===201){
            return
        }
        const data = response.json
        console.log(data);
    }


        const handleSubmit = async (e)=>{
            e.preventDefault();
            await registrationRequest();
        }
    
    return(
        
        <section className="container-registration">
            <div className="container-registration__box">
                    <div className="registration-img__box">
                        <img className="registration-img" src={DoctorImage}></img>
                    </div>
                    <div className="registration-box">
                        <div className="registration-box__container">
                            <div className="registration__content">
                                <div className="registration-content__title">
                                    <span> Stwórz konto </span>
                                </div>
                                <form className="registration-content__form" onSubmit={handleSubmit}>
                                    {inputs.map((input)=>{
                                    return(<FormInput key = {input.id} {...input} value={values[input.name]} onChange={onChange}/>) 
                                    })}
                                    
                                    <div className="registration-content__form__button">
                                        <button>Zarejestruj</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                                    
            </div>
        </section>
    )
}




const FormInput = (props)=>{
    const {label, onChange, id, ...inputProps} = props
    return (
        
        <>
            <div className="form-input">
                { <div className="form-input__label">
                    <label>{label}</label>
                </div>}
                
                <div className="form-input__input">
                    <div className="form-input__input">
                        <input 
                            {...inputProps}
                            onChange={onChange}
                        ></input>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Registration;