import React from 'react'
import { useNavigate } from 'react-router-dom'
import ItemCount from './ItemCount'
import TituloPagina from './TituloPagina'

const ItemDetail = ({url, marca, año, stock, modelo, precio}) => {

    const navigate = useNavigate();
    
    return (
        <>
            <TituloPagina titulo={modelo}/>
            <div className='itemDetail__container'>
                <img src={url} className='item__img' alt='img' />
                <p className='item__detail mt-3'>Modelo: {modelo}</p>
                <p className='item__detail'>Marca: {marca}</p>
                <p className='item__detail'>Año de lanzamiento: {año}</p>
                <h3 style={{fontSize: 25}}>Precio: ${precio}</h3>
                <ItemCount stock={stock} initial={1}/>
            </div>
            <button className='btn btn-primary' onClick={()=> navigate("/productos")}>Regresar a Productos</button>
        </>
    )
}

export default ItemDetail
