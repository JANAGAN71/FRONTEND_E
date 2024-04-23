import React,{useState} from "react";
import "./Home.scss"
import Header from "./Header";
import Banner from "./Banner";
import Body from "./Body";
import Form from "./Body/Form";

const Home = () =>{
    const [pop,setPop] = useState(false);
    
    return(
        <div className="Home">
            {pop && <Form setPop={setPop}/>}
            <Header/>
            <Banner/>
            <Body setPop={setPop}/>
        </div>  
    )
}

export default Home