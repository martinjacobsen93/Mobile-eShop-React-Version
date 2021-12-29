import React from 'react'
import ItemCount from './ItemCount'

const ItemDetail = ({item}) => {
    return (
        <div>
            <p className='item__detail'>Año de lanzamiento: {item.año}</p>
            <ItemCount stock={item.stock} initial={1}/>
        </div>
    )
}

export default ItemDetail
