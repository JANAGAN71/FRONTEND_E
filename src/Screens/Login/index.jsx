import "./loginPage.css"
import { useState } from "react"
import axios from 'axios'


const LoginPage = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSubmit(event){
        // event.preventDefault();
        axios.post('http://localhost:5001/api/login', {email, password})
        .then(res=>console.log(res))
        .catch(err=>console.log("ERR from catch", err))
    }
    return (
        <div className="loginBox">
            <div className="formContainer">
                <h1>WELCOME TO EBOOKCART</h1>
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit} className="formBox">
                    <div className="forminput">
                        <label htmlFor="email">EMAIL ID</label>
                        <input type="email" name="email" id="email" placeholder="Enter Your EmailId" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div className="forminput">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" name="password" id="password" placeholder="Enter Your Password" onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    <div className="formBtn">
                        <button className="lBtn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage

