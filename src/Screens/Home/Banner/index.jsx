import React,{useEffect} from "react";
import { Ecommerce } from "../../../Assets";
import "./Banner.scss"
import gsap from 'gsap'

const Banner = () =>{

    useEffect(()=>{
        gsap.fromTo(".Banner",1,{y:-100,opacity:0},{
            y:0,
            opacity:1,
        })
        gsap.fromTo(".Banner_left",1,{x:-50,opacity:0},{x:0,opacity:1,delay:1});
        gsap.fromTo(".Banner_right",1,{x:50,opacity:0},{x:0,opacity:1,delay:1});
    },[])

    return(
        <div className="Banner">
            <div className="Banner_left">
                <h1>Grab offer upto 40% on Used Books</h1>
                <button>Grab soon</button>
            </div>
            <div className="Banner_right">
                <img src={Ecommerce} alt="Ecommerce" />
            </div>
        </div>
    )
}

export default Banner