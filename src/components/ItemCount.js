import React, { useState} from 'react'
import { useContext } from 'react/cjs/react.development'
import { CartContext } from '../context/CartContext'

const ItemCount = ({stock, initial, onAdd, itemID}) => {

    const { cart } = useContext(CartContext);
    const itemInCart = cart.find(e => e.id === itemID);

    const [count, setCount] = useState(stock > 0 ? initial : 0)

    const sumarCantidad = () => {  /* Funcion llamada en el evento onClick de linea 46 */
        if (count < stock) {
            setCount(count + 1)
        }
    }
    const restarCantidad = () => {  /* Funcion llamada en el evento onClick de linea 42 */
        if (stock > 0 && count >= 1) {
            setCount(count - 1)
        }
    }
    const addToCart = () => { // Función llamada en el evento onClick de linea 53.
        if (count > 0) {
            onAdd(count)
        }
    }

    const remainingStockAvailableDesc = () => {
        if (itemInCart && itemInCart.quantity === itemInCart.stock && count !== 0) {
            return <p style={{color: "red", fontWeight: "bold"}}>No puedes agregar más cantidad de este producto al carrito</p>
        }
        else if (itemInCart && (itemInCart.quantity + count > itemInCart.stock) && itemInCart.quantity < itemInCart.stock) {
            return <p style={{color: "red", fontWeight: "bold"}}>Sólo puedes agregar {itemInCart.stock - itemInCart.quantity} items más al carrito</p>
        }
    }

    return (
        <>
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
        </>
    )
}

export default ItemCount