import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import TrendingStocks from "./pages/TrendingStocks/TrendingStocks";
import Navbar from "./components/Navbar/Navbar";
import SingleStock from "./pages/SingleStock/SingleStock";

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/trending",
      element: <TrendingStocks />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/stocks/:ticker",
      element: <SingleStock />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
