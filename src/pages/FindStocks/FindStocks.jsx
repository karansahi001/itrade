import { Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import TrendingList from '../../components/TrendingList/TrendingList';
import { updateNav } from '../../redux/navSlice';

const FindStocks = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [stocksAllData, setStocksAllData] = useState([]);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [pageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const page = 1;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNav("find"));

    const fetchAllData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all-stocks`);
        const responseData = response.data.tickers;

        setStocksAllData(responseData);

        const pages = Math.ceil(responseData.length / pageSize);
        const slicedData = responseData.slice((currentPage * pageSize) - pageSize, currentPage * pageSize);
        setPageData(slicedData);
   
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, [])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updatePageData(stocksAllData, newPage);
  };

  const updatePageData = (data, page) => {
    const slicedData = data.slice((page * pageSize) - pageSize, page * pageSize);
    setPageData(slicedData);
  };

  return (
    // className="trending-stocks"
    <Container sx={{ marginTop: "2rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h4" sx={{ color: "primary.main" }}>All Stocks:</Typography>
        <hr style={{ marginBottom: "3rem" }} />
        <section>
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
                // stocksAlldata
                // pageData.map((stock) => {
                //   return <TrendingList
                //     key={stock.ticker}
                //     ticker={stock.ticker}
                //     price={stock.day.c}
                //     priceChange={stock.todaysChange.toFixed(2)}
                //     percChange={stock.todaysChangePerc.toFixed(2)}
                //   />
                // })
              }
              {
                stocksAllData
                  .slice((currentPage * pageSize) - pageSize, currentPage * pageSize)
                  .map((stock) => {
                    return (
                      <TrendingList
                        key={stock.ticker}
                        ticker={stock.ticker}
                        price={stock.day.c}
                        priceChange={stock.todaysChange.toFixed(2)}
                        percChange={stock.todaysChangePerc.toFixed(2)}
                      />
                    );
                  })
              }
            </tbody>
          </table>
        </section>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(stocksAllData.length / pageSize)}
          onPageChange={handlePageChange}
        />

      </Paper>
    </Container>
  )
}

export default FindStocks