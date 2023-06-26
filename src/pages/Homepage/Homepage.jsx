import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { LinkContainer } from 'react-router-bootstrap';
import tradingA from '../../assets/trading-1.jpg';
import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Button } from '@mui/material';
import WhyUs from '../../components/WhyUs/WhyUs';
import OurFeatures from '../../components/OurFeatures/OurFeatures';

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
          <h1 className="display-1 mb-3" style={{ color: "#1B2D35" }}>i<span className="fw-bold">Trade</span></h1>
          <img className="img-fluid" src={tradingA} alt="hero" width="100%" />
        </div>
        <div className="d-md-none text-center mt-5">
          <h3 className="fs-4 fw-light lh-lg">
            The perfect way to practice your trading skills <br />without any financial risk.
          </h3>
          <NavLink to="/" className="btn btn-success text-white rounded btn-lg px-5 mx-2 mx-5 my-4">Try AR</NavLink>
          <NavLink to="/" className="btn btn-outline-success text-white rounded btn-lg mx-5 px-5">Products</NavLink>
        </div>
        <div className="d-none d-md-block col-md-6 text-center text-md-start">
          <Typography variant="h1" component="h2" color="primary.main">
            iTrade
          </Typography>
          <Typography variant="subtitle1" mt={3} component="p" gutterBottom={true} sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            The perfect way to practice your trading skills <br />without any financial risk.
          </Typography>
          <LinkContainer to="/signup">
            <Button 
              className="mt-4 me-3"
              variant="contained"
              sx={{ color: "white", padding: "0.6rem 2.1rem"}}
              size="large"
              >
                Get Started
            </Button>
          </LinkContainer>
          <LinkContainer to="/signin">
            <Button 
              className="mt-4"
              variant="outlined"
              size="large"
              sx={{padding: "0.6rem 2.1rem"}}
              >
                Sign in
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