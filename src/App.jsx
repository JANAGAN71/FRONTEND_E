import React, { useEffect } from 'react';
import './App.scss';
import Home from './Screens/Home';
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import { getProducts } from './Redux/ProductSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './Screens/Description';
import Cart from './Screens/Cart';
import LoginPage from './Screens/Login';


function App() {
  const socket = useSelector(state=>state.Socket.socket)
  const dispatch = useDispatch();
  const {products,loading} = useSelector(state => state.Products);

  useEffect(()=>{
    dispatch(getProducts());
    socket.emit('call');
  },[dispatch])

  return (  
    <Router>
        <div className="App">
            <Routes>
              <Route path='/Ecommerce' element={<Home/>} />
              <Route path='/ProductDetails' element={<Description/>}/>
              <Route path='/Cart' element={<Cart/>}/>
              <Route path='/Login' element={<LoginPage />}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
