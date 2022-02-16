import React from 'react'
import Item from './Item';


const ItemList = ({lista}) => {

    return (
        <div className='itemList__container'>
            {lista.map((item) =>
                <Item 
                    {...item}
                    key={item.id}
                />
            )}
        </div>
    )
}

export default ItemList