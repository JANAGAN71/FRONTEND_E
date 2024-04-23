import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { decrement, increment } from "../../../Redux/CartSlice";
import "./Box.scss"

const Box = ({elem}) =>{
    const cart = useSelector(state=>state.Cart);
    const socket = useSelector(state=>state.Socket.socket)
    const dispatch = useDispatch();
    const handleIncrement = ()=>{
        socket.emit("increment",elem);
        dispatch(decrement(elem));
    }
    return(
        <div className="Box">
            <div className="img">
                <img src={elem.image} alt="img" />
            </div>
            <div className="Box_desc">
                <h1>{elem.title}</h1>
                <p>Catagory: {elem.category}</p>
            </div>
            <div className="quantity">
                <button onClick={handleIncrement}>-</button>
                <p>{elem.count}</p>
                <button onClick={()=>dispatch(increment(elem))}>+</button>
            </div>
            <div className="price">
                <p>${elem.price}</p>
            </div>
            <div className="total_amount">
                <p>${elem.price*elem.count}</p>

            </div>
        </div>
    )
}

export default Box