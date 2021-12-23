import React from 'react'

const Item = ({model, year, stock}) => {
    return (
        <div className='item__container'>
            <p className='item__detail'>Modelo: {model}</p>
            <p className='item__detail'>Año de lanzamiento: {year}</p>
            <p className='item__detail'>Stock: {stock}</p>
        </div>
    )
}

export default Item