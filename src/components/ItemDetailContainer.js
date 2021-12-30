import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import Celulares from '../data/celulares.json'

const ItemDetailContainer = () => {

    const [item, setItem] = useState({})
    const [visible, setVisible] = useState(true)

    const { productoId } = useParams();

    useEffect(() => {
        const getCelular = () => {
            const promesa = new Promise((res, rej) => {
                setTimeout(() => {
                    const celular = Celulares.find(e => e.id === parseInt(productoId));
                    res(celular)
                    rej("Hubo un error. No se ha conseguido el resultado esperado.")
                }, 2000);
            })
            promesa.then(res => {
                setItem(res)
                setVisible(false)
            })
        }

        getCelular()
    }, [productoId])

    return (
        <>  
            {visible ? <h2 className='my-2'>Cargando...</h2> : <ItemDetail {...item}/> }
        </>
    )
}

export default ItemDetailContainer