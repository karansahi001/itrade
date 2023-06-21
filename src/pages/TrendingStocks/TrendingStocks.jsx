import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material';
import TrendingList from '../../components/TrendingList/TrendingList';
import NewsCard from '../../components/NewsCard/NewsCard';
import './TrendingStocks.scss'


// import { auth } from '../../config/firebase';

const TrendingStocks = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const [newsData, setNewsData] = useState([]);

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
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/news`)
        setNewsData(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
    fetchNewsData();
  }, [apiUrl])

  return (
    <main className="trending">
      <Paper elevation={3} className="trending-stocks">
        <Typography variant="h4" sx={{ color: "primary.main"}}>Trending Stocks:</Typography>
        <hr style={{marginBottom: "3rem" }}/>
        <section>
          <table className="table table-hover align-items-center mt-4">
            <thead className="table-striped text-center text-info">
              <tr>
                <th className="text-start" scope="col">Ticker</th>
                <th scope="col">Current Price</th>
                <th scope="col">24h Change</th>
                <th scope="col">% Change</th>
              </tr>
            </thead>
            <tbody className="justify-content-center align-items-center" role='button'>
              {
                data.map((stock) => {
                  return <TrendingList
                    key={stock.ticker}
                    ticker={stock.ticker}
                    price={stock.day.c}
                    priceChange={stock.todaysChange.toFixed(2)}
                    percChange={stock.todaysChangePerc.toFixed(2)}
                  />
                })
              }
            </tbody>
          </table>
        </section>
      </Paper>
      <Paper elevation={3} className="trending-watchlist">
        <Typography variant="h4" sx={{ color: "primary.main" }}>Market News:</Typography>
        <hr />
        <section className="trending-news__list mt-4">
          {
            newsData.map((article, index) => {
              return (
              <a key={index} href={article.url} target="_blank" className="news-list__item" rel="noreferrer">
                <NewsCard 
                  image={article.banner_image}
                  title={article.title}
                  source={article.source}
                />
              </a>
              )
            })
          }
        </section>
      </Paper>
    </main>
  )
}

export default TrendingStocks