import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioCompra from '../components/FormularioCompra'
import { CartContext } from '../context/CartContext'
import TituloPagina from '../components/TituloPagina'
import shoppingImage from '../img/shoppingImage.svg'


const CartPage = () => {

    const {cart, removeAll, clear, isCartEmpty, total, addOne, deleteOne, checkout, toCheckout} = useContext(CartContext)
    const navigate = useNavigate();

    return (
        <main className='main'>
            {checkout ? /* checkout indica si el usuario hizo click para confirmar la compra, caso sea true se muestra el formulario de compra, sino el carrito de compras */
            <>
            <TituloPagina titulo={"Checkout"} />
            <FormularioCompra/>
            </>
            :
            <>
            <TituloPagina titulo={"Carrito de compras"} />
            {isCartEmpty ? "" : <h3 className='cartPage__subtitle'>Resumen</h3>}
            {cart.map(i => {    /* Se muestra en pantalla todos los productos que se encuentren dentro del array cart. */
                return <div key={i.id} className='cartProductDetail'>
                            <img src={i.url} alt={`${i.modelo}`} className='cartProductDetail__img'/>
                            <p className='cartProductDetail__productName'>{i.modelo}</p>
                            <div className='cartProductDetail__counter'>
                                <button onClick={()=> deleteOne(i.id)} className='cartDetailButton cartDetailButtonSub'>-</button>
                                <p className='cartProductDetail__quantity'>{i.quantity}</p>
                                <button onClick={()=> addOne(i.id)} className='cartDetailButton cartDetailButtonAdd'>+</button>
                            </div>
                            <p className='cartProductDetail__detail cartProductDetail__price'>Precio: ${i.precio}</p>
                            <p className='cartProductDetail__detail cartProductDetail__subtotal'>Subtotal: ${i.quantity * i.precio}</p>
                            <button onClick={()=> removeAll(i.id)} className='botonGenerico3 cartProductDetail__btnEliminar'>Eliminar todos</button>
                       </div>
            })}
            {isCartEmpty ? <> {/* Si el carrito de compras está vacío se muestra en pantalla un botón para empezar a comprar*/}
                            <p className='cartPage__subtitle'>En breve podrá ver su lista de compras en esta sección</p>
                            <button onClick={()=> navigate("../productos")} style={{margin: "auto" , display: "block"}} className='botonGenerico'>Comenzar a comprar</button>
                            <img src={shoppingImage} className='cartPage__img' alt='wallet-img'/>
                           </> 
                         : /* Caso contrario se muestran los productos con sus detalles y el total de lo gastado */
                        <div className='pb-2'>
                            <div>
                                <p className='cartPage__TotalPrice'>Total: ${total}</p>
                                <button onClick={clear} style={{margin: 15}} className='botonGenerico'>Vaciar carrito</button>
                                <button onClick={()=> navigate("../productos")} style={{margin: 15}} className='botonGenerico'>Seguir comprando</button>
                            </div>
                            <button className='botonGenerico' onClick={toCheckout}>Checkout</button>
                        </div>
            }
            </>}
        </main>
    )
}

export default CartPage
