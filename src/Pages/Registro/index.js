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
    }
    
    const dayDataHandler = event => {
        const {name, value} = event.target
        const dayschedule = {day: event.target.dataset.day, [name]:value}

        let position = -1

        let existDay = schedule.filter((item, index) => {
            position = index
            return item.day == event.target.dataset.day
        
        })

         console.log(position)
        if (existDay.length == 0){
            setSchedule([...schedule,dayschedule])
        } else { 
           let day = existDay[0]
           let scheduleTemp = [...schedule]
           day = {...day,[name]:value}
           scheduleTemp = [...scheduleTemp, scheduleTemp[position]=day]
           setSchedule( scheduleTemp )
        }
    
        // console.log('this is the event ',event)
        // console.log('this is the day', event.target.dataset.day)
        // setSchedule([...schedule,dayschedule])
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
                            <Input name="openTime" type='time' onChange={userDataHandler} disabled={days.tuesday}/>
                        </FormGroup>
                        <FormGroup>
                            <Input name="closeTime" type='time' onChange={userDataHandler} disabled={days.tuesday}/>
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
                            <Input name="openTime" type='time' onChange={userDataHandler} disabled={days.wednesday}/>
                        </FormGroup>
                        <FormGroup>
                            <Input name="closeTime" type='time' onChange={userDataHandler} disabled={days.wednesday}/>
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
                            <Input name="openTime" type='time' onChange={userDataHandler} disabled={days.thursday}/>
                        </FormGroup>
                        <FormGroup>
                            <Input name="closeTime" type='time' onChange={userDataHandler} disabled={days.thursday}/>
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
                            <Input name="openTime" type='time' onChange={userDataHandler} disabled={days.friday}/>
                        </FormGroup>
                        <FormGroup>
                            <Input name="closeTime" type='time' onChange={userDataHandler} disabled={days.friday}/>
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
                            <Input name="openTime" type='time' onChange={userDataHandler} disabled={days.saturday}/>
                        </FormGroup>
                        <FormGroup>
                            <Input name="closeTime" type='time' onChange={userDataHandler} disabled={days.saturday}/>
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
                            <Input name="openTime" type='time' onChange={userDataHandler} disabled={days.sunday}/>
                        </FormGroup>
                        <FormGroup>
                            <Input name="closeTime" type='time' onChange={userDataHandler} disabled={days.sunday}/>
                        </FormGroup>
                    </div> 
                </div>
               
            </div>
           
            <FormGroup>
                <Label >Clabe interbancaria</Label>
                <Input name=" bankAccount" onChange={userDataHandler}/>
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
                <Button className='btn-p-primary'>Registrarse</Button>
            </div>
      
    </Form>
       </div> 
      
    </Col>
    
  );
}

export default UserRegister;