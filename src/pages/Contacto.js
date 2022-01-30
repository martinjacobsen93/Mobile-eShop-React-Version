import React from 'react'
import { useNavigate } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina'

const Contacto = () => {

    let navigate = useNavigate();

    return (
        <main className='main main-contacto'>
            <TituloPagina titulo="Contacto"/>
                <h3 className='my-5'>Si tienes alguna sugerencia o quieres que te traigamos un equipo en específico puedes dejarnos tus datos y te contactaremos</h3>
                <button onClick={()=> navigate("/")} className='mt-3 botonGenerico'>Ir A Home</button>
        </main>
    )
}

export default Contacto
