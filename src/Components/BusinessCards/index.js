import React from 'react'
import "../../assets/global_style.scss"

function index() {
    return (
        <div>
            <h1>Cards</h1>
            <h3>Listado de Negocios cercanos</h3>

            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">PAPELERIA - PATRIA</h5>
                </div>
                <div className="card-body">
                    
                    <p className="card-text">
                    <span> Domicilio:  </span> Centro Comercial Plaza Patria Guadalajara Zona H, Av. Patria 1950, Plaza Patria, 45140 Guadalajara, Jal
                    </p>
                    <p className="card-text">
                    <span> Horario:  </span> L - S   7 a 22 hrs
                    </p>
                    

                </div>

            </div>
        </div>
    )
}

export default index
