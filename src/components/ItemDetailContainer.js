import React, { useEffect, useState } from 'react'
import ItemDetail from './ItemDetail'

const ItemDetailContainer = (itemDado) => {

    const [item, setItem] = useState({})
    const [visible, setVisible] = useState(false)

    
    useEffect(() => {
        const getItem = () => {
            const newItem = new Promise((res, rej) => {
                setTimeout(() => {
                    res(itemDado)
                    rej("Hubo un error. No se ha conseguido el resultado esperado.")
                }, 2000);
            })
            newItem.then(res => {
                setItem(res)
                setVisible(true)
            })
                   .catch(err => console.log(err))
        }

        getItem()
    }, [itemDado])

    return (
        <>
            {visible && <ItemDetail item={item}/> }
        </>
    )
}

export default ItemDetailContainer