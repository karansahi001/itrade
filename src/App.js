import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Homepage from './pages/Homepage/Homepage';
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import TrendingStocks from "./pages/TrendingStocks/TrendingStocks";
import Navbar from "./components/Navbar/Navbar";
import SingleStock from "./pages/SingleStock/SingleStock";
import Portfolio from "./pages/Portfolio/Portfolio";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import FindStocks from "./pages/FindStocks/FindStocks";
import './App.scss';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#41A693",
      },
      secondary: {
        main: "#41A693",
      },
      info: {
        main: "#91D9CC",
      },
      success: {
        main: "#91D9CC",
      },
      danger: {
        main: "#DE3163",
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path= "/" element={ <Homepage />} />
        <Route path= "/trending" element={ <TrendingStocks />} />
        <Route path= "/signin" element={ <SignIn />} />
        <Route path= "/signup" element={ <SignUp />} />
        <Route path= "/stocks/:ticker" element={ <SingleStock />} />
        <Route path= "/portfolio" element={ <Portfolio />} />
        <Route path= "/find-stocks" element={ <FindStocks />} />
        <Route path="*" element={ <NotFound />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
