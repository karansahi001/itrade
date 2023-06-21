// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { auth } from '../../config/firebase';
import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import cardStocks from '../../components/CardStocks/CardStocks'

const Homepage = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  dispatch(updateNav("home"));
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/stocks`)
  //       console.log(response.data.tickers)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchData();
  // }, [apiUrl])


  return (
    <main>
     <h1>Home</h1>
    </main>
  )
}

export default Homepage