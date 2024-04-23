import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('gets/getProducts',async () =>{
    return axios.get('http://localhost:5000/').then((res)=>{
        return res.data
    })
})

const ProductSlice = createSlice({
    name:"products",
    initialState:{
        AllProducts:[],
        products:[],
        search:'',
        loading:false
    },
    reducers:{
        searchRed:(state,action)=>{
            const { value } = action.payload;
            // return state = action.payload
            const result = state.AllProducts.filter((obj)=>{
                for(let key in obj){
                    const objVal = obj[key].toString().toLowerCase();
                    if (objVal.includes(value.toLowerCase())) {
                        return obj;
                    }
                    console.log(objVal);
                }
            })
            state.search = value
            state.products = result;
        }
    },
    extraReducers:{
        [getProducts.pending]:(state,action)=>{
            state.loading = true
        },
        [getProducts.fulfilled]:(state,action)=>{
            state.AllProducts = action.payload
            state.products = action.payload
            state.loading = false
        },
        [getProducts.rejected]:(state,action)=>{
            state.loading = false
        }
    }
})

export const {searchRed} = ProductSlice.actions;

export default ProductSlice.reducer