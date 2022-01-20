import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import TituloPagina from './TituloPagina'
import { NavLink, useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import db from '../firebase/firebase'

const ItemListContainer = ({titulo}) => {

    const { marcaId } = useParams();

    const [celulares, setCelulares] = useState([])
    const [loading, setLoading] = useState(false)

    const categorias = [
        {id: 1, address: "/productos", text: "TODAS LAS MARCAS"},
        {id: 2, address: "/products/Samsung", text: "Samsung"},
        {id: 3, address: "/products/Motorola", text: "Motorola"},
        {id: 4, address: "/products/Xiaomi", text: "Xiaomi"}
    ]


    
    useEffect(() => {
        setLoading(true)    
        const getCelulares = async () => {
            const myItems = marcaId ? query(collection(db, 'celulares'), where('marca', '==', marcaId))
                                    : collection(db, 'celulares');
    
            try {
                const querySnapshot = await getDocs(myItems)
                setCelulares(querySnapshot.docs.map(celular => {
                    return {...celular.data(), id: celular.id}
                }))
            } catch {
                console.log("error, no se pudo conseguir la data solicitada")
            }
            setLoading(false)
        }

        getCelulares();
        
        return (() => {
            setLoading(false)
        })

    }, [marcaId])


    return (
        <main className='main'>
            <TituloPagina titulo={titulo}/>
            <div className="categorias-marcas">
                {categorias.map(c => {
                    return (<div className='tituloMarca__container' key={c.id}>
                                <NavLink to={c.address} className={({isActive}) => isActive ? 'tituloMarca tituloMarcaActive' : 'tituloMarca'}>{c.text}</NavLink>
                            </div>
                    )
                })}
            </div>
            {loading ? <h2 className='mt-4'>Cargando...</h2> : <ItemList lista={celulares}/>}
        </main>
    )
}

export default ItemListContainer