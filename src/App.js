
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import SignIn from "./components/Signin/Signin";
import SignUp from "./components/Signup/Signup";

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
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
