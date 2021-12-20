import React, { Fragment, useState, useEffect} from 'react'

const ItemCount = ({stock, initial, onAdd}) => {

    const [count, setCount] = useState(initial)
    const [cantidadStock, setcantidadStock] = useState(stock - 1)

    const sumarCantidad = () => {
        if (count < stock && cantidadStock != 0) {
            setCount(count + 1)
            setcantidadStock(cantidadStock - 1)
        }
        else {
            console.log("No hay mas stock")
        }
    }
    const restarCantidad = () => {
        if (cantidadStock < stock && count >= 1) {
            setcantidadStock(cantidadStock + 1)
            setCount(count - 1)
        }
    }
    const sumarAlCarrito = () => count > 0 ? setCount(0) : count

    useEffect(() => {
        console.log("Fase de montaje")
    }, [])

    useEffect(() => console.log("Fase de actualizacion"))

    return (
        <Fragment>
            <div className='contador__container'>
                <p className='contador__detail'>Nombre: Samsung S10+</p>
                <p className='contador__detail'>Stock: {cantidadStock}</p>
                <div className='contador__container2'>
                    <button onClick={restarCantidad} className='contador__boton botonRestar'>
                       -
                    </button>
                    <p className='contador__numero'>{count}</p>
                    <button onClick={sumarCantidad} className='contador__boton botonSumar'>
                        +
                    </button>
                </div>
                <button className='contador__btnComprar' onClick={sumarAlCarrito}>Sumar al carrito</button>
            </div>
        </Fragment>
    )
}

export default ItemCount