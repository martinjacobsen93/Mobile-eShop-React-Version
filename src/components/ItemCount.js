import React, { useState} from 'react'

const ItemCount = ({stock, initial, onAdd}) => {

    const [count, setCount] = useState(stock > 0 ? initial : 0)

    const sumarCantidad = () => {  /* Funcion llamada en el evento onClick de linea 46 */
        if (count < stock) {
            setCount(count + 1)
        }
        else {
            console.log("No puedes agregar más productos al carrito")
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
        else {
            console.log('No hay más stock o no estás seleccionando ningún producto')
        }
    }

    return (
        <>
            <div className='contador__containerGrande'>
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