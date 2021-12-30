import React from 'react'
import { useNavigate } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina'

const Contacto = () => {

    let navigate = useNavigate();

    return (
        <>
            <TituloPagina titulo="Bienvenido a la sección de Contacto"/>
            <h2 className='my-5'>Página en reparación</h2>
            <button onClick={()=> navigate("/")} className='mt-3 btn btn-danger'>Ir A Home</button>
        </>
    )
}

export default Contacto
