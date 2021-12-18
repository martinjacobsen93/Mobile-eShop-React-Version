import React, { Fragment } from 'react'
import cartIcon from '../img/cartIcon.svg'

const CartWidget = () => {
    return (
        <Fragment>
            <img src={cartIcon} alt="cartIcon" style={{width: '50px', cursor: 'pointer'}} className='mx-3 cartIcon' onClick={()=> alert('El carrito está en reparación')}/>
        </Fragment>
    )
}

export default CartWidget
