import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../App'
import {Input,Button,Form, FormGroup, Col, Label, FormText,Row,Alert} from 'reactstrap'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {useLocation, useHistory} from 'react-router-dom'
import './styles.scss'
import api from '../../assets/lib/api'
import firebase from '../../assets/lib/fire'
import noImage from '../../img/sinimagen.png'
import { FiImage, FiTrash2, FiSave, FiXSquare } from "react-icons/fi";



function ManageProduct(props){

    const [userData] = useContext(UserContext)
    const  businessId =  userData ?  userData._id : null  
    let   [productData, setProductData] = useState({business:businessId})
    const [available, setAvailable ] = useState(true)
    const [imagePath, setImagePath] = useState(null)
    const [imageProduct, setImageProduct] = useState()
    const storage = getStorage(firebase)    
    let history = useHistory()
    let showDeleteButton = false

    const successMsg = "primary"
    const [showMessage, setShowMessage] = useState(false)
    const [messageClass, setMessageClass] = useState(successMsg)
    const [messageText, setMessageText] = useState("Artículo guardado")      
   
    const idProduct = new URLSearchParams(useLocation().search).get("idProduct")  
    idProduct ? showDeleteButton = true : showDeleteButton = false

    useEffect( () => {  
        if(userData){                    
            if (userData.rol != "Negocio") {
                history.push("/")
            }
            else { 
                    if(idProduct){ 
                        getProductByID(idProduct)   
                }
            }
        }
        else{
            history.push("/Login")
        }
    }, [])

    const handleAvailability = (event) =>{           
        setAvailable(event.target.checked)
    }

    const selectFileHandler = (event) => {         
        if (event.target.files[0]) {            
           const TmpPath = URL.createObjectURL(event.target.files[0])  
           setImagePath(TmpPath) 
           setImageProduct(event.target.files[0])                      
        }
        else {
//             setImagePath(noImage) 
//             setImageProduct( URL.createObjectURL(noImage) ) 
        }	
    }

    const onClickGoCatalog = ()=> {
        history.push("/CatalogoNegocio")
    }

    const uploadFile =  async () => {  
        const file = imageProduct 
        console.log("imageProduct", imageProduct)             
        const storageRef = ref(storage, 'papex/' + file.name)
        const snapshot = await uploadBytes(storageRef, file)
        const downloadurl = await getDownloadURL(snapshot.ref)                              
        return downloadurl 
   }   

   const getProductByID = async (idProduct)=> {    
    let result = await api.getProductById(idProduct)
    if (result.success){  
        setProductData(result.data)
        setImagePath(result.data.imageUrl)
        setAvailable(result.data.available)
    }
   }

    const onClickSaveProduct = async ()=> {

        if (imageProduct){        
            let imageUrl = await uploadFile()        
            productData.imageUrl = imageUrl 
        }
        productData.available = available  
        //Si es produto existente actualizo    
        if (idProduct){
            let result = await api.patchProductById(idProduct, productData, userData.token  )
            if (result.success){
                displayMessage(successMsg, "Artículo guardado")                
            }
            else{
                console.log(result.data)
                displayMessage("danger", result.data)  
            }
        }
        else{   //Si es produto nuevo inserto            
            let result = await api.createProduct(productData, userData.token  )
            if (result.success){
                displayMessage(successMsg, "Artículo guardado")                              
            }
            else{
                console.log(result.data)
                displayMessage("danger", result.data)  
            }
        }
    }

    const onClickDeleteProduct = async () => {
        let result = await api.deleteProductById(idProduct, userData.token  )   
        if (result.success){
            displayMessage(successMsg, "Artículo borrado") 
            //history.push("/CatalogoNegocio")
        } 
        else{
            console.log(result.data)
        }    
    }    
    
    const displayMessage = (colorClass, message) => {
        setShowMessage(true)
        setMessageText(message)
        setMessageClass(colorClass)
        setTimeout(  () => {                             
            setShowMessage(false)
            if (colorClass === successMsg) {
                 history.push("/CatalogoNegocio") 
            }
        }, 2000 ) 
    }

    
    const onChangeInputsHandlers = (event) =>  {
        const { name, value } = event.target       
        setProductData({...productData, [name]:value})
    }    

    return(
        <>
        <container>

            { // <h1 className='p-titles mt-5'>{idProduct ? "Editar" : "Agregar"} producto </h1> 
            }
           <Row className="add-product-container rounded border p-3  d-flex justify-content-column">
               <Col className="d-flex xs-12 md-12 lg-6">                
               { /**********************  DIV DE LOS DATOS  ***************************/} 
                   <diV className="image-product-description-container ">                    
                       <div className="d-flex justify-content-between actions-product" >
                           <div className ="d-flex ">
                               <label className="form-check-label " for="flexSwitchCheckDefault">Deshabilitar</label>
                               <div className="form-check form-switch "  >
                                   <Input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleAvailability} checked={available}></Input>                                   
                               </div>
                           </div>
                           { showDeleteButton && 
                               <Button className="btn btn-p-orange" onClick={onClickDeleteProduct} > Borrar <FiTrash2 />  </Button>
                           }                           
                       </div>
                       <div>
                           <Form>
                               <FormGroup row>
                                   <Label for="name" md={12}>Nombre del Producto</Label>
                                   <Col md={12}>
                                   <Input type="text" name="name" id="name" placeholder="" onChange={onChangeInputsHandlers} value = { productData? productData.name : null} />
                                   </Col>
                               </FormGroup>
                               <FormGroup row>
                                   <Label for="brand" md={12}>Marca</Label>
                                   <Col sm={12}>
                                   <Input type="text" name="brand" id="brand" placeholder="" onChange={onChangeInputsHandlers} value = { productData? productData.brand : null}/>
                                   </Col>
                               </FormGroup>

                               <div className="d-flex p-4 justify-content-between">
                                   <Col md={6}>
                                   <FormGroup>
                                       <Label for="category" className="mb-2" >Categoría</Label>
                                       <Input type="select"  name="select" id="category" name="category" onChange={onChangeInputsHandlers} value = { productData? productData.category : null}>
                                           <option>Seleccione una...</option>
                                           <option>Arte y diseño</option>
                                           <option>Articulos de escritorio</option>
                                           <option>Articulos de escritura</option>                                      
                                           <option>Libretas y cuadernos</option>                                      
                                           <option>Papel</option>                                                                             
                                       </Input>
                                   </FormGroup>
                                   </Col>

                                   <Col md={5} >
                                   <FormGroup>
                                           <Label for="price" className="mb-2" >Precio</Label>                                        
                                           <Input type="text" name="price" id="price" placeholder="" onChange={onChangeInputsHandlers}  value = { productData? productData.price : null} />                                        
                                   </FormGroup>
                                   </Col>                              
                               </div>

                               <FormGroup row>
                                   <Label for="description" md={12}>Descripción</Label>
                                   <Col md={12}>
                                   <Input type="textarea" name="text" id="description" name="description"  maxLength="200" onChange={onChangeInputsHandlers} value = { productData? productData.description : null} />
                                   </Col>
                               </FormGroup>
                           </Form>
                       </div>
                   </diV>
               </Col>   
               <Col className = "d-flex xs-12 md-12 lg-6 flex-column justify-content-between">  
                   { /**********************  DIV DE LA IMAGEN  ***************************/} 
                   <diV className="image-product-container d-flex flex-column justified-content-center">
                       <div className="image-container">  
                           <img className="image-preview" src= {`${imagePath ?  imagePath : noImage }`} id="imagepreview"  alt="image product"  />                                            
                       </div>
                        <div className="image-button"  >
                            <FormGroup className="align-button d-flex justify-content-center" >
                                <Button className="btn btn-p-primary mt-3"  > 
                                    <Label for="imageProduct">Imagen <FiImage /> </Label>
                                    <Input type="file" name="imageProduct" id="imageProduct" accept="image/*" onChange={selectFileHandler} className="hidde-Button-Image" />
                                </Button>  
                            </FormGroup>
                       </div>
                   </diV>

                   { /**********************  DIV DE LOS BOTONES ***************************/} 
                   <diV className="image-product-buttons-container d-flex justify-content-evenly mt-4 mt-md-n1  ">
                           <Button className="btn btn-p-secondary" onClick={onClickGoCatalog} > Cancelar <FiXSquare/>
                           </Button>                    
                           <Button className="btn btn-p-primary" onClick={onClickSaveProduct}> Guardar <FiSave/>
                           </Button>


                   </diV>
               </Col>       
                 
           </Row>            
           {   showMessage &&
                        <div className="d-flex justify-content-center">
                            <Alert color={ messageClass } className=" d-block mt-2 max-width-message " >
                                { messageText }
                            </Alert>                                         
                        </div>    
                } 
       </container>            
      </>

    )

}

export default ManageProduct

