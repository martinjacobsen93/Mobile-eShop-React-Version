import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount'
import TituloPagina from './TituloPagina'



const ItemDetail = ({url, marca, año, stock, modelo, precio, id}) => {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false) // esta variable de estado hace que se vea en un principio el item count, y que desaparezca el mismo para finalizar compra cuando selecciono la cantidad
    const {addItem} = useContext(CartContext);

    const onAdd = (quantityToAdd) => {
        setVisible(true)
        const itemDado = {url, marca, año, stock, modelo, precio, id}
        addItem(itemDado, quantityToAdd)
    }
    
    return (
        <>
            <TituloPagina titulo={modelo}/>
            <div className='itemDetail__container'>
                <img src={url} className='item__img' alt='img' />
                <div className='item__detail mt-3'>Modelo: {modelo}</div>
                <div className='item__detail'>Marca: {marca}</div>
                <div className='item__detail'>Año de lanzamiento: {año}</div>
                <h3 style={{fontSize: 24}}>Precio: ${precio}</h3>
                {(stock !== 0 && !visible) && <ItemCount stock={stock} initial={1} onAdd={onAdd} itemID={id}/>}
                {visible && <div className='test111'>
                                <button onClick={()=> navigate("/cart")} className='contador__btnComprar my-3'>Finalizar Compra</button>
                                <button onClick={()=> navigate("/productos")} className='contador__btnComprar my-3'>Seguir comprando</button>
                            </div>}
                {stock === 0 && <h2 className='noStockMessage'>No hay stock</h2>}
            </div>
            <button className='botonGenerico' onClick={()=> navigate("/productos")}>Regresar a Productos</button>
        </>
    )
}

export default ItemDetail
