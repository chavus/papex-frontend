import React , {useState, useEffect, useContext} from 'react'
import {  useHistory } from 'react-router-dom'
import {Col, FormGroup, Button, Label, Input, Form, Alert } from 'reactstrap'
import logoPapex from '../../img/papex.png'
import './styles.scss'
import api from '../../assets/lib/api'
import { UserContext } from '../../App'
import { FiLogIn,  FiEdit2 }  from "react-icons/fi";
import { Link } from 'react-router-dom'

export default function Login(props){
    
    const [userData, changeUserData] = useContext(UserContext)
    const [formData, setFormData] = useState({})
    const [showMessage, setShowMessage] = useState(true)
    const [messageClass, setMessageClass] = useState("$light-gray")
    const [messageText, setMessageText] = useState(" ")    
    const successMsg = "primary"
    let history = useHistory()

    function onInputChange(event){
        const value = event.target.value
        const name = event.target.name        
        setFormData({...formData, [name]:value})
    }

    function onRegistryClick(){
      history.push("./Registro")
    }

    async function onContinueClick(){
        const resAuth = await api.authenticate(formData)
        if (resAuth.success){
            const token = resAuth.data.token
            const id = JSON.parse(window.atob(token.split(".")[1])).id
            const userJson = await api.getUserById(id, token)
            const userDataObject = userJson.data
            delete userDataObject.password
            changeUserData({...userDataObject, token})
            displayMessage(successMsg, userDataObject.rol)   
        }else{
            displayMessage("error")
        }
    }

    function displayMessage (value, rol)
    {
      if (value === successMsg){ 
        setMessageClass(successMsg)
        setMessageText("Ingreso exitoso")
      }
      else{
        setMessageClass("danger")
        setMessageText("El correo electrónico o contraseña son incorrectos ")
      }       
      setShowMessage(true)
      setTimeout(  () => {                     
        setMessageClass("$light-gray")
        setMessageText(" ")
        if (value === successMsg){
          if (rol == "Cliente"){
            history.push("/") 
          }else{
            history.push("/CatalogoNegocio") 
          }
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
                    <Button id= "enter" className="btn btn-p-primary" type="button" name="enter" onClick={onContinueClick}   >Ingresar <FiLogIn/> </Button>
                    <Button id= "registry" className="btn btn-p-secondary" type="button" name="registry" onClick={onRegistryClick}  >Registro <FiEdit2/> </Button>
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
