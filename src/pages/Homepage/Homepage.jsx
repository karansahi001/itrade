import { useEffect } from 'react';
import { auth } from '../../config/firebase';
import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { LinkContainer } from 'react-router-bootstrap';
import WhyUs from '../../components/WhyUs/WhyUs';
import OurFeatures from '../../components/OurFeatures/OurFeatures';
import tradingA from '../../assets/trading-1.jpg';
import Logo from "../../assets/itrade-logo.png";
import "./Homepage.scss";

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateNav("home"));
  }, [])

  return (
    <>
      <section className="container py-4">
        <div className="row mx-2 py-5 justify-content-center align-items-center">
          <div className="text-center col-10 d-md-none">
            <Typography variant="h2" component="h2" color="primary.main" sx={{marginBottom: "1rem"}}>
              <img src={Logo} alt="iTrade Logo" className="hero-logo" />
              iTrade
            </Typography>
            <img className="img-fluid" src={tradingA} alt="hero" width="100%" />
          </div>
          <div className="d-md-none text-center mt-5">
            <h3 className="fs-4 fw-light lh-lg">
              The perfect way to practice your trading skills <br />without any financial risk.
            </h3>
            <LinkContainer to={auth.currentUser ? "/trending" : "/signup"}>
              <Button
                className="mt-4 me-3"
                variant="contained"
                sx={{ color: "white", padding: "0.6rem 2.1rem" }}
                size="large"
              >
                {auth.currentUser ? "Explore" : "Get Started"}
              </Button>
            </LinkContainer>
            <LinkContainer to={auth.currentUser ? "/find-stocks" : "/signin"}>
              <Button
                className="mt-4"
                variant="outlined"
                size="large"
                sx={{ padding: "0.6rem 2.1rem" }}
              >
                {auth.currentUser ? "Find Stocks" : "Log in"}
              </Button>
            </LinkContainer>
          </div>
          <div className="d-none d-md-block col-md-6 text-center text-md-start">
            <Typography variant="h1" component="h2" color="primary.main">
              <img src={Logo} alt="iTrade Logo" className="hero-logo" />
              iTrade
            </Typography>
            <Typography variant="subtitle1" mt={3} component="p" gutterBottom={true} sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
              The perfect way to practice your trading skills <br />without any financial risk.
            </Typography>
            <LinkContainer to={auth.currentUser ? "/trending" : "/signup"}>
              <Button
                className="mt-4 me-3"
                variant="contained"
                sx={{ color: "white", padding: "0.6rem 2.1rem" }}
                size="large"
              >
                {auth.currentUser ? "Explore" : "Get Started"}
              </Button>
            </LinkContainer>
            <LinkContainer to={auth.currentUser ? "/find-stocks" : "/signin"}>
              <Button
                className="mt-4"
                variant="outlined"
                size="large"
                sx={{ padding: "0.6rem 2.1rem" }}
              >
                {auth.currentUser ? "Find Stocks" : "Log in"}
              </Button>
            </LinkContainer>
          </div>
          <div className="col-md-5 d-none d-md-block">
            <img src={tradingA} alt="hero" width="100%" />
          </div>
        </div>
      </section>
      <WhyUs />
      <OurFeatures />
    </>
  )
}

export default Homepage