import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Paper } from '@mui/material';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import StockChart from '../../components/StockChart/StockChart';
import AdditDetails from '../../components/AdditDetails/AdditDetails';
import SingleNews from '../../components/SingleNews/SingleNews';
import PlaceOrder from '../../components/PlaceOrder/PlaceOrder';
import SigninModal from '../../components/SigninModal/SigninModal';
import imgPlaceholder from '../../assets/placeholder-image.jpg';
import './SingleStock.scss';


const SingleStock = () => {
  const [stockData, setStockData] = useState([]);
  const [stockPriceData, setStockPriceData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [additData, setAdditData] = useState("");
  const [imageData, setImageData] = useState("");
  const [findStock, setFindStock] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const portfolio = useSelector(state => state.portfolio.value)

  const apiUrl = process.env.REACT_APP_API_URL;
  const imageApi = process.env.REACT_APP_IMAGE_API;

  const ticker = params.ticker;

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stock-data/${ticker}`)
        setStockPriceData(response.data)
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
        // .then((res) => {
        //   axios.get(res.branding.icon_url, {
        //     responseType: 'arraybuffer',
        //     headers: {
        //       Authorization: `Bearer ${imageApi}`,
        //       Accept: 'image/jpeg',
        //     },
        //   })
        //     .then((res) => {
        //       const blob = new Blob([res.data], {
        //         type: 'image/jpeg',
        //       })

        //       const objectURL = URL.createObjectURL(blob)
        //       setImageData(objectURL)
        //     })
        // })
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

    if (portfolio.length > 0) {
      setFindStock(portfolio.find(stock => stock.ticker === ticker))
    }

    fetchData();
    fetchPriceData();
    fetchAdditionalData();
    fetchTickNewsData();

  }, [apiUrl, ticker, imageApi, portfolio]);

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    navigate("/portfolio")
  };
  
  const handleCloseSellModal = () => {
    setShowSellModal(false);
    navigate("/portfolio")
  };

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
        <Paper elevation={3} className="chartgraph-container" sx={{ paddingBottom: "1rem" }}>
          <h2 className="chartgraph-container__price">${stockPriceData?.c?.toFixed(2)}
            <span className="text-secondary fs-5 ms-2"> USD</span>
          </h2>
          <p className="lead chartgraph-container__lead">Data might be delayed by 15 min</p>
          <StockChart ticker={ticker} />
        </Paper>
        <div className="sticky__sidebar">
          <PlaceOrder
            ticker={ticker}
            currentPrice={stockPriceData?.c?.toFixed(2)}
            currentStock={findStock}
            setCurrentStock={setFindStock}
            setShowOrderModal={setShowOrderModal}
            setShowSellModal={setShowSellModal} />
        </div>
      </section>
      <AdditDetails
        marketCap={additData.MarketCapitalization}
        eps={additData.EPS}
        divYield={additData.DividendYield}
        weekHigh={additData["52WeekHigh"]}
        weekLow={additData["52WeekLow"]}
        sector={additData.Sector}
        ticker={ticker}
        description={stockData.description}
      />
      <SingleNews
        newsData={newsData}
        ticker={ticker}
        description={stockData.description}
      />
      <SigninModal
        title="Order Successful"
        open={showOrderModal}
        handleClose={handleCloseOrderModal}
        modalIcon={<CreditScoreOutlinedIcon sx={{ fontSize: "9rem", color: "primary.main", marginBottom: "1.4rem" }} />} 
      />
      <SigninModal
        title="Sell Order Successful"
        open={showSellModal}
        handleClose={handleCloseSellModal}
        modalIcon={<CreditScoreOutlinedIcon sx={{ fontSize: "9rem", color: "danger.main", marginBottom: "1.4rem" }} />} 
      />
    </main>
  )
}

export default SingleStock