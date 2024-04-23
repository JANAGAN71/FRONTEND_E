import { configureStore,getDefaultMiddleware,combineReducers} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import Products from './ProductSlice';
import DescSlice from './DescSlice';
import CartSlice from './CartSlice';
import SocketSlice from './SocketSlice';

const middleware = [...getDefaultMiddleware(),logger];

const reducer = combineReducers({
    Products:Products,
    Desc:DescSlice,
    Cart:CartSlice,
    Socket:SocketSlice
})

const store = configureStore({
    reducer:reducer,
    middleware
})

export default store;