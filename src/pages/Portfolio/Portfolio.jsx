import React, { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { getDocs, collection, query, where } from "firebase/firestore";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { updatePortfolio } from '../../redux/portfolioSlice';
import { Paper, Typography } from '@mui/material';
import PortfolioList from '../../components/PortfolioList/PortfolioList';
import StocksPlaceholder from '../../components/StocksPlaceholder/StocksPlaceholder';
import './Portfolio.scss';

const Portfolio = () => {
  const [currentPriceData, setCurrentPriceData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const portfolioRef = collection(db, "stocks");
  const uid = auth.currentUser.uid;
  const q = query(portfolioRef, where("user_id", "==", uid))

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    dispatch(updateNav("portfolio"));
    const getStocksList = async () => {
      try {
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const tickersList = filteredData.map(item => item.ticker).join(",")
        const currentData = await axios.get(`${apiUrl}/stock-data/${tickersList}`)
        const joinData = filteredData.map(obj1 => {
          const matchingValue = currentData.data.tickers.find(obj2 => obj1.ticker === obj2.ticker);
          return { ...obj1, ...matchingValue }
        })
        setCurrentPriceData(joinData);
        dispatch(updatePortfolio(joinData));
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getStocksList();
  }, [])

  return (
    <main>
      <Paper elevation={3} className="portfolio-stocks">
        <Typography variant="h4" sx={{ color: "primary.main" }}>Portfolio:</Typography>
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
                <th scope="col">Today's Price</th>
                <th scope="col">Total Value</th>
                <th scope="col">Total Return</th>
              </tr>
            </thead>
            <tbody className="justify-content-center align-items-center" role='button'>
              {
                currentPriceData.map((stock) => {
                  return <PortfolioList
                    key={stock.ticker}
                    ticker={stock.ticker}
                    todayPrice={stock.day?.c}
                    totalValue={stock.day?.c * stock.qty}
                    totalReturn={stock.day?.c * stock.qty - stock.price * stock.qty}
                  />
                })
              }
            </tbody>
          </table>
          }
        </section>
      </Paper>
    </main>
  )
  
}

export default Portfolio