import React, { useState, useContext} from 'react'
import { CartContext } from '../context/CartContext'

const ItemCount = ({stock, initial, onAdd, itemID}) => {

    const { cart } = useContext(CartContext);
    const itemInCart = cart.find(e => e.id === itemID);

    const [count, setCount] = useState(stock > 0 ? initial : 0)

    const sumarCantidad = () => {  
        /* Se crea función que al hacer click en sumar contador, suma en 1 si el counter es menor que el stock del item dado */
        if (count < stock) {
            setCount(count + 1)
        }
    }
    const restarCantidad = () => {  
        /* Se crea función que al hacer click en restar contador, el contador baja en 1 sólo si el counter es mayor que 0 */
        if (stock > 0 && count >= 1) {
            setCount(count - 1)
        }
    }
    const addToCart = () => { 
        // Se crea función que al hacer click en "sumar al carrito", se agrega al carrito el item con la cantidad seleccionada sólo cuando la misma sea mayor a 0.
        if (count > 0) {
            onAdd(count)
        }
    }

    const remainingStockAvailableDesc = () => {
        /* Creo una función que retorna un diálogo en rojo según el stock disponible que haya del item seleccionado.
            Ej: Si el stock del item es de 5, y se seleccionaron 4, cuando yo quiera agregar nuevamente más de 1, me aparecera el segundo mensaje.*/
        const mensajeAMostrar = text => {
            return <p className="contador__remainingStock">{text}</p>
        }
        if (itemInCart && itemInCart.quantity === itemInCart.stock && count !== 0) {
            return mensajeAMostrar('No puedes agregar más cantidad de este producto al carrito')
        }
        else if (itemInCart && (itemInCart.quantity + count > itemInCart.stock) && itemInCart.quantity < itemInCart.stock) {
            return mensajeAMostrar(`Sólo puedes agregar ${itemInCart.stock - itemInCart.quantity} items más al carrito`)
        }
    }

    return (
        <div className='contador__containerGrande'>
            {remainingStockAvailableDesc()}
            <p className='item__detail'>Stock: {stock}</p>
            <div className='contador__container' style={{backgroundColor: "white"}}>
                <button onClick={restarCantidad} className='contador__boton botonRestar'>
                    -
                </button>
                <p className='contador__numero'>{count}</p>
                <button onClick={sumarCantidad} className='contador__boton botonSumar'>
                    +
                </button>
            </div>
            <button className='contador__btnComprar' onClick={addToCart}>Sumar al carrito</button>
        </div>
    )
}

export default ItemCount