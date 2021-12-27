import React, { Fragment, useState} from 'react'

const ItemCount = ({stock, initial}) => {

    const [count, setCount] = useState(stock > 0 ? initial : 0)
    const [cantidadStock, setcantidadStock] = useState(stock > 0 ? stock - initial : 0)

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
    const onAdd = () => { // Función llamada en el evento onClick de linea 53.
        if (count > 0) {
            setCount(0)
            console.log('Cantidad de elementos agregados al carrito: ' + count)
        }
        else {
            console.log('No se pueden agregar más elementos al carrito')
        }
    }

    return (
        <Fragment>
            <div className=''>
                {/* <p className='contador__detail'>Nombre: Samsung S10+</p> */}
                <p className='item__detail'>Stock: {cantidadStock}</p>
                <div className='contador__container2'>
                    <button onClick={restarCantidad} className='contador__boton botonRestar'>
                       -
                    </button>
                    <p className='contador__numero'>{count}</p>
                    <button onClick={sumarCantidad} className='contador__boton botonSumar'>
                        +
                    </button>
                </div>
                <button className='contador__btnComprar' onClick={onAdd}>Sumar al carrito</button>
            </div>
        </Fragment>
    )
}

export default ItemCount