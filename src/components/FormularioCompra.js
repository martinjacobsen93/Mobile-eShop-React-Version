import React from 'react'
import { useState } from 'react/cjs/react.development'
import TituloPagina from './TituloPagina'

const FormularioCompra = () => {

    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        celular: ''
    })

    const handleDatos = (e) => {
        setDatos({...datos, 
                    [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(datos)
    }

    return (
        <>
            <TituloPagina titulo='Por favor completa los siguientes campos obligatorios'/>
            <form onSubmit={handleSubmit} className='mt-5 d-flex flex-column w-50 m-auto'> {/* OBSERVACION: SACAR CLASSNAME DESPUES*/}
                <label htmlFor='inputNombre'>Nombre:</label>
                <input type='text' name='nombre' id='inputNombre' placeholder='Ingrese su nombre' onChange={handleDatos} required maxLength={20}/>
                <label htmlFor='inputApellido'>Apellido:</label>
                <input type='text' name='apellido' id='inputApellido' placeholder='Ingrese su apellido' onChange={handleDatos} required maxLength={20}/>
                <label htmlFor='inputEmail'>Email:</label>
                <input type='email' name='email' id='inputEmail' placeholder='Ingrese su correo electrónico' onChange={handleDatos} required maxLength={40}/>
                <label htmlFor='inputDireccion'>Dirección de envío:</label>
                <input type='text' name='direccion' id='inputDireccion' placeholder='Ingrese su dirección' onChange={handleDatos} required/>
                <label htmlFor='inputCelular'>Número de teléfono:</label>
                <input type='text' name='celular' id='inputCelular' placeholder='Ingrese su número de teléfono' onChange={handleDatos} required/>
                <input type='submit' />
            </form>
        </>
    )
}

export default FormularioCompra
