import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authslice';

import blReducer from '../slices/blSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,

    bl: blReducer,
  
  
  },
});

export default store;
