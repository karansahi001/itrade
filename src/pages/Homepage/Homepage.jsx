import axios from 'axios'
import React, { useEffect } from 'react'

const Homepage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stocks`)
        console.log(response.data.tickers)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [apiUrl])

  return (
    <div>

    </div>
  )
}

export default Homepage