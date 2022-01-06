import React, { useState} from 'react'

const ItemCount = ({stock, initial, onAdd}) => {

    // const [count, setCount] = useState(stock > 0 ? initial : 0)
    // const [cantidadStock, setcantidadStock] = useState(stock > 0 ? stock - initial : 0)

    const [count, setCount] = useState(stock > 1 ? initial : 0)
    const [cantidadStock, setcantidadStock] = useState(stock > 1 ? stock - initial : 0 || stock === 1 ? stock : 0) /* está bien usar operadores ternarios con un OR? 
                                                                                                                        o hay una mejor manera*/

    const sumarCantidad = () => {  /* Funcion llamada en el evento onClick de linea 46 */
        if (count < stock && cantidadStock !== 0) {
            setCount(count + 1)
            setcantidadStock(cantidadStock - 1)
        }
        else {
            console.log("No hay mas stock")
        }
    }
    const restarCantidad = () => {  /* Funcion llamada en el evento onClick de linea 42 */
        if (cantidadStock < stock && count >= 1) {
            setcantidadStock(cantidadStock + 1)
            setCount(count - 1)
        }
    }
    // const addToCart = () => { // Función llamada en el evento onClick de linea 53.
    //     if (count > 0) {
    //         onAdd(count)
    //         setCount(0)
    //         console.log(`Cantidad de elementos agregados al carrito desde ItemCount: ${count}`)
    //     }
    //     else {
    //         console.log('No se pueden agregar más elementos al carrito')
    //     }
    // }

    return (
        <>
            <div className='contador__containerGrande'>
                <p className='item__detail'>Stock: {cantidadStock}</p>
                <div className='contador__container' style={{backgroundColor: "white"}}>
                    <button onClick={restarCantidad} className='contador__boton botonRestar'>
                       -
                    </button>
                    <p className='contador__numero'>{count}</p>
                    <button onClick={sumarCantidad} className='contador__boton botonSumar'>
                        +
                    </button>
                </div>
                <button className='contador__btnComprar' onClick={()=> onAdd(count)}>Sumar al carrito</button>
            </div>
        </>
    )
}

export default ItemCount