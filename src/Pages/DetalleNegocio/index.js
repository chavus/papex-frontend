import React from "react"
import {
    useParams
} from 'react-router-dom'

export default function DetalleNegocio(){
    const { id } = useParams()
    return(
        <h1>ID del negocio: { id }</h1>
    )
}