import React, { useState } from 'react';
import db from '../firebase/firebase'
import { collection, addDoc, doc, writeBatch } from "firebase/firestore"

export const CartContext = React.createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [total, setTotal] = useState(0)
    const [cantItems, setCantItems] = useState(0);
    const [userData, setUserData] = useState({});
    const [currentPurchase, setCurrentPurchase] = useState({});
    const [compraFinalizada, setCompraFinalizada] = useState(false);
    const [checkout, setCheckout] = useState(false)

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
        if (itemInCart.stock > 0 && itemInCart.stock > itemInCart.quantity) {
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
            setCantItems(0)
        }
    }

    const handleUserData = (e) => {
        setUserData(prevData => {
            return {...prevData, [e.target.name]: e.target.value}
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newOrder = {user: {nombre: userData.nombre,
                                    apellido: userData.apellido,
                                    email: userData.email,
                                    direccion: userData.direccion},
                            items: cart.map(e => {
                                return {item: e.modelo, precio: e.precio, cantidad: e.quantity, id: e.id, stock: e.stock}
                            }),
                            total: total
        }

        setCurrentPurchase(newOrder)

        const purchasesCollection = collection(db, 'purchases'); /* CREO UN NUEVO DOCUMENTO CON UNA ORDEN DE COMPRA EN FIRESTORE, Y SI LA COLECCION PURCHASES NO EXISTE, LA CREA.*/
        addDoc(purchasesCollection, newOrder).then(({id}) => {
            setCurrentPurchase((sameOrder)=> {
                return {...sameOrder, purchaseID: id}
            })
        })

        const updateItems = () => { /* ESTA FUNCION UPDATEA EL STOCK EN FIRESTORE DE CADA PRODUCTO QUE HAYA SIDO COMPRADO.*/

            const batch = writeBatch(db)
            const itemIds = newOrder.items.map(e => e.id)

            itemIds.forEach(itemId => {
                const docRef = doc(db, 'celulares', itemId);
                const itemDado = newOrder.items.find(e => e.id === itemId);
                batch.update(docRef, {stock: itemDado.stock - itemDado.cantidad});
            })
            batch.commit();
        }

        updateItems(); // Llamo función
        setCompraFinalizada(true)
    }

    const toCheckout = () => {
        setCheckout(true)
    }

    const finalizarRevision = () => {
        setCompraFinalizada(false)
        setCurrentPurchase({})
        setUserData(null)
        clear();
        setCheckout(false)
    }

    const returnToCart = () => {
        setCheckout(false)
    }

    const data = {addItem, 
        removeItem, 
        clear, 
        cart, 
        isCartEmpty, 
        total, 
        cantItems, 
        addOne, 
        deleteOne, 
        userData, 
        handleUserData, 
        handleSubmit, 
        currentPurchase,
        toCheckout,
        checkout,
        returnToCart,
        compraFinalizada,
        finalizarRevision};
    
    return <CartContext.Provider value={data}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;
