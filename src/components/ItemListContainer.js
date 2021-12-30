import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import data  from '../data/celulares.json'
import TituloPagina from './TituloPagina'
import { Link, useParams } from 'react-router-dom'

const ItemListContainer = ({titulo}) => {

    const { marcaId } = useParams();

    const [celulares, setCelulares] = useState([])
    const [loading, setLoading] = useState(true)

    const categorias = [
        {id: 1, address: "/productos", text: "TODAS LAS MARCAS"},
        {id: 2, address: "/productos/Samsung", text: "Samsung"},
        {id: 3, address: "/productos/Motorola", text: "Motorola"},
        {id: 4, address: "/productos/Xiaomi", text: "Xiaomi"}
    ]


    
    useEffect(() => {
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
        <div style={{backgroundColor: "#D9EBEC"}}>
            <TituloPagina titulo={titulo}/>
            {!loading && <div className="categorias-marcas">
                {categorias.map(c => {
                    return (<div className='tituloMarca__container' key={c.id}>
                                <Link to={c.address} className='tituloMarca'>{c.text}</Link>
                            </div>
                    )
                })}
            </div>}
            {!loading && marcaId ? <h2 className='tituloMarcaSeleccionada'>{marcaId}</h2> : ""}
            {loading && <h2 className='mt-4'>Cargando...</h2>}

            <ItemList lista={celulares}/>
        </div>
    )
}

export default ItemListContainer



// const getItems = () => {
//     const promesa2 = new Promise((res, rej) => {
//         setTimeout(() => {
//             const myData = marcaId
//                 ? data.filter(item => item.marca === marcaId)
//                 : data;
//             res(myData)
//             rej("No se pudo conseguir la información solicitada")
//         }, 1000);
//     })
//     promesa2.then(res => setCelulares(res))
//             .catch(err => console.log(err));
// }