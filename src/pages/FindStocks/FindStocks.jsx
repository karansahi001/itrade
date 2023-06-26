import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import Pagination from '../../components/Pagination/Pagination';
import TrendingList from '../../components/TrendingList/TrendingList';
import { Container, IconButton, InputAdornment, Paper, SvgIcon, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';

const FindStocks = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [stocksAllData, setStocksAllData] = useState([]);
  // const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [pageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [search,setSearch] = useState("");
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

  const handleSearch = () => {
    return stocksAllData.filter(
      (coin) =>
        coin.ticker.toLowerCase().includes(search)
    );
  }

  return (
    // className="trending-stocks"
    <Container sx={{ marginTop: "2rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h4" sx={{ color: "primary.main" }} mb={4}>All Stocks:</Typography>
        <section>
          <OutlinedInput
            onChange={(e) => setSearch(e.target.value)} 
            value={search}
            placeholder="Search any Stock Ticker"
            fullWidth={true}
            startAdornment={
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            >
          <SvgIcon searchIcon={SearchIcon}></SvgIcon>
          </OutlinedInput>
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
                // stocksAllData
                handleSearch()
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