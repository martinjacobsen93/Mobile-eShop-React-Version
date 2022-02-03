import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import OrdenConfirmada from './OrdenConfirmada';
// import { Formik } from 'formik';

const FormularioCompra = () => { /* FALTAN AGREGAR ESTILOS, Y HACER UN MAPEO DE LA TOTALIDAD DE LOS ITEMS EN PANTALLA */

    const {handleUserData, handleSubmit, compraFinalizada, returnToCart} = useContext(CartContext)

  return (
    <>
        {compraFinalizada ? <OrdenConfirmada />
        
            : 
        <div className='contenedor'>
            <form onSubmit={handleSubmit} className='formulario'>
                <div>
                    <label htmlFor='nombre'>Nombre</label>
                    <input type="text" id="nombre" name='nombre' placeholder='Ingrese su nombre' onChange={handleUserData} required/>
                </div>
                <div>
                    <label htmlFor='apellido'>Apellido</label>
                    <input type="text" id="apellido" name='apellido' placeholder='Ingrese su apellido' onChange={handleUserData} required/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" name='email' placeholder='correo@correo.com' onChange={handleUserData} required/>
                </div>
                <div>
                    <label htmlFor='direccion'>Dirección de envío</label>
                    <input type="text" id="direccion" name='direccion' placeholder='Dirección' onChange={handleUserData} required/>
                </div>
                <button type='submit'>Finalizar Compra</button>
                <button onClick={returnToCart} className='btn-formReturn'>Volver atrás</button>
            </form>
        </div>}
    </>
  );
};

export default FormularioCompra;
