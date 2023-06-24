import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import TrendingStocks from "./pages/TrendingStocks/TrendingStocks";
import Navbar from "./components/Navbar/Navbar";
import SingleStock from "./pages/SingleStock/SingleStock";
import UserComponent from "./pages/UserComponent";
import Portfolio from "./pages/Portfolio/Portfolio";
import NotFound from "./pages/NotFound/NotFound";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#145952",
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
        <Route path= "/test" element={ <UserComponent />} />
        <Route path= "/portfolio" element={ <Portfolio />} />
        <Route path="*" element={ <NotFound />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
