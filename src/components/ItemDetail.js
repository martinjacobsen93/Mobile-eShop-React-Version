import React from 'react'
import ItemCount from './ItemCount'

const ItemDetail = ({modelo, stock, año}) => {
    return (
        <div>
            <p className='item__detail'>Modelo: {modelo}</p>
            <p className='item__detail'>Año de lanzamiento: {año}</p>
            <ItemCount stock={stock} initial={1}/>
        </div>
    )
}

export default ItemDetail
