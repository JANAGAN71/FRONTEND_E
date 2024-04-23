import React,{useEffect, useState} from "react";
import "./Form.scss"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useSelector } from "react-redux";


const Form = ({setPop})=>{
    const socket = useSelector(state=>state.Socket.socket);
    const navigate = useNavigate();
    const [Image, setImage] = useState()
    const [formdata,setFormData] = useState(
        {
            title:'',
            id:'',
            price:0,
            description:'',
            category:'',
            image:'',
            rating:{
                rate:0,
                count:0
            }
        }
        );
        const [complete,setComplete] = useState(false);
        const handleSubmit =  (e) =>{
            e.preventDefault();
            const imageData = new FormData();
            imageData.append('image',Image);
            axios.post('https://ecommerce-backend-ozyi.onrender.com/uploads',imageData)
            .then((res)=>{
                setFormData(prev=>({...prev,image:res.data,id:Date.now()}));
                setComplete(true);
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    useEffect(()=>{
        if(complete){
            axios.post('http://localhost:5000',formdata)
            .then((res)=>{
                // Swal.fire(
                //     'You added new product!',
                //     'Please refresh the page',
                //     'success'
                // )
                setPop(false);
                setComplete(false);
            })
        }
    },[complete])

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevState)=>({
            ...prevState,[name]:value
        }))
        console.log(formdata);
    }

    return(
        <div className="Form">
            <div className="Form_content">
                <div className="Form_header">
                    <h1>New Product</h1>
                    <AiOutlineCloseCircle  style={{cursor:"pointer"}} size={40} onClick={()=>setPop(false)}/>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)} encType="multipart/form-data">
                    <div className="inputs">
                        <label htmlFor="title">Product title</label>
                        <input type="text" id="title" name="title" onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="desc">Product desc</label>
                        <input type="text" id="desc" name="description" onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="Price">Product Price</label>
                        <input type="number" id="Price" name="price" onChange={(e)=>{setFormData(prev=>({...prev,price:parseInt(e.target.value)}))}}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="Image">Product Image</label>
                        <input type="file" id="Image" name="Image" onChange={(e)=>{
                                setImage(e.target.files[0]);
                            }}/>
                    </div>
                    <div className="split">
                        <div className="inputs">
                            <label htmlFor="Rate">Rate:</label>
                            <input type="number" name="rate" onChange={(e)=>{
                                setFormData(prev=>({
                                    ...prev,rating:{
                                        ...prev.rating,rate:parseInt(e.target.value)
                                    }
                                }))
                            }}/>
                        </div>
                        <div className="inputs">
                            <label htmlFor="Count">Count:</label>
                            <input type="number" name="count" onChange={(e)=>{
                                setFormData(prev=>({
                                    ...prev,rating:{
                                        ...prev.rating,count:parseInt(e.target.value) 
                                    }
                                }))
                            }}/>
                        </div>
                    </div>
                    <div className="inputs">
                        <label htmlFor="Cat">Category:</label>
                        <select name="category" id="Cat" onChange={(e)=>handleChange(e)}>
                            <option value="">Select Category</option>
                            <option value="Fiction books">Fiction books</option>
                            <option value="Educational">Educational</option>
                            <option value="Story books">Story books</option>
                            <option value="Relegious books">Relegious books</option>
                            <option value="Autobiograph">Autobiograph</option>
                            <option value="Cook Books">Cook Books</option>
                            <option value="History">History</option>
                        </select>
                    </div>
                    <div className="btn">
                        <button type="reset">Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form