import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getPurchasesThunk} from  '../redux/actions'
import "../styles/purchases.css"

const Purchases = () => {

    const purchases = useSelector(state => state.purchases)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [dispatch])


    return (
        <div>
            {
                purchases.map(purchase => (
                    <div key={purchase.id} className="purchases">
                        <h3>{purchase.createdAt}</h3>
                        {purchase?.cart.products.map(productPurchased => (
                            <div key={productPurchased?.id}>
                                <h4>{productPurchased?.title}</h4>
                                <p>{productPurchased?.price}</p>
                            </div>
                           

                        ))}
                    </div>    
                ))
            }
            
        </div>
    );
};

export default Purchases;