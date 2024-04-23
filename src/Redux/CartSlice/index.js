import { createSlice,current } from "@reduxjs/toolkit";

// import io from 'socket.io-client'


// const socket = io('http://localhost:5000');
// const socket = io('http://localhost:5000/')


const CartSlice = createSlice({
    name:"Cart",
    initialState:{
        totalCount:(localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')).length:0,
        totalAmount:0,
        items:(localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')):[]
        // {
        //     "id": 1,
        //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        //     "price": 109.95,
        //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        //     "category": "men's clothing",
        //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        //     "rating": {
        //         "rate": 3.9,
        //         "count": 120
        //     },
        //     "count":1
        // }
    },
    reducers:{
        addItem:(state,action)=>{
            state.items =  [...state.items,{...action.payload,
                count:1
            }];
            state.totalCount = state.items.length;
            localStorage.setItem('cart',JSON.stringify(state.items));
            //total
            let total = 0;
            state.items.map((item)=>{
                total += (item.count*item.price);
            })
            state.totalAmount = Math.floor(total);
        },
        removeItem:(action,state)=>{
            state.items = state.filter((elem)=>elem != action.payload)
            
            //total
            let total = 0;
            state.items.map((item)=>{
                total += (item.count*item.price);
            })
            state.totalAmount = Math.floor(total);

        },
        increment:(state,action)=>{
            let newState = state.items.map((item)=>{
                if(item.id == action.payload.id){
                    console.log("same");
                    item.count++;
                    state.totalCount++;
                    localStorage.setItem('cart',JSON.stringify(state.items));
                    return item;
                }
                else{
                    return item;
                }
            })

            //total
            let total = 0;
            state.items.map((item)=>{
                total += (item.count*item.price);
            })
            state.totalAmount = Math.floor(total);

            return state;
        
        },
        decrement:(state,action) =>{
            
            let newState = state.items.map((item)=>{
                if(item.id == action.payload.id){
                    if(item.count == 1){
                        state.items = state.items.filter(elem=>elem.id != action.payload.id)
                        state.totalCount--;
                        localStorage.setItem('cart',JSON.stringify(state.items));
                        return;
                    }
                    else{
                        item.count--;
                        state.totalCount--;
                        localStorage.setItem('cart',JSON.stringify(state.items));
                        return item;
                    }
                }
                else{
                    return item;
                }
            })

            //total
            let total = 0;
            state.items.map((item)=>{
                total += (item.count*item.price);
            })
            state.totalAmount = Math.floor(total);

            return state;
        }
    }
})

// console.log('Cart', CartSlice);

export const {addItem,removeItem,increment,decrement} = CartSlice.actions
export default CartSlice.reducer