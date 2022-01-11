import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount'
import TituloPagina from './TituloPagina'



const ItemDetail = ({url, marca, año, stock, modelo, precio, id}) => {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false) // esta variable de estado hace que se vea en un principio el item count, y que desaparezca el mismo para finalizar compra cuando selecciono la cantidad
    const {addItem} = useContext(CartContext)


    const onAdd = (quantityToAdd) => {
        setVisible(true)
        const itemDado = {url, marca, año, stock, modelo, precio, id}
        addItem(itemDado, quantityToAdd)
    }

    // const cancelar = () => {
    //     setVisible(false)
    //     setQuantity(0)
    // }
    
    return (
        <>
            <TituloPagina titulo={modelo}/>
            <div style={{display: "flex", margin: 10}}>

            {/* <a className='' onClick={()=> navigate("/productos")}>{"<<- Regresar a Productos"}</a> */}
            </div>
            <div className='itemDetail__container'>
                <img src={url} className='item__img' alt='img' />
                <p className='item__detail mt-3'>Modelo: {modelo}</p>
                <p className='item__detail'>Marca: {marca}</p>
                <p className='item__detail'>Año de lanzamiento: {año}</p>
                <h3 style={{fontSize: 25}}>Precio: ${precio}</h3>
                {(stock !== 0 && !visible) && <ItemCount stock={stock} initial={1} onAdd={onAdd}/>}
                {visible && <button onClick={()=> navigate("/cart")} className='contador__btnComprar my-4'>Finalizar Compra</button>}
                {visible && <button onClick={()=> navigate("/productos")} className='contador__btnComprar my-4' style={{margin: 10}}>Seguir comprando</button>}
                {stock === 0 && <h2 className='noStockMessage'>No hay stock</h2>}
            </div>
            <button className='btn btn-primary mb-3' onClick={()=> navigate("/productos")}>Regresar a Productos</button>
        </>
    )
}

export default ItemDetail
