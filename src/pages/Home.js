import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk, filterHeadLineThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';
import { Link } from 'react-router-dom';
import "../styles/home.css"

const Home = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)
    const categories = useSelector(state => state.categories)
    const [ headLine, setHeadLine ] = useState("")

    useEffect(() => {

        dispatch(getProductsThunk())
        dispatch(getCategoriesThunk())

    }, [dispatch])

    const searchProduct = e => {
        e.preventDefault()
        dispatch(filterHeadLineThunk(headLine))
    } 

    return (
        <div>
            <h1>home</h1>
            <form onSubmit={searchProduct}>
                <input 
                    type="text"
                    placeholder='search product' 
                    value={headLine}
                    onChange={e => setHeadLine(e.target.value)}
                />
                <button>search</button>
            </form>
            {
                categories.map(
                    category => (
                        <button
                         key={category.id}
                         onClick={() => dispatch(filterCategoryThunk(category.id))}
                        >
                            {category.name}
                        </button>
                    )
                )
            }
            <ul className='product-list'>
                {
                    products.map(
                        product =>(
                            <li className='product-item' key={product.id}>
                                <Link className='link' to={`/product/${product.id}`}>
                                    <h3>{product.title}</h3>
                                    <img src={product.productImgs?.[0]} alt="" />
                                    <p>price:{product.price}</p>
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
           
            
        </div>
    );
};

export default Home;