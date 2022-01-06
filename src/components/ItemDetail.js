import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development';
import ItemCount from './ItemCount'
import TituloPagina from './TituloPagina'


const initialQuantity = 0;

const ItemDetail = ({url, marca, año, stock, modelo, precio}) => {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false) // esta variable de estado hace que se vea en un principio el item count, y que desaparezca el mismo para finalizar compra cuando selecciono la cantidad
    const [quantity, setQuantity] = useState(initialQuantity);


    const onAdd = (quantityToAdd) => {
        setVisible(true)
        setQuantity(quantityToAdd)
    }
    
    useEffect(() => {
        if (quantity !== 0) {
            console.log(`Cantidad de elementos agregados usando la variable de estado quantity desde itemDetail: ${quantity}`)
        }
    }, [quantity])
    
    return (
        <>
            <TituloPagina titulo={modelo}/>
            <div className='itemDetail__container'>
                <img src={url} className='item__img' alt='img' />
                <p className='item__detail mt-3'>Modelo: {modelo}</p>
                <p className='item__detail'>Marca: {marca}</p>
                <p className='item__detail'>Año de lanzamiento: {año}</p>
                <h3 style={{fontSize: 25}}>Precio: ${precio}</h3>
                {(stock !== 0 && !visible) && <ItemCount stock={stock} initial={1} onAdd={onAdd}/>}
                {visible && <button onClick={()=> navigate("/cart")} className='contador__btnComprar my-4'>Finalizar Compra</button>}
                {stock === 0 && <h2 className='noStockMessage'>No hay stock</h2>}
            </div>
            <button className='btn btn-primary' onClick={()=> navigate("/productos")}>Regresar a Productos</button>
        </>
    )
}

export default ItemDetail
