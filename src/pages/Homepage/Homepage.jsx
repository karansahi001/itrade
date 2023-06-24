// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { getDocs, collection, doc } from "firebase/firestore";

const Homepage = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser)
  const portfolioRef = collection(db, "stocks")
  
  useEffect(() => {
    dispatch(updateNav("home"));
    
  },[])
  // console.log(user)
  
  useEffect(() => {
   
  }, [])


  return (
    <main>
     <h1>Home</h1>
    </main>
  )
}

export default Homepage