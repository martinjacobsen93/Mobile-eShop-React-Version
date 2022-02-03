import React, { useState } from 'react';
import db from '../firebase/firebase'
import { collection, addDoc, doc, writeBatch } from "firebase/firestore"
import swal from 'sweetalert';

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
                return itemDado.id === item.id ? {...itemDado, quantity: itemDado.stock >= itemDado.quantity + quantity ? itemDado.quantity + quantity : itemDado.quantity + 0} : itemDado
            }))
            : setCart([...cart, fullItem]);

        const manageTotalAndQuantities = () => {
            if (itemInCart && itemInCart.stock < (itemInCart.quantity + quantity)) {
                setTotal(prevTotal => prevTotal)
                setCantItems(prevQuantity => prevQuantity)
            }
            else if (itemInCart && itemInCart.stock === itemInCart.quantity && itemInCart.stock < itemInCart.quantity + quantity) {
                setTotal(prevTotal => prevTotal)
                setCantItems(prevQuantity => prevQuantity)
            }
            else {
                setTotal(prevTotal => prevTotal + item.precio * quantity)
                setCantItems(prevQuantity => prevQuantity + quantity)
            }
        }

        manageTotalAndQuantities();
        setIsCartEmpty(false);
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
        if (itemInCart.quantity === 1) {
            swal({
                title: 'Eliminar producto',
                text: 'Estás seguro que desear eliminar este item de tu carrito?',
                icon: 'warning',
                buttons: ['No', 'Si']
            }).then(res => {
                if (res) {
                    removeItem(itemId)
                }
            })
        }
        else {
            setCart(cart.map(e => {
                return e.id === itemId ? {...e, quantity: e.quantity - 1} : e
            }))
            setTotal(total - itemInCart.precio)
            setCantItems(cantItems - 1)
        }
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
            swal({
                title: 'Vaciar carrito',
                text: 'Estás seguro que desear vaciar tu carrito?',
                icon: 'warning',
                buttons: ['No', 'Si']
            }).then(res => {
                if (res) {
                    setCart([])
                    setIsCartEmpty(true)
                    setTotal(0)
                    setCantItems(0)
                }
            })
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

    const clearAfterSubmitting = () => {
        setCart([])
        setIsCartEmpty(true)
        setTotal(0)
        setCantItems(0)
    }

    const finalizarRevision = () => {
        setCompraFinalizada(false)
        setCurrentPurchase({})
        setUserData(null)
        clearAfterSubmitting();
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
