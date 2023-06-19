
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Homepage from './pages/Homepage/Homepage';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fafafa",
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
