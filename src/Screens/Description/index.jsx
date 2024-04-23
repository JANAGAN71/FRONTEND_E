import React from "react";
import { useSelector,useDispatch } from "react-redux";
import "./Description.scss";
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import {FaTruckFast} from 'react-icons/fa6'
import {BiTask} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { addItem } from "../../Redux/CartSlice";
import Swal from 'sweetalert2'


const Description = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Desc = useSelector(state => state.Desc);
    const socket = useSelector(state=>state.Socket.socket)
    const Cart = useSelector(state=>state.Cart.items);


    const handleAddToCart = ()=>{
        console.log(Desc);
        if(Cart.some((item)=>JSON.stringify(item.id) === JSON.stringify(Desc.id))){
            Swal.fire('Already found in the Cart')
            navigate('/Cart');
            console.log("Found");
        }
        else{
            socket.emit('AddCart',Desc)
            dispatch(addItem(Desc));
        }
    }
    console.log(Desc);
    return(
        <div className="Description">
            <div className="Desc_img">
                <img src={Desc.image} alt="" />
            </div>
            <div className="Desc_details">
                <div className="back" onClick={()=>{navigate('/Ecommerce')}}>
                    <HiOutlineArrowNarrowLeft/>
                    &nbsp;&nbsp;
                    <p>Continue shopping</p>
                </div>
                <div className="Desc_main">
                    <h1>{Desc.title}</h1>
                    <h2>Catagory: &nbsp;{Desc.category}</h2>
                    <h3>Description</h3>
                    <p>{Desc.description}</p>
                    <div className="rating">
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                </div>
                {/* <div className="Count">
                    <div className="Count_pro">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                    </div>
                    <div className="Count_desc">
                        <p>only <span>2 items</span> left hurry!</p>
                    </div>
                </div> */}
                <div className="price">
                    <h3>${Desc.price}.00 OR $2 per month</h3>
                    <p>Suggested to take 6 months plan</p>
                </div>
                <div className="btns">
                    <button onClick={()=>{
                        handleAddToCart();
                        navigate('/Cart');
                    }}>Buy Now</button>
                    <button onClick={()=>handleAddToCart()}>Add to Cart</button>
                </div>
                <div className="extras">
                    <div className="Free">
                        <FaTruckFast/>
                        <h5>
                          Free Delivery available
                        </h5>
                    </div>
                    <p>free delivery for purchase more than $20</p>
                    <br />
                    <div className="Free">
                        <BiTask/>
                        <h5>
                          Delivery return
                        </h5>
                    </div>
                    <p>Free 30 days delivery return </p>

                </div>
            </div>
        </div>
    )
}

export default Description