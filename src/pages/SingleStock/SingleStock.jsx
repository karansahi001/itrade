import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import StockChart from '../../components/StockChart/StockChart';
import './SingleStock.scss'
import AdditDetails from '../../components/AdditDetails/AdditDetails';
import SingleNews from '../../components/SingleNews/SingleNews';
import PlaceOrder from '../../components/PlaceOrder/PlaceOrder';
import imgPlaceholder from '../../assets/placeholder-image.jpg';
import { auth } from '../../config/firebase';

const SingleStock = () => {
  const [stockData, setStockData] = useState([]);
  const [stockPriceData, setStockPriceData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [additData, setAdditData] = useState("");
  const [imageData, setImageData] = useState("");
  const params = useParams();
  const ticker = params.ticker;
  const apiUrl = process.env.REACT_APP_API_URL;
  const imageApi = process.env.REACT_APP_IMAGE_API;
  const userId = auth.currentUser?.uid;


  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stock-data/${ticker}`)
        setStockPriceData(response.data.tickers[0])
      } catch (err) {
        console.log(err)
      }
    }

    const fetchData = () => {
      axios.get(`${apiUrl}/stocks/${ticker}`)
        .then((response) => {
          setStockData(response.data.results)
          return response.data.results
        })
        .then((res) => {
          axios.get(res.branding.icon_url, {
            responseType: 'arraybuffer',
            headers: {
              Authorization: `Bearer ${imageApi}`,
              Accept: 'image/jpeg',
            },
          })
            .then((res) => {
              const blob = new Blob([res.data], {
                type: 'image/jpeg',
              })

              const objectURL = URL.createObjectURL(blob)
              setImageData(objectURL)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const fetchAdditionalData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/additional-data/${ticker}`)
        setAdditData(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchTickNewsData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/news/${ticker}`)
        setNewsData(response.data.results)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
    fetchPriceData();
    fetchAdditionalData();
    fetchTickNewsData();

  }, [apiUrl, ticker, imageApi]);

  return (
    <main className="single-stock">
      <section className="single-section">
        {imageData ? 
          <img className="single-section__icon" src={imageData || imgPlaceholder} alt={ticker} /> :
          <img width="5%" src={imgPlaceholder} alt={ticker} /> 
        }
        <h2 className="single-section__ticker">{ticker}</h2>
        <h2 className="single-section__name text-secondary">{stockData?.name}</h2>
      </section>
      <section className="chartgraph">
        <Paper elevation={3} className="chartgraph-container">
          <h2 className="chartgraph-container__price">${stockPriceData?.day?.c?.toFixed(2)}
            <span className="text-secondary fs-5 ms-2"> USD</span>
          </h2>
          <p className="lead chartgraph-container__lead">Data might be delayed by 15 min</p>
          <StockChart ticker={ticker} />
        </Paper>
        <div className="sticky__sidebar">
        <PlaceOrder ticker={ticker} currentPrice={stockPriceData?.day?.c?.toFixed(2)} /> 
        </div>
      </section>
      <AdditDetails 
        marketCap = {additData.MarketCapitalization}
        eps={additData.EPS}
        divYield= {additData.DividendYield}
        weekHigh={additData["52WeekHigh"]}
        weekLow={additData["52WeekLow"]}
        sector={additData.Sector}
        />
        <SingleNews newsData={newsData} />
    </main>
  )
}

export default SingleStock