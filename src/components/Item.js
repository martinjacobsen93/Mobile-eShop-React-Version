import React from 'react'
import { useNavigate } from 'react-router-dom';
// import ItemDetailContainer from './ItemDetailContainer';

const Item = ({modelo, id, url}) => {

    const navigate = useNavigate();

    return (
            <div className='item__container' style={{backgroundColor: "#cdcdcf"}}>
                <img src={url} className='item__img' alt='img' />
                <p className='item__detail'>{modelo}</p>
                <button className='btnItemMostrar' onClick={()=> navigate(`/producto/${id}`)}>Mostrar detalles</button>
            </div>
    )
}

export default Item