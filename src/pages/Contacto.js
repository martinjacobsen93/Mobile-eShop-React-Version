import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina'
import db from '../firebase/firebase'
import { collection, addDoc } from "firebase/firestore"
import swal from 'sweetalert';
import messageImg from '../img/inboxMsg-img.svg'

const Contacto = () => {

    let navigate = useNavigate();

    const [handleContactData, setHandleContactData] = useState({})
    const [formSent, setformSent] = useState(false)

    const handleChangeContact = (e) => {
        setHandleContactData({
            ...handleContactData, [e.target.name]: e.target.value
        })
    }

    const showFormAlert = () => {
        swal({
            title: 'Solicitud enviada',
            text: 'Su consulta fué enviada con éxito',
            icon: 'success',
            button: 'Ok',
            timer: 3000
        })
    }

    useEffect(() => {
        if (formSent) {

            let formSentCounter;
            setTimeout(() => {
                navigate("/")
            }, 7000);


            return (() => {
                clearTimeout(formSentCounter)
            })
        }
    }, [formSent, navigate])
    
    const handleContactSubmit = (e) => { /* Creo función handleSubmit en la cual se trae la información recolectada en el formulario y se guarda en firebase.*/
        e.preventDefault();
        const userInformation = handleContactData;

        const questionsCollection = collection(db, 'formQuestions');
        addDoc(questionsCollection, userInformation);

        setTimeout(() => {            
            showFormAlert();
        }, 1000);

        setTimeout(() => {
            setformSent(true)
        }, 1500);
    }

    return (
        <main className='main'>
            <TituloPagina titulo="Contacto"/>
                {formSent ? 
                
                <div className='d-flex flex-column align-items-center'>
                    <h3 className='mt-5'>Muchas gracias por su interés en Mobile Imports. Un agente se pondrá en contacto con usted a la brevedad.</h3>
                    <img src={messageImg} className='contacto__img' alt='messageImg'/>
                    <button onClick={()=> navigate("/")} className='botonGenerico'>Volver A Home</button>
                </div>
                
                :
                <>
                    <h3 className='mt-5'>Si quieres que traigamos un equipo en específico puedes dejarnos tus datos y te contactaremos</h3>
                    <div className='contenedor'>
                        <form onSubmit={handleContactSubmit} className='formulario'>
                            <div>
                                <label htmlFor='nombre'>Nombre</label>
                                <input 
                                    type='text' 
                                    name="nombre" 
                                    id='nombre' 
                                    placeholder='Ingrese su nombre'
                                    required
                                    onChange={handleChangeContact}
                                />
                            </div>
                            <div>
                                <label htmlFor='email'>E-mail</label>
                                <input 
                                    type='email' 
                                    name="email" 
                                    id="email" 
                                    placeholder='correo@correo.com'
                                    required
                                    onChange={handleChangeContact}
                                />
                            </div>
                            <div>
                                <label htmlFor='telefono'>Número de contacto</label>
                                <input 
                                    type='text' 
                                    name="telefono" 
                                    id='telefono' 
                                    placeholder='Ingrese su número de teléfono (Opcional)'
                                    onChange={handleChangeContact}
                                />
                            </div>
                            <textarea 
                                name='mensaje' 
                                onChange={handleChangeContact} 
                                required 
                                maxLength={250}
                                minLength={20}
                                placeholder="Escriba su consulta aquí..."
                                className='contacto__form-TextArea'
                            />
                            <button type='submit'>Enviar</button>
                            <button className='btn-formReturn' onClick={()=> navigate("/")}>Volver a Home</button>
                        </form>
                    </div>
                </>}
        </main>
    )
}

export default Contacto
