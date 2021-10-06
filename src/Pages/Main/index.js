import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { GiAlarmClock } from 'react-icons/gi';
import { FiArrowRight } from 'react-icons/fi'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
// import Search from  '../../Pages/Busqueda'
import api from '../../assets/lib/api'
import PapexSpinner from '../../Components/PapexSpinner'
import "./styles.scss"


function Main() {

    const [userData] = useContext(UserContext)
    const [negocios, setNegocios] = useState(null)
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);

    useEffect( async()=> {
        if (userData){
            // setLoading(true)
            console.log('yes, you are logged in as', userData.name)
            console.log('this is your id', userData._id)
            // como el usuario está loggeado, enviarle el id al metodo getNearBusinesses
            const by = "userId"
            const dataUsr = "614e63be9a04e268f1eb7cc1"
            // const dataUsr = userData._id
            const radius = 3
            
            const arrayBusiness = await api.getNearBusiness(by, dataUsr, radius)
            console.log("si fui a buscar negocios cercanos: ", arrayBusiness)
            setNegocios(arrayBusiness)
            // const dataB = nearBusiness.map( (item)=>{
            //     console.log("estos son los negocios cercanos: " , item.businessName)
            // })
            // setLoading(false)
            
        }else{
         
            navigator.geolocation.getCurrentPosition(
                async(position) => {
                    console.log("Position: ", position.coords.latitude, position.coords.longitude)
                    const by = "userCoord"
                    // const dataUsr = "20.643295,-103.423268"
                    const dataUsr = `${position.coords.latitude},${position.coords.longitude}`
                    const radius = 3
                    
                    const arrayBusiness = await api.getNearBusiness(by, dataUsr, radius)
                    console.log("si fui a buscar negocios cercanos: ", arrayBusiness)
                    setNegocios(arrayBusiness)
                })
        }
      
        
    },[])

    const dia =  (day) => {
        let diaEspanol
        switch (day) {

            case "monday": diaEspanol= "Lunes"
            break;
            case "tuesday": diaEspanol= "Martes"
            break;
            case "wednesday": diaEspanol= "Miércoles"
            break;
            case "thursday": diaEspanol= "Jueves"
            break;
            case "friday": diaEspanol= "Viernes"
            break;
            case "saturday": diaEspanol= "Sábado"
            break;
            case "sunday": diaEspanol= "Domingo"
            break;

        }
        return diaEspanol
    }

    return (
        <div className="App">
            <div className="container-fluid border border-success">
                <div className="row">
                    <div className="col-12 main-title p-titles">
                        <h1>Inicio</h1>
                    </div>
                </div>
                
                {/* <Search/> */}
                <div className="row">
                    {!negocios && <PapexSpinner text="Buscando negocios cercanos..."/>}
                    {negocios && negocios.map((negocio) =>{
                        console.log("la información de los negocios: ", negocio._id)
                        return(
                        <div className="b-container col-12 col-md-4 mb-4">
                            <div className="card p-card-borders">
                                <div className="card-body">
                                    <div className="card-title p-titles">{negocio.businessName}</div>
                                    <div className="card-text">
                                        <p><span>Domicilio: </span> {negocio.address}</p>
                                        {/* <p><span>Conoce el horario de servicio < FiArrowRight/> <GiAlarmClock className="pop-button" id="Popover1"/> </span>
                                             {negocio.schedule ? negocio.schedule.map( (horario) => {
                                                // console.log("Esta es la info del horario: ", horario.day)
                                                return(
                                                    <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                                                        <PopoverHeader>Horarios de Negocio</PopoverHeader>
                                                        <PopoverBody>{dia(horario.day)} : De las {horario.openTime} a las {horario.closeTime}</PopoverBody>
                                                    </Popover>
                                                    // <p className="b-schedule">{dia(horario.day)} : De las {horario.openTime} a las {horario.closeTime}</p>
                                                )
                                                //  (<p>si entre al map </p>)
                                             }) : (<p>No hay horarios establecidos por el negocio</p>)} 
                                                 
                                        </p> */}
                                        <p><span>Entrega: </span> {negocio.deliveryMethod.length > 1 ? `${negocio.deliveryMethod[0]} / ${negocio.deliveryMethod[1]}` : negocio.deliveryMethod }</p>
                                        <p><span>Distancia: </span>{negocio.dist / 1000} km</p>

                                        <p><span>Conoce el horario de servicio < FiArrowRight/> <GiAlarmClock className="pop-button" id={`popover${negocio._id}`}/> </span></p>
                                        <Popover placement="bottom" isOpen={popoverOpen} target={`popover${negocio._id}`} toggle={toggle}>
                                                    <PopoverHeader>Horarios de Negocio</PopoverHeader>
                                                        <PopoverBody>
                                                            {/* {dia(horario.day)} : De las {horario.openTime} a las {horario.closeTime} */}
                                                            {negocio.schedule ? negocio.schedule.map( (horario) => {
                                                                // console.log("Esta es la info del horario: ", horario.day)
                                                                return(
                                                                    
                                                                    <p className="b-schedule">{dia(horario.day)} : De las {horario.openTime} a las {horario.closeTime}</p>
                                                                )
                                                                //  (<p>si entre al map </p>)
                                                            }) : (<p>No hay horarios establecidos por el negocio</p>)}
                                                        </PopoverBody>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </div>)

                    })

                    }
                        
                </div>
            </div>
        </div>
    )
    }
export default Main
