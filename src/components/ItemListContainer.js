import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import TituloPagina from './TituloPagina'
import { categorias } from '../Router-Dom/categorias'
import { NavLink, useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import db from '../firebase/firebase'

const ItemListContainer = ({titulo}) => {

    const { marcaId } = useParams();

    const [celulares, setCelulares] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        /* Defino una función asíncrona, la cual me trae los productos de la colección celulares de firestore.
           Si no hay un url con la marca de alguno de los productos, me traerá todos los productos de la colección, caso contrario solo traerá por filtro los de la marca
           seleccionada.*/
        setLoading(true)

        let counter;
        setTimeout(() => {
            
            const getCelulares = async () => {
                const myItems = marcaId ? query(collection(db, 'celulares'), where('marca', '==', marcaId))
                                        : collection(db, 'celulares');
        
                try {
                    const querySnapshot = await getDocs(myItems)
                    setCelulares(querySnapshot.docs.map(celular => {
                        return {...celular.data(), id: celular.id}
                    }))
                } catch {
                    console.log("Ha ocurrido un problema con la base de datos. No se pudo conseguir la información solicitada")
                }
                setLoading(false)
            }
    
            getCelulares();
        }, 120);
        
        return (() => {
            clearTimeout(counter)
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