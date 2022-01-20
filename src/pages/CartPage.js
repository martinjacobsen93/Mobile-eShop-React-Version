import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
// import TituloPagina from '../components/TituloPagina'


const CartPage = () => {

     const {cart, removeItem, clear, isCartEmpty, total, addOne, deleteOne} = useContext(CartContext)
     const navigate = useNavigate();

    const estilos = {fontSize: 22, marginTop: 50, fontWeight: "bold"} // test linea 23

    return (
        <main className='main'>
            {/* <TituloPagina titulo={"Carrito de compras"} /> */}
            <h2 className='pt-2'>Carrito de compras</h2>
            {isCartEmpty ? "" : <h3 className='mt-5'>Resumen</h3>}
            {cart.map(i => {
                return <div key={i.id} className='productoFinalizarCompra'>
                            <p style={{color: "green", margin: "auto 0", fontWeight: "bold"}}>Producto: {i.modelo}</p>
                            <div style={{display: "flex"}}>
                                {i.stock > i.quantity && <button onClick={()=> addOne(i.id)} className='cartDetailButton cartDetailButtonAdd'>+</button>}
                                <p style={{color: "green", margin: "auto 0", fontWeight: "bold"}}>{i.quantity}</p>
                                <button onClick={()=> deleteOne(i.id)} className='cartDetailButton cartDetailButtonSub'>-</button>
                            </div>
                            <p style={{color: "green", margin: "auto 0", fontWeight: "bold"}}>Precio: ${i.precio}</p>
                            <p style={{color: "green", margin: "auto 0", fontWeight: "bold"}}>Subtotal: ${i.quantity * i.precio}</p>
                            <button onClick={()=> removeItem(i.id)} className='btn btn-danger'>Eliminar todos</button>
                       </div>
            })}
            {isCartEmpty ? <>
                            <button onClick={()=> navigate("../productos")} style={{margin: 15}} className='btn btn-primary'>Comenzar a comprar</button>
                            <p style={estilos}>En breve podrá ver su lista de compras en esta sección</p>
                           </> 
                         : 
                           <>
                            <div>
                                <p style={{color: "red", margin: "auto 0", fontWeight: "bold"}}>Total: ${total}</p>
                                <button onClick={clear} style={{margin: 15}} className='btn btn-primary'>Vaciar carrito</button>
                                <button onClick={()=> navigate("../productos")} style={{margin: 15}} className='btn btn-primary'>Seguir comprando</button>
                            </div>
                            <button className='btn btn-primary'>Finalizar compra</button>
                           </>
            }
        </main>
    )
}

export default CartPage
