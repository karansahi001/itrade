import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { Container, IconButton, InputAdornment, Paper, SvgIcon, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '../../components/Pagination/Pagination';
import TrendingList from '../../components/TrendingList/TrendingList';
import StocksPlaceholder from '../../components/StocksPlaceholder/StocksPlaceholder';

const FindStocks = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [stocksAllData, setStocksAllData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [pageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNav("find"));

    const fetchAllData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all-stocks`);
        const responseData = response.data.tickers;
        setStocksAllData(responseData);
        setIsLoading(false);

        const slicedData = responseData.slice((currentPage * pageSize) - pageSize, currentPage * pageSize);
        setPageData(slicedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updatePageData(stocksAllData, newPage);
  };

  const updatePageData = (data, page) => {
    const slicedData = data.slice((page * pageSize) - pageSize, page * pageSize);
    setPageData(slicedData);
  };

  const handleSearch = () => {
    return stocksAllData.filter((coin) =>
      coin.ticker.toLowerCase().includes(search)
    );
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h4" sx={{ color: "primary.main" }} mb={4}>
          All Stocks:
        </Typography>
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
          {isLoading ? (
            <>
              <StocksPlaceholder />
            </>
          ) : (
            <table className="table table-hover align-items-center mt-4">
              <thead className="table-striped text-center text-info">
                <tr>
                  <th className="text-start" scope="col">
                    Ticker
                  </th>
                  <th scope="col">24h Change</th>
                  <th scope="col">% Change</th>
                  <th scope="col">Current Price</th>
                </tr>
              </thead>
              <tbody className="justify-content-center align-items-center" role="button">
                {handleSearch()
                  .slice((currentPage * pageSize) - pageSize, currentPage * pageSize)
                  .map((stock) => (
                    <TrendingList
                      key={stock.ticker}
                      ticker={stock.ticker}
                      price={stock.day.c}
                      priceChange={stock.todaysChange.toFixed(2)}
                      percChange={stock.todaysChangePerc.toFixed(2)}
                    />
                  ))}
              </tbody>
            </table>
          )}
        </section>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(stocksAllData.length / pageSize)}
          onPageChange={handlePageChange}
        />
      </Paper>
    </Container>
  );
};

export default FindStocks;

