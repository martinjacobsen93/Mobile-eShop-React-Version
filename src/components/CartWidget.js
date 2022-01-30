import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import cartIcon from '../img/cartIcon.png'


const CartWidget = () => {


    const navigate = useNavigate();
    const {cantItems, isCartEmpty} = useContext(CartContext)
    
    return (
        <div className='cartWidgetContainer' onClick={()=> navigate("/cart")}>
            <img src={cartIcon} alt="cartIcon" className='cartIcon'/>
            {!isCartEmpty && <p className='cartQuantity'>{cantItems}</p>}
        </div>
    )
}

export default CartWidget
