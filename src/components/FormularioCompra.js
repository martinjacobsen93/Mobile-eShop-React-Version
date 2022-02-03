import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ordenConfirmada from '../img/orderConfirmada.svg'
// import { Formik } from 'formik';

const FormularioCompra = () => { /* FALTAN AGREGAR ESTILOS, Y HACER UN MAPEO DE LA TOTALIDAD DE LOS ITEMS EN PANTALLA */

    const {handleUserData, handleSubmit, currentPurchase, compraFinalizada, finalizarRevision, returnToCart} = useContext(CartContext)

    const {user, total, purchaseID} = currentPurchase;

  return (
    <>
        {compraFinalizada ? 
        
            <div className='resumeDetail'>
                <img src={ordenConfirmada} alt='orderConfirmed' className='orderConfirmed-img'/>
                <h2>Gracias por tu compra {user.nombre} {user.apellido}. La misma ya ha sido confirmada y a continuación podrás ver los detalles.</h2>
                <h3 className='resumeDetail__totalAmount'>Monto total: ${total}</h3>
                <h3>Dirección de envío: {user.direccion}</h3>
                <h4>El seguimiento de tu envío lo podrás hacer a través del siguiente tracking code: <span style={{color: "red", textDecoration: "underline"}}>{purchaseID}</span></h4>
                <button onClick={finalizarRevision} className='botonGenerico'>Finalizar Revisión</button>

            </div> 
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
