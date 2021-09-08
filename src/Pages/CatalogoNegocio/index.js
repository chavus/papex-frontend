import React from "react"

import {
    Link
} from 'react-router-dom'

const papelerias = [
    { 
        id:1, 
        nombre: "Papeleria Patria"},
    {
        id:2,
        nombre: "Papeleria Toños"
    }
    ]


export default function CatalogoNegocio(){
    return(
      <div>
        <nav>
          <ul>
              {
                  papelerias.map(papeleria => {
                      return(
                        <li>
                        <Link to={`DetalleNegocio/${papeleria.id}`}>
                            { papeleria.nombre }</Link>
                        </li>
                      )
                  })
              }
          </ul>
        </nav>
        </div>
    )
}