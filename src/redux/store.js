import { configureStore } from '@reduxjs/toolkit'
import navReducer from './navSlice'
import userReducer from './userSlice'


export const store = configureStore({
  reducer: {
    nav: navReducer,
    user: userReducer,
  },
})