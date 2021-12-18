import React, { useState} from 'react'

const Contador = ({stock}) => {

    const [count, setCount] = useState(0)

    return (
        <div className='contadorContainer'>
            <button onClick={() => setCount((count > 0) ? (count - 1) : 0)}>
                -
            </button>
            <p>Agregar a carrito: {count}</p>
            <button onClick={() => setCount((count < stock) ? (count + 1) : count)}>
                +
            </button>
        </div>
    )
}

export default Contador