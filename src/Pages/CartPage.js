import React from 'react';
import './CartPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//Components
import CartItem from '../components/CartItem';
//actions
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
const CartPage = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty))
    }
    const removeHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }

    const getCartSubTotal = () => {
        return cartItems.reduce((price, item) => (item.price * item.qty) + price, 0)
    }
    return (
        <div className="cartscreen">
            <div className="cartscreen__left">
                <h2>Shoping Cart</h2>
                {cartItems.length === 0 ? (
                    <div>
                        Tu carrito esta vacio  <Link to="/">Volver Atrás</Link>
                    </div>
                ) : cartItems.map(item => (
                    <CartItem key={item.product} item={item} qtyChangeHandler={qtyChangeHandler} removeHandler={removeHandler} />
                ))}
            </div>
            <div className="cartscreen__right">
                <div className="cartscreen__info">
                    <p>Subtotal ({getCartCount()}) items</p>
                    <p>${getCartSubTotal().toFixed(2)}</p>
                </div>
                <div>
                    <button>cHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage
