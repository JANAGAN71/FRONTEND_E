import { createSlice } from "@reduxjs/toolkit";

import io from 'socket.io-client'


// const socket = io('http://localhost:5000');
const socket = io('https://ecommerce-backend-ozyi.onrender.com')

const SocketSlice = createSlice({
    name:"Socket",
    initialState:{
        socket:socket
    },
    reducers:{

    }
})

export default SocketSlice.reducer