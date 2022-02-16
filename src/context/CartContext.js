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
        /* Se define función la cual agrega un item al carrito dado con la cantidad dada. Si el item ya se encuentra en el carrito, modificará sólo la cantidad del
         item agregado. */

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
        /* Se define función la cual al ser ejecutada aumenta en 1 la cantidad de items del producto dado en el carrito, siempre y cuando el stock sea mayor o igual que
        la cantidad a agregar y la cantidad ya agregada (si la hubiera). */
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
        /* Se define función la cual al ser ejecutada disminuye en 1 la cantidad de items del producto dado en el carrito. */
        const itemInCart = cart.find(e => e.id === itemId)
        itemInCart.quantity === 1 ? removeItemFromCart(itemId) :
        setCart(cart.map(e => {
            return e.id === itemId ? {...e, quantity: e.quantity - 1} : e
        }))
        setTotal(total - itemInCart.precio)
        setCantItems(cantItems - 1)
    }

    const cartItemIndex = (itemId) => {     /* CREO ESTA FUNCION PARA NO REPETIR CODIGO AL BUSCAR EL INDICE DE ITEM EN EL CARRITO*/
        return (cart.findIndex(item => item.id === itemId))
    }

    const removeItemFromCart = id => {
        /* Se define función la cual al ser ejecutada borra al item dado del carrito. */
        if (cart.length === 1) setIsCartEmpty(true)
        const totalItemPrice = (cart[cartItemIndex(id)].precio * cart[cartItemIndex(id)].quantity)
        setTotal(total - totalItemPrice)
        setCantItems(cantItems - cart[cartItemIndex(id)].quantity)
        cart.splice(cartItemIndex(id), 1)
        setCart([...cart])
    }

    const removeAll = (itemId) => {
        /* Se define función que al ejecutarse muestra en pantalla una alerta preguntando si desea eliminar la cantidad total del item dado agregado al carrito.
           ACLARACIÓN: Si la cantidad del producto dado es 1, no aparecerá la alerta y lo borrará de inmediato.*/
        if (cart[cartItemIndex(itemId)].quantity > 1) {
            swal({
                title: 'Eliminar todos los items',
                text: 'Deseas eliminar todos los items seleccionados de este producto?',
                icon: 'warning',
                buttons: ['No', 'Si']
            })
            .then(res => {
                if (res) {
                    removeItemFromCart(itemId)
                }
            })
        }
        else {
            removeItemFromCart(itemId)
        }
    }

    const clear = () => {
        /* Se define función que al ejecutarse vacía el carrito, y elimina todos los items que fueron agregados al mismo.*/
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
        /* Creo función la cual se ejecuta con el evento onSubmit del formulario de compra, la cual guarda la compra realizada en un objeto, y envía los datos
           del usuario y los items comprados a firebase. Además se crea un nuevo documento dentro de la colección purchases el cual tiene un Id único, 
           y es el id de seguimiento del envío. */
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

        const purchasesCollection = collection(db, 'purchases'); /* Creo un nuevo documento con una orden de compra en firestore, y si la colección Purchases no existe, la crea.*/
        addDoc(purchasesCollection, newOrder).then(({id}) => {
            setCurrentPurchase((sameOrder) => {
                return {...sameOrder, purchaseID: id}
            })
        })

        const updateItems = () => { 
            /* Esta función actualiza el stock en firestore de cada producto que haya sido comprado. */
            
            const batch = writeBatch(db)
            const itemIds = newOrder.items.map(e => e.id)

            itemIds.forEach(itemId => {
                const docRef = doc(db, 'celulares', itemId);
                const itemDado = newOrder.items.find(e => e.id === itemId);
                batch.update(docRef, {stock: itemDado.stock - itemDado.cantidad});
            })
            batch.commit();
        }

        updateItems();
        setCompraFinalizada(true)
    }

    const toCheckout = () => {
        /* Función definida para manejar la vista del CartPage. Si checkOut es true, se muestra el formulario de compra, caso contrario se muestra el carrito de compras. */
        setCheckout(true)
    }

    const clearAfterSubmitting = () => {
        /* Se define función la cual resetea todos los contadores y vuelven las variables de estado del carrito a su estado inicial luego de realizar una compra y confirmar la misma. */
        setCart([])
        setIsCartEmpty(true)
        setTotal(0)
        setCantItems(0)
    }

    const finalizarRevision = () => {
        /* Se define función la cual devuelve todas las variables de estado a su estado inicial luego de finalizar revisión de compra.*/
        setCompraFinalizada(false)
        setCurrentPurchase(null)
        setUserData(null)
        clearAfterSubmitting();
        setCheckout(false)
    }

    const returnToCart = () => {
        /* Se define función la cual maneja el estado de variable checkout. Si se ejecuta dicha función se vuelve a la vista previa del formulario. */
        setCheckout(false)
    }

    const data = {addItem, 
        removeAll,
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
