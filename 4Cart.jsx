import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {increaseQuantity, decreaseQuantity, deleteItem} from '../state/nurseryParadiseSlice'
import "../style/cart.css"

const Cart = (props) => {
    const plantsInCart = useSelector(state => state.nursery.plantsInCart);
    const totalCartAmount = useSelector(state => state.nursery.cartTotal);
    const dispatch = useDispatch();

    console.log("In cart");
    
    const handleIncreaseQuantity = (payload) => {
        dispatch(increaseQuantity(payload));
    }

    const handleDecreaseQuantity = (payload) => {
        payload.quantity !== 0 ? dispatch(decreaseQuantity(payload.index)) : dispatch(deleteItem(payload.index));
    }

    const handleDeletePlant = (payload) => {
        dispatch(deleteItem(payload));
    }

    return(
        <section className="cart-container">
            <h1>Total Cart Amount: ${totalCartAmount}</h1>
            {plantsInCart ? 
                plantsInCart.map((plant, index) => 
                <div className="flex-cart-item">
                    <section className="cart-details-left">
                        <img src={plant.image} />
                    </section>
                    <section className="cart-details-right">
                        <h2>{plant.name}</h2>
                        <p>{plant.cost}</p>
                        <span><button className="cart-button" onClick={() => {handleDecreaseQuantity({index: index, quantity: plant.quantity - 1})}}>-</button>{plant.quantity}<button className="cart-button" onClick={() => {handleIncreaseQuantity(index)}}>+</button></span>
                        <h3>Total: ${plant.total ? plant.total : plant.cost.substring(1)}</h3>
                        <button className="cart-delete-button" onClick={() => {handleDeletePlant(index)}}>Delete</button>
                    </section>
                </div>
                )

                :
                
                <></>
            }
            <button className="btn" onClick={() => {props.naviCart(true)}}>Continue Shopping</button>
            <br />
            <button className="btn">Checkout</button>
        </section>
    )
}

export default Cart;