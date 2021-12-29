import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import Celulares from '../data/celulares.json'
import TituloPagina from './TituloPagina'

const ItemListContainer = ({titulo}) => {

    const [celulares, setCelulares] = useState([])

    const getData = () => {
        const newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([...Celulares])
                reject("No se pudo conseguir la información solicitada")
            }, 2000);
        })
        newPromise.then(res => setCelulares(res))
                 .catch(err => console.log(err));
    }
    

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <TituloPagina titulo={titulo}/>
            <ItemList lista={celulares}/>
        </div>
    )
}

export default ItemListContainer
