import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { Paper, Typography } from '@mui/material';
import TrendingList from '../../components/TrendingList/TrendingList';
import NewsCard from '../../components/NewsCard/NewsCard';
import NewsPlaceholder from '../../components/NewsPlaceholder/NewsPlaceholder';
import StocksPlaceholder from '../../components/StocksPlaceholder/StocksPlaceholder';
import './TrendingStocks.scss'

const TrendingStocks = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNav("trending"));
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stocks`)
        setData(response.data.tickers)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
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
        <Typography variant="h4" sx={{ color: "primary.main" }}>Trending Stocks:</Typography>
        <hr style={{ marginBottom: "3rem" }} />
        <section>
          {
            isLoading ?
             <StocksPlaceholder />
              :
              <table className="table table-hover align-items-center mt-4">
                <thead className="table-striped text-center text-info">
                  <tr>
                    <th className="text-start" scope="col">Ticker</th>
                    <th scope="col">24h Change</th>
                    <th scope="col">% Change</th>
                    <th scope="col">Current Price</th>
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
          }
        </section>
      </Paper>
      <Paper elevation={3} className="trending-watchlist">
        <Typography variant="h4" sx={{ color: "primary.main" }}>Market News:</Typography>
        <hr />
        <section className="trending-news__list mt-4">
          {isLoading ?
            <>
              <NewsPlaceholder />
            </>
            :
            newsData.map((article, index) => {
              return (
                <a key={index} href={article.article_url} target="_blank" className="news-list__item" rel="noreferrer">
                  <NewsCard
                    image={article.image_url}
                    title={article.title}
                    source={article?.publisher?.name}
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