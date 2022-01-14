import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import data  from '../data/celulares.json'
import TituloPagina from './TituloPagina'
import { NavLink, useParams } from 'react-router-dom'

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
        const getData = new Promise((res, rej) => {
            setTimeout(() => {                
                const celularesData = marcaId
                ? data.filter(e => e.marca === marcaId)
                : data;
                res(celularesData)
                rej("No se pudo conseguir la información solicitada")
            }, 1000);
        })

        getData.then(res => {
            setCelulares(res)
        })
        .catch(err => console.log(err))
        .finally(()=> setLoading(false))
        

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