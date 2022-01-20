import React, { useState } from 'react';

export const CartContext = React.createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [total, setTotal] = useState(0)
    const [cantItems, setCantItems] = useState(0);

    const addItem = (item, quantity) => {

        const fullItem = {...item, quantity}
        setCart([...cart, fullItem]);

        const itemInCart = cart.find(e => e.id === item.id)
        itemInCart ? 
            setCart(cart.map(itemDado => {
                return itemDado.id === item.id ? {...itemDado, quantity: itemDado.quantity + quantity} : itemDado
            }))
            : setCart([...cart, fullItem]);

        setIsCartEmpty(false);
        setTotal(total + (item.precio * quantity));
        setCantItems(cantItems + quantity)
    }

    const addOne = itemId => {
        const itemInCart = cart.find(e => e.id === itemId)
        if (itemInCart.stock > 0) {
            setCart(cart.map(e => {
                return e.id === itemId ? {...e, quantity: e.quantity + 1} : e
            }))
            setTotal(total + itemInCart.precio)
            setCantItems(cantItems + 1)
        }
    }

    const deleteOne = itemId => {
        const itemInCart = cart.find(e => e.id === itemId)
        itemInCart.quantity <= 1 ? removeItem(itemId) :
        setCart(cart.map(e => {
            return e.id === itemId ? {...e, quantity: e.quantity - 1} : e
        }))
        setTotal(total - itemInCart.precio)
        setCantItems(cantItems - 1)
    }

    const removeItem = (itemId) => {
        if (cart.length === 1) setIsCartEmpty(true);
        const itemIndex = cart.findIndex(item => item.id === itemId);
        const totalItemPrice = (cart[itemIndex].precio * cart[itemIndex].quantity)
        setTotal(total - totalItemPrice)
        setCantItems(cantItems - cart[itemIndex].quantity)
        cart.splice(itemIndex, 1)
        setCart([...cart])
    }

    const clear = () => {
        if (cart.length > 0) {
            setCart([])
            setIsCartEmpty(true)
            setTotal(0)
        }
        setCantItems(0)
    }
    
    return <CartContext.Provider value={{addItem, removeItem, clear, cart, isCartEmpty, total, cantItems, addOne, deleteOne}}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;
