import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardStocks from '../../components/CardStocks/CardStocks'
import { Grid, Paper, Typography } from '@mui/material';
import './TrendingStocks.scss'


// import { auth } from '../../config/firebase';

const TrendingStocks = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  dispatch(updateNav("trending"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stocks`)
        setData(response.data.tickers)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [apiUrl])


  return (
    <main className="trending">
      <Paper elevation={2} className="trending-stocks">
        <Typography variant="h4" sx={{color: "primary.main"}}>Trending Stocks:</Typography>
        <section>
          
        </section>
      </Paper>
      <Paper elevation={2} className="trending-watchlist">
        <Typography variant="h4" sx={{color: "primary.main"}}>Watchlist:</Typography>
      </Paper>
      
        {/* <CardStocks /> */}
    </main>
  )
}

export default TrendingStocks