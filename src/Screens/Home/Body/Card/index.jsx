import React from "react";
import "./Card.scss"
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Ecommerce } from "../../../../Assets";
import { addItem } from "../../../../Redux/CartSlice";
import { selectDesc } from "../../../../Redux/DescSlice";
import { useDispatch,useSelector } from "react-redux";
import Swal from 'sweetalert2'


const Card = ({product}) =>{
    const socket = useSelector(state=>state.Socket.socket)
    let rate = Math.trunc(product.rating.rate);
    const dispatch = useDispatch();
    const Cart = useSelector(state=>state.Cart.items);
    const navigate = useNavigate();
    const handleBuy = (product) =>{
        dispatch(selectDesc(product));
        navigate('/ProductDetails');
    }
    const handleAddToCart = ()=>{
        console.log(product);
        if(Cart.some((item)=>JSON.stringify(item.id) === JSON.stringify(product.id))){
            Swal.fire('Already found in the Cart')
            navigate('/Cart');
            console.log("Found");
        }
        else{
            socket.emit('AddCart',product)
            dispatch(addItem(product));
        }
    }
    return(
        <div className="Card">
            <div className="Card_img">
                <img src={product.image} alt="" />
            </div>
            <div className="Card_desc">
                <div className="desc_top">
                    <h1>{product.title}</h1>
                    <h2>${product.price}</h2>
                </div>
                <p>Catagory : {product.category}</p>
                <div className="rating">
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                </div>
                <div className="btn">
                    <button onClick={handleAddToCart}>Add to cart</button>
                    <button onClick={()=>handleBuy(product)}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Card