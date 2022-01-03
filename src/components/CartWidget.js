import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import cartIcon from '../img/cartIcon.svg'


const CartWidget = () => {


    const navigate = useNavigate();
    
    return (
        <Fragment>
            <img src={cartIcon} alt="cartIcon" style={{width: '50px', cursor: 'pointer'}} className='mx-3 cartIcon' onClick={()=> navigate("/cart")}/>
        </Fragment>
    )
}

export default CartWidget
