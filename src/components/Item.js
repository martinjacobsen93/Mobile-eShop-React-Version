import React from 'react'

const Item = ({model, year, stock, img}) => {
    return (
        <div className='item__container'>
            <img src={img} className='item__img' alt='img'></img>
            <p className='item__detail'>Modelo: {model}</p>
            <p className='item__detail'>Año de lanzamiento: {year}</p>
            <p className='item__detail'>Stock: {stock}</p>
        </div>
    )
}

export default Item