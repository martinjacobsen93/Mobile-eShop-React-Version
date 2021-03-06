import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { getDoc, doc } from 'firebase/firestore'
import db from '../firebase/firebase'

const ItemDetailContainer = () => {

    const [item, setItem] = useState({})
    const [visible, setVisible] = useState(true)
    

    const { productoId } = useParams();

    useEffect(() => {
        /* Defino una función asíncrona, la cual me trae de firestore el producto que tenga un id que coincida con el param productoId y lo muestra en pantalla.*/
        const getCelular = async () => {
            const ref = doc(db, 'celulares', productoId);

            const itemBuscado = await getDoc(ref)
            setItem({...itemBuscado.data(), id: itemBuscado.id})
            setTimeout(() => {
                setVisible(false)
            }, 300);
        }
            
        getCelular()

        return (() => {
            setVisible(false)
        })
    }, [productoId])

    return (
        <main className='main'>  
            {visible ? <h2 className='pt-2'>Cargando...</h2> : <ItemDetail {...item}/> }
        </main>
    )
}

export default ItemDetailContainer