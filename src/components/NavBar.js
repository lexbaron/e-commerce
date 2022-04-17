
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getCartThunk, loginThunk } from '../redux/actions';
import Cart from './Cart';

const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [isCartOpen, setIsCartOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openCart = () => {
        setIsCartOpen(!isCartOpen)
        dispatch(getCartThunk())
    }

    

    const login = e =>{
        e.preventDefault()
        const credentials = {
            email,
            password
        }
        dispatch(loginThunk(credentials))
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                setLoginError("")
                setIsLoginOpen(false)
            })
            .catch(error => {
               setLoginError(error.response.data.message)
            })
            setIsLoginOpen(false)
    }

    return (
        <div>
            <nav>
                <Link to ="/">e-commerce</Link>
                <button onClick={() => setIsLoginOpen(!isLoginOpen)}>login</button>
                <button onClick={openCart}>cart</button> 
                <button onClick={() => navigate("/purchases")}>purchases</button>
            </nav>
            {
                isLoginOpen &&
                <form onSubmit={login} className='login'>
                    {
                        localStorage.getItem("token") ?( <button type='button' onClick={() => {
                            localStorage.setItem( "token", "" )
                            setIsLoginOpen(false)
                        }}>logout</button>) : 
                       ( <>
                            <input
                                type="email"
                                placeholder='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <p>{loginError}</p>
                            <button>submit</button>
                        </>)
                    }
                   
                </form>
            }
            <Cart isOpen={isCartOpen}/>
            
            
        </div>
    );
};

export default NavBar;