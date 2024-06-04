import { useEffect, useRef, useState } from "react";
import { Inputs } from "./inputs";


function CreateVisit(){
    const departmentsArray = [];
    const doctorsArray = [];
    const [currentDepartment, setCurrentDepartment]=useState(null)
    const [departmentData, setDepartmentData] = useState(null)

    const [departmentArrayState, setDepartmentArrayState]=useState(departmentsArray)
    const [doctorsArrayState, setDoctorsArrayState]=useState(doctorsArray)

    const [doctorsData, setDoctorsData] = useState(null)
    const [visitValue, setVisitValue]=useState({
        dzien:'',
        godzina:''
    });
    
    const departmentRequestAbort = useRef(null)
//Fetch Doctors
    useEffect(()=>{
        const fetchDepartment = async ()=>{
            try {
            const departmentUrl = 'https://localhost:7083/api/departments'
            departmentRequestAbort.current = new AbortController();
             setTimeout(()=>{
                    departmentRequestAbort.current.abort();
            }, [5000])
            const response = await fetch(departmentUrl, {signal: departmentRequestAbort.current.signal})
            const data = await response.json();
            setDepartmentData(data);
            } 
    
    
            catch (error) {
                console.log(error);
            }
            
        }
        fetchDepartment();
    },[])

//Update departments on select
    useEffect(()=>{
        if(departmentData===null){
            return;
        }
        for (let index = 0; index < departmentData.length; index++) {
            const element = {
                id: departmentData[index].id,
                name: departmentData[index].name
            }
            
            departmentsArray.push(element)
            
        }

        setDepartmentArrayState(departmentsArray);
    },[departmentData])

//Fetch Doctors
    useEffect(()=>{
        if(currentDepartment===null || currentDepartment==='None'){
            return
        }

        let id = 1;
        for (let index = 0; index < departmentArrayState.length; index++) {
            console.log(index);
            if(currentDepartment == departmentArrayState[index].name){
                id = departmentArrayState[index].id;
                break;
            }
        }
        const fetchDoctors = async ()=>{
            try 
            {
                const doctorsUrl = `https://localhost:7083/api/departments/${id}/doctors`
                const response = await fetch(doctorsUrl);
                const data = await response.json();
                setDoctorsData(data);
            } catch (error) 
            {
                console.log(error);
            }
        }


        fetchDoctors();
    },[currentDepartment])


//Update Doctors on Select
    useEffect(()=>{
        if(doctorsData===null){
            return;
        }
        for (let index = 0; index < doctorsData.length; index++) {
            const element = {
                id: doctorsData[index].id,
                name : `${doctorsData[index].firstName} ${doctorsData[index].lastName}`
            }
            
            doctorsArray.push(element)
            console.log('xd',doctorsArray);
        }

        setDoctorsArrayState(doctorsArray);

    }, [doctorsData])


    //Update current department value from component SELECT
    const onChangeSelect = (e)=>{
        setCurrentDepartment(e.target.value)
    }


    //Update current values of components required to create visit (just like data or hours)
    const onChange = (e)=>{
        setVisitValue({...visitValue, [e.target.name]: e.target.value})
    }
    return(
    <>  

        <section className="user-create-visit">
            <div className="user-create-visit__container">
                <div className="user-create-visit__content">
                    <div className="create-visit__department">
                        <div className="create-visit__department-decide">
                            <div className="create-visit__decide-box">
                                <div className="create-visit__decide-title">
                                    <h2>Wybierz Dział</h2>
                                </div>
                                <div className="create-visit__decide-list">
                                        {

                                            departmentArrayState.length>0?
                                            <>
                                                <select onChange={onChangeSelect} className="create-visit__select">
                                                    <option>None</option>
                                                {
                                                    
                                                    departmentArrayState.map((item)=>{
                                                        return(
                                                        <>
                                                            <option key={item.id}>{item.name}</option>

                                                        </>)
                                                    })
                                                }   
                                                </select>
                                            </>
                                            :
                                            <div className="create-visit__decide-list__error">
                                                <h1>Problemy z połączeniem z serverem </h1>
                                            </div>
                                        }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="create-visit__create">
                    <div className="create-visit__create-container">
                        <div className="create-visit__create-contnet">
                            {   
                                doctorsArrayState.length>0&&
                                <div className="create-visit__choose-doctor">
                                    <div className="creat-visit__doctor-container">
                                        <div className="create-visit__doctor-list">
                                            <select className="create-visit__doctor-select">
                                                {
                                                    doctorsArrayState.map(item=>{
                                                        console.log(item);
                                                        return(<option key={item.id}>{item.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                            }

                            <div className="create-visit__create-form">
                                <form className="create-visit__form">
                                    {Inputs.map(input=>{
                                        return(<FormInput key={input.id} {...input} value={visitValue[input.name]} onChange={onChange}/>)
                                    })}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default CreateVisit;

//Inputs 
const FormInput=(props)=>{

    const {label, value, name, onChange, type} = props;

    return(
        <>
            <div className="create-visit__form-item">
                <div className="create-visit__form-label">{label}</div>
            </div>
            <div className="create-visit__form-input">
                <div className="create-visit__input">
                    <input 
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                    ></input>
                </div>
            </div>
        </>
    )
}