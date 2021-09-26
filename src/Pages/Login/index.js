import React , {useState, useEffect} from 'react'
import {  useHistory } from 'react-router-dom'
import {Col, FormGroup, Button, Label, Input, Form, Alert } from 'reactstrap'
import logoPapex from '../../img/papex.png'
import './styles.scss'
import api from '../../assets/lib/api'

export default function Login(props){
    
    const [formData, setFormData] = useState({})
    const [showMessage, setShowMessage] = useState(true)
    const [messageClass, setMessageClass] = useState("light")
    const [messageText, setMessageText] = useState(" ")    
    let history = useHistory()

    useEffect( ()=> {
      props.changeShowNavBar(false) 
    } , [] )   
    
    useEffect(() => {
      return () => {        
        if (history.action === "POP") {
          history.replace(history.location.pathname, props.changeShowNavBar(true));
        }
      };
    }, [history])

    function onInputChange(event){
        const value = event.target.value
        const name = event.target.name        
        setFormData({...formData, [name]:value})
    }

    function onRegistryClick(){
      history.push("./Registrar")
    }

    async function onContinueClick(){
        const resAuth = await api.authenticate(formData)
        if (resAuth.success){
            const token = resAuth.data.token
            const id = JSON.parse(window.atob(token.split(".")[1])).id
            const userJson = await api.getUserById(id, token)
            const userData = userJson.data
            delete userData.password
            localStorage.setItem("userData",JSON.stringify({...userData, token}))
            props.changeUserData(userData)
            displayMessage("success")   
        }else{
            displayMessage("error")
        }
    }

    function displayMessage (value)
    {
      if (value === "success"){ 
        setMessageClass("success")
        setMessageText("Ingreso existoso")
      }
      else{
        setMessageClass("danger")
        setMessageText("El correo electrónico o password son incorrectos ")
      }       
      setShowMessage(true)
      setTimeout(  () => {                     
        setMessageClass("light")
        setMessageText(".")
        if (value === "success"){
            props.changeShowNavBar(true) 
            history.push("/") 
          }
      }, 2000 )  
    }
    return(
        <Col className=" d-flex flex-column justify-content-center align-items-center vh-100 p-1 ">
                <div className="logoContainer" >
                  <img alt="logo papex" src={logoPapex} className = "logoSize"/>
                </div>                
                <div className="formContainer bg-white rounded border p-4 d-flex justify-content-center" >                    
                    <Form className="formContainerControls" >
                        <FormGroup row>
                            <Label for="email">Correo Electrónico</Label>
                            <Col >
                              <Input type="email" name="email" id="email" placeholder="someone@domain.com" onChange={onInputChange}  />
                            </Col>
                         </FormGroup>
                        <FormGroup row>
                            <Label for="password">Contraseña</Label>
                            <Col >
                              <Input type="password" name="password" id="password"  onChange={onInputChange} />
                            </Col>
                        </FormGroup>                     
                   </Form>
                </div>
                <div className="buttons-login-container">
                    <Button id= "enter" className="btn btn-p-primary" type="button" name="enter" onClick={onContinueClick}   >Ingresar</Button>
                    <Button id= "registry" className="btn btn-p-secondary" type="button" name="registry" onClick={onRegistryClick}  >Registrarse</Button>
                </div> 
                <div>
                {   showMessage &&
                        <Alert color={ messageClass } className=" d-block mt-2 " >
                            { messageText }
                        </Alert>                                         
                } 
               </div>
          </Col>
    )
}
