import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setCart: "SET_CART",
    setPurchases: "SET-PURCHASES"
}

const getConfig = () => ({
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
})

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})

export const setCart = cart => ({
    type: actions.setCart,
    payload: cart
})

export const setPurchases = purchases => ({
    type: actions.setPurchases,
    payload: purchases
})



export const getProductsThunk = () => {
    return dispatch => {

        dispatch(setIsLoading(true))

        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
                    .then(res => dispatch(setProducts(res.data?.data.products)))
                    .finally(() => dispatch(setIsLoading(false)))

    }
}

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
                    .then(res => dispatch(setCategories(res.data.data.categories)))
                    .finally(() => dispatch(setIsLoading(false)))
    }
}

export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`)
                    .then(res => dispatch(setProducts(res.data.data.products)))
                    .finally(() => dispatch(setIsLoading(false)))
    }
}

export const filterHeadLineThunk = headLine => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${headLine}`)
                .then(res => dispatch(setProducts(res.data.data.products)))
                .finally(() => dispatch(setIsLoading(false)))
    }
}

export const loginThunk = credentials => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return  axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", credentials)
        .finally(() => dispatch(setIsLoading(false)))
    }
}

export const addCartThunk = cartItem => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", cartItem, getConfig())
        .then(res => dispatch(getCartThunk()))
        .catch(error => {
            console.log(error.response.data.message)
        })
        .finally(() => dispatch(setIsLoading(false)))
    }
}

export const getCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .catch(error => {
            if(error.response.status === 404){
                console.log("el carrito esta vacio")
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
    }
}

export const removeProductThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)))
    }
}

export const postPurchasesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))

        return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)))
    }
}

export const getPurchasesThunk = () => {
    return dispatch => {

        dispatch(setIsLoading(true))

        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
                    .then(res => dispatch(setPurchases(res.data.data.purchases)))
                    .finally(() => dispatch(setIsLoading(false)))

    }
}

