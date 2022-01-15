import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import cartIcon from '../img/cartIcon.svg'


const CartWidget = () => {


    const navigate = useNavigate();
    const {cantItems} = useContext(CartContext)
    
    return (
        <div className='d-flex' onClick={()=> navigate("/cart")} style={{cursor: 'pointer'}}>
            <img src={cartIcon} alt="cartIcon" className='cartIcon'/>
            {cantItems > 0 && <p className='m-auto text-light pt-3 fw-bold'>({cantItems})</p>}
        </div>
    )
}

export default CartWidget
