
import './Team.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
function Team(){

    const states = []
    const [departmenData, setDepartmentData] = useState([])
    const [stateArray, setStateArray] = useState(states)
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch("https://localhost:7083/api/departments")
            if(!response.ok){
                console.log("Something wrong XD");
                return
            }
            const data = await response.json();
            setDepartmentData(data)
        }

    
        fetchData()
        .catch(console.error);
        

    
        
    },[])

    useEffect(()=>{
        for (let index = 0; index < departmenData.length; index++) {
            states.push({
                id:index,
                name: departmenData[index].name,
                show:false
            })
        
        }


        setStateArray(states);
        console.log('xxds',stateArray);
    },[departmenData])

    const updateStateArray = (id, value)=>{
        setStateArray(
            stateArray.map((state)=>
                state.id ===id
                    ?{...state, show: value}:
                    {...state}
            )
        )
    }

    
    return(
        <>
            <section className="team-container">
                <div className="team-container__box">
                    <div className="team__box-header">
                        <h2>Nasz zespół</h2>
                    </div>

                    <div className='team__box-cards'>
                        
                            <div className='team__cards-content'>
                                {departmenData.length>0?
                                departmenData.map((items, index)=>{
                                        return(<Card info={items} onClick={
        
                                                ()=>{
                                                    if(stateArray.length>0){
                                                        updateStateArray(index, !stateArray[index].show)
                                                    }
                                                }
                                            } arrowDirection=
                                                {stateArray.length===0
                                                    ?false
                                                    :stateArray[index].show
                                                        ?true
                                                        : false
                                                }>
                                                   {departmenData[index].listOfDoctors.map((item)=>{
                                                        return(<Doctor info={item}></Doctor>)
                                                   })}
                                                </Card>)
                                }):
                            
                            <div className='team__cards-content__fail'><div className='cards-cotnent_fail'><h2>Problem połaczenia z serwerem</h2></div></div>
                            }
                               
                            </div>
                       
                    </div>
                </div>
               
            </section>  
        </>
    )

}

export default Team;



const Card = ({info, children, onClick, arrowDirection}) =>{
    return(
        <>
            <div className='team__cards-single'>
                <div className='cards-single__container'>
                    <div className='cards-single__deprtement'>
                        <div className='cards-department__title'>
                            <span>
                                <h2>{info.name}</h2>
                            </span>
                        </div>

                        <div className='cards-single__button'>
                            <div className='cards__button-container'>
                                <button className='cards__button' onClick={onClick} >
                                    {
                                        arrowDirection? <FontAwesomeIcon className='cards__button-svg' icon={faArrowUp}/>:
                                        <FontAwesomeIcon className='cards__button-svg' icon={faArrowDown }/>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className='cards-single__doctors'>
                        <div className={arrowDirection?'cards__doctors-container visible':'cards__doctors-containe invisible'}>
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

const Doctor = ({info})=>{
    return(
    <>
        <div className="card-doctor-container">
            <div className='doctor-container__box'>
                <div className='doctor-container__information'>
                    <div className='doctor-inforamtion__title'>{info.title}</div>
                    <div className='doctor-inforamtion__Name'>
                        <span className='doctor-information__fistname'>{info.firstName}</span>
                        <span className='doctor-information__lastname'> {info.lastName}</span></div>
                </div>
                <div className='doctor-container__button'>
                    <div className='doctor-button__box'>
                        <button className='doctor-button'>Pokaż wiecej </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}


