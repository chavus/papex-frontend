import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import './styles.scss'
import api from '../../assets/lib/api'
import {useHistory} from 'react-router-dom'

const UserRegister = () => {

    const [business, setBusiness] = useState(false);
    let [user, setUser] = useState({rol: 'Cliente'})
    const [days, setDays] = useState({monday:true, tuesday:true, wednesday:true, thursday:true, friday:true, saturday:true, sunday:true})
    const [scheduleArray, setSchedule] = useState([])
    const [deliveryHome, setDeliveryHome] = useState(false);
    const [deliveryPickup, setDeliveryPickUp] = useState(false);
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")
    
    let history = useHistory()
    

    const userDataHandler = event => {
        const {name, value} = event.target
        setUser({...user,[name]:value})
        //console.log(user)
    }

    const toggle = (event) => {
        setBusiness(!business)
        const rol =  !business ?  'Negocio' :  'Cliente'
        setUser({...user,[event.target.name]:rol})
    }  
    
    const disableHandler = event => {
        const {value} = event.target
        setDays({...days,[value]:!days[value]}) 
        let positionDay = scheduleArray.findIndex((item) =>  item.day == event.target.value   )       
        if (positionDay !== -1) {
            let scheduleTemp = [...scheduleArray]
            scheduleTemp.splice(positionDay, 1)
            setSchedule( scheduleTemp )
        }
    }

    const checkDeliveryHandler = event => {
            const {name, value}  = event.target           
            if (name == 'deliveryHome'){                
                setDeliveryHome(!deliveryHome)                
            }
            else {
                setDeliveryPickUp(!deliveryPickup)
                
            }            
    }
    
    const dayDataHandler = event => {
        const {name, value} = event.target
        const dayschedule = {day: event.target.dataset.day, [name]:value}        
        let positionDay = scheduleArray.findIndex((item) =>  item.day == event.target.dataset.day   )  
        let scheduleTemp = [...scheduleArray]  

        if (positionDay === -1){           
            scheduleTemp = [...scheduleTemp, dayschedule]
            setSchedule(scheduleTemp)                    
        } else { 
           let day = scheduleArray[positionDay]           
           day = {...day,[name]:value} 
           scheduleTemp[positionDay] = day 
           setSchedule( scheduleTemp )
        }
    }

    const onSubmit = async () => {

        let deliveryArray = []

        if (user.rol == "Negocio") {
            deliveryHome && deliveryArray.push('Delivery') 
            deliveryPickup && deliveryArray.push('Pickup')             
            user = {...user, schedule: scheduleArray, deliveryMethod : deliveryArray }

        }else {
            delete user.businessName
            delete user.schedule
            delete user.bankAccount
            delete user.deliveryMethod

        }
        
        //console.log(user)
        let res = await api.createUser(user)
        console.log(res)
        if (res.success){
           // history.push("./Login")
        }
        else{
                setMessage(res)
                setShowMessage(true)
                setTimeout(  () => {                     
                    setShowMessage(false)                   
                      }, 4000 ) 
        }
        
    }

   
  return (
      <Col xs='12' md='4' className='container-form'>
        <h1 className='p-titles mt-2'>Registro{business &&' de negocio'}</h1>
       <div className='form-div'>
       <Form className='rounded border p-3'>
           <div className='customer-schedules p-1'>
                <FormGroup>
                    <Label>Nombre</Label>
                    <Input name="name" onChange={userDataHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label>Apellidos</Label>
                    <Input name="lastName" onChange={userDataHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label>Correo</Label>
                    <Input name="email" onChange={userDataHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label>Contraseña</Label>
                    <Input type='password' name="password" onChange={userDataHandler} />
                </FormGroup>
                <FormGroup>
                    <Label>Teléfono</Label>
                    <Input name="phoneNumber" onChange={userDataHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label>Domicilio</Label>
                    <Input name="address" onChange={userDataHandler}/>
                </FormGroup>
                <div className='business-div'>
                <FormGroup check className='p-2'>
                    <Label check>
                    <Input type="checkbox" name='rol' onClick={toggle} />{' '}
                    Registrarme como negocio
                    </Label>
                </FormGroup>
                <Button className='btn-p-primary' onClick={onSubmit}>Registrarse</Button>
            </div>
            </div>

      {
          business &&
        <>
          <div className='business-schedules p-1'>
                <FormGroup>
                    <Label>Nombre de negocio</Label>
                    <Input name="businessName" onChange={userDataHandler}/>
                </FormGroup>
                
                    <div className='days'>
                        <FormGroup check>
                            <Label check>Lun</Label>
                            <Input name="day" type='checkbox' onChange={disableHandler } value='monday' />
                        </FormGroup>
                        <div className='open-close'>
                            <FormGroup>
                                <Input name="openTime" type='time' onChange={dayDataHandler} disabled={days.monday} data-day='monday'/>
                            </FormGroup>
                            <FormGroup>
                                <Input name="closeTime" type='time' onChange={dayDataHandler} disabled={days.monday} data-day='monday'/>
                            </FormGroup>
                        </div> 
                    </div>
                    <div className='days'>
                        <FormGroup check>
                            <Label check>Mar</Label>
                            <Input name="day" type='checkbox'onChange={disableHandler} value='tuesday'/>
                        </FormGroup>
                        <div className='open-close'>
                            <FormGroup>
                                <Input name="openTime" type='time' onChange={dayDataHandler} disabled={days.tuesday} data-day='tuesday'/>
                            </FormGroup>
                            <FormGroup>
                                <Input name="closeTime" type='time' onChange={dayDataHandler} disabled={days.tuesday} data-day='tuesday' />
                            </FormGroup>
                        </div> 
                    </div>
                    <div className='days'>
                        <FormGroup check>
                            <Label check>Mie</Label>
                            <Input name="day" type='checkbox'onChange={disableHandler} value='wednesday' />
                        </FormGroup>
                        <div className='open-close'>
                            <FormGroup>
                                <Input name="openTime" type='time' onChange={dayDataHandler} disabled={days.wednesday} data-day='wednesday'/>
                            </FormGroup>
                            <FormGroup>
                                <Input name="closeTime" type='time' onChange={dayDataHandler} disabled={days.wednesday} data-day='wednesday'/>
                            </FormGroup>
                        </div> 
                    </div>
                    <div className='days'>
                        <FormGroup check>
                            <Label check>Jue</Label>
                            <Input name="day" type='checkbox'onChange={disableHandler} value='thursday' />
                        </FormGroup>
                        <div className='open-close'>
                            <FormGroup>
                                <Input name="openTime" type='time' onChange={dayDataHandler} disabled={days.thursday} data-day='thursday' />
                            </FormGroup>
                            <FormGroup>
                                <Input name="closeTime" type='time' onChange={dayDataHandler} disabled={days.thursday} data-day='thursday'/>
                            </FormGroup>
                        </div> 
                    </div>
                    <div className='days'>
                        <FormGroup check>
                            <Label check>Vie</Label>
                            <Input name="day" type='checkbox'onChange={disableHandler} value='friday' />
                        </FormGroup>
                        <div className='open-close'>
                            <FormGroup>
                                <Input name="openTime" type='time' onChange={dayDataHandler} disabled={days.friday} data-day='friday'/>
                            </FormGroup>
                            <FormGroup>
                                <Input name="closeTime" type='time' onChange={dayDataHandler} disabled={days.friday} data-day='friday'/>
                            </FormGroup>
                        </div> 
                    </div>
                    <div className='days'>
                        <FormGroup check>
                            <Label check>Sab</Label>
                            <Input name="day" type='checkbox'onChange={disableHandler} value='saturday'/>
                        </FormGroup>
                        <div className='open-close'>
                            <FormGroup>
                                <Input name="openTime" type='time' onChange={dayDataHandler} disabled={days.saturday} data-day='saturday'/>
                            </FormGroup>
                            <FormGroup>
                                <Input name="closeTime" type='time' onChange={dayDataHandler} disabled={days.saturday} data-day='saturday'/>
                            </FormGroup>
                        </div> 
                    </div>
                    <div className='days'>
                        <FormGroup check>
                            <Label check>Dom</Label>
                            <Input name="day" type='checkbox'onChange={disableHandler} value='sunday' />
                        </FormGroup>
                        <div className='open-close'>
                            <FormGroup>
                                <Input name="openTime" type='time' onChange={dayDataHandler} disabled={days.sunday} data-day='sunday' />
                            </FormGroup>
                            <FormGroup>
                                <Input name="closeTime" type='time' onChange={dayDataHandler} disabled={days.sunday} data-day='sunday'/>
                            </FormGroup>
                        </div> 
                    </div>

                <FormGroup>
                    <Label >Clabe interbancaria</Label>
                    <Input name="bankAccount" onChange={userDataHandler}/>
                </FormGroup>

                <div className="delivery">
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" name="deliveryHome" onChange={checkDeliveryHandler} />{' '}
                    A domicilio
                    </Label>
                </FormGroup>                
                <FormGroup>
                    <Label check>
                    <Input type="checkbox" name="deliveryPickup" onChange={checkDeliveryHandler}/>{' '}
                    En tienda
                    </Label>
                </FormGroup>

                </div> 
           </div>   
         </>
        }
           
            {   showMessage &&
                        <Alert color="danger" className="d-block mt-2 " >
                            Hubo un error al registrar usuario: { message }
                        </Alert>                                         
                } 
      
    </Form>
       </div> 
      
    </Col>
    
  );
}

export default UserRegister;