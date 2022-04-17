
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postPurchasesThunk, removeProductThunk } from '../redux/actions';

import "../styles/cart.css"

const Cart = ({isOpen}) => {

    const cart = useSelector(state => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    return (
        <div className={`cart-modal ${isOpen ? 'open' : ''}`}>
            <ul className='cart-list'>
                {
                    cart.map(product => (
                        <li key={product.id} onClick={() => navigate(`/product/${product.productsInCart.productId}`)}>
                            <h4>{product.title}</h4>
                            <p>{product.productsInCart.quantity}</p>
                            <p>{product.price}</p>
                            <button type='button' onClick={() => dispatch(removeProductThunk(product.productsInCart.productId))}>remove product</button>
                        </li>
                        
                    )

                    )
                }
            </ul>
            <button onClick={() => dispatch(postPurchasesThunk())}>purchase</button>
        </div>
    );
};

export default Cart;