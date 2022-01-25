import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
// import { Formik } from 'formik';

const FormularioCompra = () => { /* FALTAN AGREGAR ESTILOS, Y HACER UN MAPEO DE LA TOTALIDAD DE LOS ITEMS EN PANTALLA */

    const {handleUserData, handleSubmit, currentPurchase, compraFinalizada, finalizarRevision, returnToCart} = useContext(CartContext)

    const {user, total, purchaseID, items} = currentPurchase;

  return (
    <>
        {compraFinalizada ? 
        
            <div className='resumeDetail'>
                <h2>Gracias por tu compra {user.nombre} {user.apellido}. La misma ya ha sido confirmada y a continuación podrás ver los detalles de la misma.</h2>
                {items.map(i => {
                    return <div className='d-flex justify-content-evenly' style={{textDecoration: "underline"}}>
                            <h4>Producto: {i.item}</h4>
                            <h4>Cant: {i.cantidad}</h4>
                            <h4>Subtotal: {i.precio * i.cantidad}</h4>
                           </div>
                })}
                <h3 style={{color: "green", marginTop: 20}}>Monto total: ${total}</h3>
                <h3>Dirección de envío: {user.direccion}</h3>
                <h4>El seguimiento de tu envío lo podrás hacer a través del siguiente tracking code: <span style={{color: "red", textDecoration: "underline"}}>{purchaseID}</span></h4>
                <button onClick={finalizarRevision} className='btn btn-success mt-3'>Finalizar Revisión</button>

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
