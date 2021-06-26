import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ProductPage.css';

//Actions
import { getProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
const ProductPage = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.getProductDetails);
    const { loading, error, product } = productDetails;


    useEffect(() => {
        if (product && match.params.id !== product._id) {
            dispatch(getProductDetails(match.params.id))
        }
    }, [dispatch, product, match])

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty))
        history.push("/cart")
    }

    return (
        <div className="productscreen">
            {loading ? (<h2>Cargando...</h2>) : error ? (<h2>{error}</h2>) : (
                <>
                    <div className="productscreen__left">
                        <div className="left__image">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>

                        <div className="left__info">
                            <p className="left__name">{product.name}</p>
                            <p >Precio ${product.price}</p>
                            <p>Descripción: {product.description}</p>
                        </div>
                    </div>
                    <div className="productscreen__right">
                        <div className="right__info">
                            <p>Precio: <span>${product.price}</span></p>
                            <p>Estado: <span>{product.countInStock > 0 ? "En Stock" : "Fuera de Stock"}</span></p>
                            <p>
                                Cantidad
                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                <button type="button" onClick={addToCartHandler} >
                                    Añadir al Carrito
                                </button>
                            </p>
                        </div>
                    </div>
                </>
            )
            }

        </div>
    )
}

export default ProductPage
