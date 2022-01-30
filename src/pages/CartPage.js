import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioCompra from '../components/FormularioCompra'
import { CartContext } from '../context/CartContext'
import TituloPagina from '../components/TituloPagina'
import shoppingImage from '../img/shoppingImage.svg'


const CartPage = () => {

    const {cart, removeItem, clear, isCartEmpty, total, addOne, deleteOne, checkout, toCheckout} = useContext(CartContext)
    const navigate = useNavigate();

    return (
        <main className='main'>
            {checkout ? 
            <>
            <TituloPagina titulo={"Checkout"} />
            <FormularioCompra/>
            </>
            :
            <>
            <TituloPagina titulo={"Carrito de compras"} />
            {isCartEmpty ? "" : <h3 className='mt-5'>Resumen</h3>}
            {cart.map(i => {
                return <div key={i.id} className='cartProductDetail'>
                            <p style={{color: "green", margin: "auto 0", fontWeight: "bold"}}>Producto: {i.modelo}</p>
                            <div className='cartProductDetail__counter'>
                                <button onClick={()=> addOne(i.id)} className='cartDetailButton cartDetailButtonAdd'>+</button>
                                <p className='cartProductDetail__quantity'>{i.quantity}</p>
                                <button onClick={()=> deleteOne(i.id)} className='cartDetailButton cartDetailButtonSub'>-</button>
                            </div>
                            <p className='cartProductDetail__detail'>Precio: ${i.precio}</p>
                            <p className='cartProductDetail__detail'>Subtotal: ${i.quantity * i.precio}</p>
                            <button onClick={()=> removeItem(i.id)} className='btn btn-danger'>Eliminar todos</button>
                       </div>
            })}
            {isCartEmpty ? <>
                            <p className='cartPage__subtitle'>En breve podrá ver su lista de compras en esta sección</p>
                            <button onClick={()=> navigate("../productos")} style={{margin: "auto" , display: "block"}} className='botonGenerico'>Comenzar a comprar</button>
                            <img src={shoppingImage} className='cartPage__img' alt='wallet-img'/>
                           </> 
                         : 
                           <>
                            <div>
                                <p className='cartPage__TotalPrice'>Total: ${total}</p>
                                <button onClick={clear} style={{margin: 15}} className='btn btn-primary'>Vaciar carrito</button>
                                <button onClick={()=> navigate("../productos")} style={{margin: 15}} className='btn btn-primary'>Seguir comprando</button>
                            </div>
                            <button className='btn btn-primary' onClick={toCheckout}>Checkout</button>
                           </>
            }
            </>}
        </main>
    )
}

export default CartPage
