import React, { useEffect } from 'react'
import './HomePage.css'
import { useSelector, useDispatch } from 'react-redux';
//Componentes
import Product from '../components/Product';
//Actions 
import { getProducts as listProducts } from '../redux/actions/productActions';
const HomePage = () => {
    const dispatch = useDispatch();

    const getProducts = useSelector(state => state.getProducts)
    const { products, loading, error } = getProducts;

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div className="homescreen" >
            <h2 className="homescreen__title" >Últimos Productos</h2>
            <div className="homescreen__products">
                {
                    loading ? <h2>Cargando...</h2> : error ? <h2>{error}</h2> : products.map(product => (
                        <Product
                            key={product._id}
                            productId={product._id}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            imageUrl={product.imageUrl} />
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage
