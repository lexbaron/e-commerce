import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addCartThunk, getProductsThunk } from '../redux/actions';
import "../styles/product-detail.css"


const ProductDetail = () => {

    const {id} = useParams()
    const dispatch = useDispatch()

    
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])

    const [productsFiltered, setProductsFiltered] = useState([])
    const [quantity, setQuantity] = useState(0)

    const productFound = products.find(productItem => productItem.id === Number(id))
    
    useEffect(() => {
        if(productFound){
                axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productFound?.category.id}`)
                    .then(res => setProductsFiltered(res.data.data.products))
        }
    }, [dispatch, productFound])

    const addToCart = () => {

        const cartItem = {
            id: parseInt(id),
            quantity: quantity
        }

        dispatch(addCartThunk(cartItem))
    }
    
   

    return (
        <div>
            <div className='title-img'>
                <h1>{productFound?.title}</h1>
                <img src={productFound?.productImgs?.[0]} alt="" />
            </div>
           <section>
               <p>{productFound?.description}</p>
               <div>
                    <label htmlFor="quantity">quantity</label>
                    <input
                    type="text"
                    id='quantity'
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    />
                    <button onClick={() => setQuantity(quantity - 1)}>-</button>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
               </div>
               <button onClick={addToCart}>Add to cart</button>
           </section>
           <section>
                <ul>
                    {
                        productsFiltered.map(  product =>(
                            <li key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <h3>{product.title}</h3>
                                    <img src={product.productImgs?.[0]} alt="" />
                                </Link>
                            </li>))
                    }

                </ul>
           </section>
          
           

            
        </div>
    );
};

export default ProductDetail;