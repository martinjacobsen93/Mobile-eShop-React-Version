import React, { useRef, useState } from 'react'
import ItemDetailContainer from './ItemDetailContainer';

const Item = ({model, year, stock, img}) => {

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    let btnMostrar = useRef(),
        btnOcultar = useRef();


    const mostrarDetalle = () => {
        setVisible(true);
        setLoadingTitle()
        btnMostrar.current.style.display = 'none';
    }

    const ocultarDetalle = () => {
        setVisible(false);
        btnMostrar.current.style.display = 'block';
    }

    const setLoadingTitle = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    return (
        <div className='item__container' style={{backgroundColor: "#cdcdcf"}}>
            <img src={img} className='item__img' alt='img'></img>
            <p className='item__detail'>{model}</p>
            {loading && <h3>Cargando...</h3>}
            {visible && <ItemDetailContainer modelo={model} año={year} stock={stock}/>}
            <button className='btnItemMostrar' ref={btnMostrar} onClick={mostrarDetalle}>Mostrar detalles</button>
            {visible && <button className='btnItemOcultar' ref={btnOcultar} onClick={ocultarDetalle}>Mostrar menos</button>}
        </div>
    )
}

export default Item