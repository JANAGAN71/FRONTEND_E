import React,{useEffect, useState} from "react";
import { Logo } from "../../../Assets";
import "./Header.scss"
import { useSelector,useDispatch } from "react-redux";
import {CiShoppingCart} from 'react-icons/ci'
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { searchRed } from "../../../Redux/ProductSlice";
import {AiOutlineBars} from 'react-icons/ai'

const Header = () =>{
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const Products = useSelector((state)=>state.Products.products);
    const search = useSelector((state)=>state.Products.search);
    const navigate = useNavigate();

    const handleSearch = (e) =>{
        const value = e.target.value;
        dispatch(searchRed({value}));
    }
    useEffect(()=>{
        gsap.fromTo(".Header",1,{y:-20,opacity:0},{opacity:1,y:0,delay:1})
        // gsap.fromTo("nav>*",0.5,{y:-50,opacity:0},{opacity:1,y:0,delay:1.5})
    },[])
    return(
        <div className="Header">
            <div className="img">
                <img src={Logo} alt="logo" />
            </div>
            <nav>
                <input type="text" placeholder="Search" onChange={handleSearch}/>
                    <p>Catagories</p>
                    <p>Deals</p>
                    <p onClick={()=>navigate("/Cart")} id="cart"><span>Cart</span><CiShoppingCart/></p>
            </nav>
            <div className="mobNav">
                <AiOutlineBars size={28} onClick={()=>setOpen(prev=>!prev)}/>
                <div style={open?{display:"block"}:{display:"none"}} className="PopNav">
                    <ul>
                    <div className="user">
                        <h1>KAVIN KUMAR M</h1>
                        <p>primary user</p>
                    </div>
                    <li>Catagories (yet to be added)</li>
                    <li>Deals (yet to be added)</li>
                    <li onClick={()=>navigate("/Cart")} id="cart"><span>Cart</span><CiShoppingCart/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header