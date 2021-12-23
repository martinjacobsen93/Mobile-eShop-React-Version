import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import Celulares from '../archivos-json/celulares.json'

const ItemListContainer = ({greeting}) => {

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
            <div style={{borderTop: '2px solid black', borderBottom: '2px solid black', backgroundColor: 'coral'}}>
                <h3>{greeting}</h3>
            </div>
            <ItemList lista={celulares}/>
        </div>
    )
}

export default ItemListContainer
