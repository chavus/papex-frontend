import React, {useState, useEffect, useContext} from 'react'
import {Input,Button,Form, FormGroup, Col, Label, FormText,Row} from 'reactstrap'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {useParams, useHistory} from 'react-router-dom'
import './styles.scss'
import api from '../../assets/lib/api'
import firebase from '../../assets/lib/fire'


function AddProduct(){

    let history = useHistory()
    //const [userData] = useContext(UserData)
    const  businessId = useParams().businessId
    const [ diponible, setDisponible ] = useState(false)
    const [ imagePath, setImagePath] = useState()
    const [ imageProduct, setImageProduct] = useState()
    let [ productData, setProductData] = useState({business:businessId})
    const storage = getStorage(firebase)


    useEffect( () => {  
    } , [] )

    const handleAvailability = (event) =>{        
        setDisponible(!diponible)
    }

    const selectFileHandler = (event) => {   
        console.log(event) 
        if (event.target.files[0]) {            
           const TmpPath = URL.createObjectURL(event.target.files[0])  
           setImagePath(TmpPath) 
           setImageProduct(event.target.files[0])                      
        }
        else {
           //buttonResetHandler()
        }	
    }


    const onClickGoCatalog = ()=> {
        history.push("/CatalogoNegocio")
    }

    const uploadFile =  async () => {  
        const file = imageProduct              
        const storageRef = ref(storage, 'papex/' + file.name)
        const snapshot = await uploadBytes(storageRef, file)
        const downloadurl = await getDownloadURL(snapshot.ref)                              
        return downloadurl 
   }   


    const onClickSaveProduct = async ()=> {
        let imageURL = await uploadFile()        
        productData.imageURL = imageURL            
        //let result = await api.createPost(productData, userData.token  )
        history.push("/CatalogoNegocio")
    }

    const onChangeInputsHandlers = (event) =>  {
        const { name, value } = event.target       
        setProductData({...productData, [name]:value})
       
    }    

    return(
        <>
            <h1>uno</h1>
            <h1>dos</h1>
            <div className="add-product-container ">
            { /**********************  DIV DE LOS DATOS  ***************************/} 
                <diV className="image-product-description-container ">                    
                    <div className="d-flex justify-content-between" >
                        <div className="form-check form-switch"  >
                            <Input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleAvailability}></Input>
                            <label className="form-check-label" for="flexSwitchCheckDefault">Disponible</label>
                        </div>
                        <Button className="btn btn-p-orange"> Borrar  </Button>
                    </div>
                    <div>
                        <Form>
                            <FormGroup row>
                                <Label for="name" md={12}>Nombre del Producto</Label>
                                <Col md={12}>
                                <Input type="text" name="name" id="name" placeholder="" onChange={onChangeInputsHandlers} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="brand" md={12}>Marca</Label>
                                <Col sm={12}>
                                <Input type="text" name="brand" id="brand" placeholder="" onChange={onChangeInputsHandlers}/>
                                </Col>
                            </FormGroup>

                            <Row form className="d-flex">
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="category" >Categoría</Label>
                                    <Input type="select" name="select" id="category" name="category" onChange={onChangeInputsHandlers}>
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
                                        <Label for="price" >Precio</Label>                                        
                                        <Input type="text" name="price" id="price" placeholder="" onChange={onChangeInputsHandlers} />                                        
                                </FormGroup>
                                </Col>                              
                            </Row>

                            <FormGroup row>
                                <Label for="description" md={12}>Descripción</Label>
                                <Col md={12}>
                                <Input type="textarea" name="text" id="description" name="description"  onChange={onChangeInputsHandlers} />
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </diV>

                { /**********************  DIV DE LA IMAGEN  ***************************/} 
                <diV className="image-product-container d-flex">
                    <div className="image-container">           
                          <img className="image-preview" src= {`${imagePath}`} id="imagepreview"  width="300" height="300" alt="image product"  />                                            
                    </div>
                    <FormGroup >
                        <Button className="btn btn-p-primary" >    
                            <Input type="file" name="imageProduct" id="imageProduct" accept="image/*" onChange={selectFileHandler} className="hidde-Button-Image" />
                            <Label for="imageProduct">Imagen </Label>
                        </Button>  
                    </FormGroup>
                </diV>

                { /**********************  DIV DE LOS BOTONES ***************************/} 
                <diV className="image-product-buttons-container">
                        <Button className="btn btn-p-secondary" onClick={onClickGoCatalog} > Cancelar
                        </Button>                    
                        <Button className="btn btn-p-primary" onClick={onClickSaveProduct}> Guardar
                        </Button>


                </diV>
            </div>    
       </>
    )

}

export default AddProduct