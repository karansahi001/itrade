import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material'
import './Navbar.scss';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';


const Navbar = () => {
  const navigate= useNavigate();
  const activeNav = useSelector((state) => state.nav.value)
  const handleLogout = async () => {
    try{
      await signOut(auth);
      navigate("/");
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'primary.main', boxShadow: 'none' }}>
      <Toolbar sx={{ paddingTop: 2 }}>
        <Typography variant="h4" component="div" sx={{ paddingLeft: 2, flexGrow: 1 }}>
          iTrade
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
          <LinkContainer to="/portfolio">
            <Button
              color='inherit'
              className={`nav__btn ${activeNav === 'portfolio' ? `nav__btn--active` : ``}`}>
              My Portfolio
            </Button>
          </LinkContainer>
          {
            auth.currentUser ?
              <Button color='inherit' onClick={handleLogout}>Logout</Button>
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