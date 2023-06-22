import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import StockChart from '../../components/StockChart/StockChart';
import './SingleStock.scss'

const SingleStock = () => {
  const [stockData, setStockData] = useState([]);
  const [stockPriceData, setStockPriceData] = useState([])
  const [imageData, setImageData] = useState("");
  const params = useParams();
  const ticker = params.ticker;
  const apiUrl = process.env.REACT_APP_API_URL;
  const imageApi = process.env.REACT_APP_IMAGE_API;

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

    // const fetchImage = async () => {
    //   try{
    //     const response = await axios.get(`${apiUrl}/stocks/${ticker}`)
    //     setStockData(response.data.results)
    //   }catch(err){
    //     console.log(err)
    //   }
    // }

    fetchData();
    fetchPriceData();
  }, [apiUrl, ticker]);

  console.log(stockData)

  return (
    <main className="single-stock">
      <section className="single-stock__head">
        {imageData && <img src={imageData} alt={ticker} /> }
        <h2>{ticker}</h2>
        {/* <h2><img src={stockData?.branding?.logo_url} alt={ticker} />{ticker}</h2> */}
      </section>
      <section className="chartgraph">
        <Paper elevation={3} className="chartgraph-container">
          <h2 className="chartgraph-container__price">${stockPriceData?.day?.c}
            <span className="text-secondary fs-5 ms-2"> USD</span>
          </h2>
          <p className="lead chartgraph-container__lead">Data might be delayed by 15 min</p>
          <StockChart ticker={ticker} />
        </Paper>
      </section>

    </main>
  )
}

export default SingleStock