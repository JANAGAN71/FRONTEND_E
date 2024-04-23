import React,{useEffect, useState} from "react";
import "./Body.scss"
import Card from "./Card";
import { useSelector,useDispatch } from "react-redux";
import { HiMiniChevronDoubleRight } from 'react-icons/hi2'
import { searchRed } from "../../../Redux/ProductSlice";
import Form from "./Form";
import gsap from "gsap";
import Preloader from "../../Preloader";

const Body = ({setPop}) =>{

    const dispatch = useDispatch();
    useEffect(()=>{
        gsap.fromTo(".Filter",1,{opacity:0,x:-10},{x:0,opacity:1,delay:1.5});
        gsap.fromTo(".Recommend",1,{opacity:0,x:-10},{x:0,opacity:1,delay:1});
        gsap.fromTo(".line",1,{opacity:0,y:10},{y:0,opacity:1,delay:1.5});
        gsap.fromTo(".Container>*",0.2,{y:100,opacity:0},{y:0,opacity:1,stagger:0.1});
    },[])
    const [Filter,setFilter] = useState(false);
    const handleCat = (e) =>{
        let value = e.target.value;
        console.log(value);
        dispatch(searchRed({value}))
    }


    const Products = useSelector((state)=>state.Products.products);

    return(
        <div className="Body">
            <div className="Filter" >
                <button onClick={()=>setPop(true)}>
                    Sell My product
                </button>
                <button onClick={()=>setFilter(prev=>!prev)}>
                    <p>Apply Filter</p>
                    <HiMiniChevronDoubleRight/>
                </button>
                <div className={(Filter)?"view":"hidden"}>
                    <select name="catagory" id="catagory" onChange={(e)=>handleCat(e)}>
                        <option value="">Select Catagory</option>
                        <option value="Fiction books">Fiction books</option>
                        <option value="Educational">Educational</option>
                        <option value="Story books">Story books</option>
                        <option value="Relegious books">Relegious books</option>
                        <option value="Autobiograph">Autobiograph</option>
                        <option value="Cook Books">Cook Books</option>
                        <option value="History">History</option>
                    </select>
                </div>
            </div>
            <div className="Recommend">
                <h2>Recommended for you</h2>
            </div>
            <div className="line"></div>
            {
                (Products.length>0 && Products!=="cannot get")?
                <div className="Container">
                    {
                        (Products)?.map((product)=>
                        <Card product={product} key={product.id}/>
                        )
                    }
                </div>
                :
                (Products==="cannot get")?
                <div className="Container">
                    <h1>Cannot get products</h1>
                </div>
                :
                <Preloader/>
            }
        </div>
    )
}

export default Body