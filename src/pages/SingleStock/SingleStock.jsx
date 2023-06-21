import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleStock = () => {
  const [stockData, setStockData] = useState([]);
  const params = useParams();
  const ticker = params.ticker;
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`${apiUrl}/stocks/${ticker}`)
        setStockData(response.data.results)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, [apiUrl, ticker]);

  console.log(stockData)

  return (
    <main>

    </main>
  )
}

export default SingleStock