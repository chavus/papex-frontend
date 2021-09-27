import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import './styles.scss'

const UserRegister = () => {

    const [business, setBusiness] = useState(false);
    const [user, setUser] = useState({rol: 'Cliente'})
    const [days, setDays] = useState({monday:true, tuesday:true, wednesday:true, thursday:true, friday:true, saturday:true, sunday:true})
    const [schedule, setSchedule] = useState([])

    const userDataHandler = event => {
        const {name, value} = event.target
        setUser({...user,[name]:value})
        console.log(user)
    }

    const toggle = (event) => {
        setBusiness(!business)
        const rol =  !business ?  'Negocio' :  'Cliente'
        setUser({...user,[event.target.name]:rol})
    }  
    
    const disableHandler = event => {
        const {value} = event.target
        setDays({...days,[value]:!days[value]}) 
        let existDay = schedule.findIndex((item) =>  item.day == event.target.value )       
        if (existDay !== -1) {
        let scheduleTemp = [...schedule]
        scheduleTemp.splice(existDay, 1)
        setSchedule( scheduleTemp )
        }
    }
    
    const dayDataHandler = event => {
        const {name, value} = event.target
        const dayschedule = {day: event.target.dataset.day, [name]:value}        
        let existDay = schedule.findIndex((item) =>  item.day == event.target.dataset.day   )  
        let scheduleTemp = [...schedule]        
        if (existDay === -1){           
            scheduleTemp = [...scheduleTemp, dayschedule]
            setSchedule(scheduleTemp)        
        } else { 
           let day = schedule[existDay]           
           day = {...day,[name]:value}                      
           scheduleTemp[existDay] = day 
           setSchedule( scheduleTemp )
        }
    }

    const onSubmit = event => {
        setUser(...user,[schedule])
        console.log(user)
    }

   
  return (
      <Col xs='12' md='4' className='container-form'>
        <h1 className='p-titles mt-2'>Registro{business &&' de negocio'}</h1>
       <div className='form-div'>
       <Form className='rounded border p-4'>
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
      {
          business &&
          <>
            <FormGroup>
                <Label>Nombre de negocio</Label>
                <Input name="businessName" onChange={userDataHandler}/>
            </FormGroup>
            <div className='business-schedules'>
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
               
            </div>
           
            <FormGroup>
                <Label >Clabe interbancaria</Label>
                <Input name="bankAccount" onChange={userDataHandler}/>
            </FormGroup>
         </>
        }
            <div className='business-div'>
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" name='rol' onClick={toggle} />{' '}
                    Registrarme como negocio
                    </Label>
                </FormGroup>
                <Button className='btn-p-primary' onClick={onSubmit}>Registrarse</Button>
            </div>
      
    </Form>
       </div> 
      
    </Col>
    
  );
}

export default UserRegister;