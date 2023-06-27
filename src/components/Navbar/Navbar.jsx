import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Stack, Button, Container } from '@mui/material'
import { LinkContainer } from 'react-router-bootstrap'
import Logo from "../../assets/itrade-logo.png";
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const activeNav = useSelector((state) => state.nav.value)
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'primary.main', boxShadow: 'none' }}>
      <Toolbar sx={{ paddingTop: 2 }}>
        <Typography variant="h4" component="div" sx={{ paddingLeft: 2, flexGrow: 1 }}>
          <LinkContainer to="/">
            <img src={Logo} alt="iTrade logo" className="nav__logo" />
          </LinkContainer>
        </Typography>
        <Stack direction="row" spacing={4} sx={{ paddingRight: 2 }}>
          <LinkContainer to="/">
            <Button
              color='inherit'
              className={`nav__btn ${activeNav === 'home' ? `nav__btn--active` : ``}`}>
              Home
            </Button>
          </LinkContainer>
          <LinkContainer to="/trending">
            <Button
              color='inherit'
              className={`nav__btn ${activeNav === 'trending' ? `nav__btn--active` : ``}`}>
              Trending Stocks
            </Button>
          </LinkContainer>
          <LinkContainer to="/find-stocks">
            <Button
              color='inherit'
              className={`nav__btn ${activeNav === 'find' ? `nav__btn--active` : ``}`}>
              Find Stocks
            </Button>
          </LinkContainer>
          {
            auth.currentUser ?
              <>
                <LinkContainer to="/portfolio">
                  <Button
                    color='inherit'
                    className={`nav__btn ${activeNav === 'portfolio' ? `nav__btn--active` : ``}`}>
                    My Portfolio
                  </Button>
                </LinkContainer>
                <Button color='inherit' onClick={handleLogout}>Logout</Button>
              </>
              :
              <>
                <LinkContainer to="/signin">
                  <Button
                    color='inherit'
                    className={`nav__btn ${activeNav === 'signin' ? `nav__btn--active` : ``}`}>
                    Login
                  </Button>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Button
                    color='inherit'
                    className={`nav__btn ${activeNav === 'signup' ? `nav__btn--active` : ``}`}>
                    Sign Up
                  </Button>
                </LinkContainer>
              </>
          }
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar