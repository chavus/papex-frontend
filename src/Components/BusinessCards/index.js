import React from 'react'
import {
    Link,
} from "react-router-dom";
// import { FaAngleDoubleRight } from 'react-icons/fa';
// import "../../assets/global_style.scss"

function BusinessCard({key, id, businessName, address, phoneNumber}) {
    return (
        <>
            
          
        {/* <Link to={`/CatalogoNegocio/businessId=${id}`} className="business-details"> */}
        <div className="col-md-4 bc-column">
            <div className="b-card mt-4">

                <div className="b-card-body">
                   
                    <h5 className="b-card-title fw-bold">{businessName}</h5>
                    
                    <p className="b-card-text"><span>Domicilio: </span>{address}</p>
                    <p className="b-card-text"><span>Horario: </span>{phoneNumber}</p>
                    <p className="b-card-text"><span>Entrega:</span> {phoneNumber}</p>
                    <p className="b-card-text"><span>Distancia: </span>{phoneNumber}</p>
                    <div className="b-button-details">
                        <Link to={`/CatalogoNegocio/?businessId=${id}`} className="business-details">Ver Catálogo</Link>
                    </div>
                    

                
                </div>
            </div>
        </div>
        {/* </Link> */}
            

            
        </>
    )
}

export default BusinessCard
