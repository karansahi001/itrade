import axios from 'axios'
import React, { useEffect } from 'react'
import Auth from '../../components/Auth/Auth';
import Navbar from '../../components/Navbar/Navbar';
import { auth } from '../../config/firebase';

const Homepage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
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
      <Navbar />
    </main>
  )
}

export default Homepage