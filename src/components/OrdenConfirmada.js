import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import ordenConfirmada from '../img/orderConfirmada.svg'
import swal from 'sweetalert';

const OrdenConfirmada = () => {

    const {currentPurchase, finalizarRevision} = useContext(CartContext)
    const {user, total, purchaseID} = currentPurchase;

    const [visible, setVisible] = useState(false)

    useEffect(()=> {
        /* Una vez confirmada la compra, se mostrará con delay una alerta de confirmación. Y luego se mostrarán los detalles de la compra en pantalla.*/
        let modalTimeOut;

        setTimeout(() => {
            swal({
                title: 'Compra realizada',
                text: 'Pedido realizado con éxito',
                icon: 'success',
                button: 'Ok',
                timer: 6000
            })
        }, 500);

        let visibleTimer;

        setTimeout(() => {
            setVisible(true)
        }, 900);

        return (() => {
            clearTimeout(visibleTimer);
            clearTimeout(modalTimeOut);
        })

    }, []);
    
    return  (
        <>
            {visible && <div className='resumeDetail'>
                <img src={ordenConfirmada} alt='orderConfirmed' className='orderConfirmed-img'/>
                <h2>Gracias por tu compra {user.nombre} {user.apellido}. La misma ya ha sido confirmada y en breve podrás ver los detalles en tu casilla de correo.</h2>
                <h3 className='resumeDetail__totalAmount'>Monto total: ${total}</h3>
                <h3>Dirección de envío: {user.direccion}</h3>
                <h4>El seguimiento de tu envío lo podrás hacer a través del siguiente tracking code: <span className='idCompra'>{purchaseID}</span></h4>
                <button onClick={finalizarRevision} className='botonGenerico'>Finalizar Revisión</button>
            </div>}
        </>
    );
};

export default OrdenConfirmada;
