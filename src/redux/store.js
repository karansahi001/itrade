import { configureStore } from '@reduxjs/toolkit'
import navReducer from './navSlice'
import userReducer from './userSlice'
import portfolioReducer from './portfolioSlice'


export const store = configureStore({
  reducer: {
    nav: navReducer,
    user: userReducer,
    portfolio: portfolioReducer,
  },
})