import React, { useState } from 'react';

export const CartContext = React.createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [total, setTotal] = useState(0)

    const addItem = (item, quantity) => {

        const {modelo, marca, año, stock, url, id, precio} = item;
        const fullItem = {modelo, marca, año, stock, url, id, precio, quantity}
        setCart([...cart, fullItem]);

        const itemInCart = cart.find(e => e.id === item.id)
        itemInCart ? 
            setCart(cart.map(itemDado => {
                return itemDado.id === item.id ? {...itemDado, quantity: itemDado.quantity + quantity} : itemDado
            }))
            : setCart([...cart, fullItem]);

        setIsCartEmpty(false);
        setTotal(total + (precio * quantity));
    }

    const removeItem = (itemId) => {
        if (cart.length === 1) setIsCartEmpty(true);
        const itemIndex = cart.findIndex(item => item.id === itemId);
        const totalItemAmount = (cart[itemIndex].precio * cart[itemIndex].quantity)
        setTotal(total - totalItemAmount)
        cart.splice(itemIndex, 1)
        setCart([...cart])
    }

    const clear = () => {
        if (cart.length > 0) {
            setCart([])
            setIsCartEmpty(true)
        }
    }
    
    return <CartContext.Provider value={{addItem, removeItem, clear, cart, isCartEmpty, total}}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;