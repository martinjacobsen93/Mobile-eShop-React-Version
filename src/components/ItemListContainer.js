import React from 'react'

const ItemListContainer = ({greeting}) => {
    return (
        <div style={{borderTop: '2px solid black', borderBottom: '2px solid black', backgroundColor: 'coral'}}>
            <h3>{greeting}</h3>
        </div>
    )
}

export default ItemListContainer
