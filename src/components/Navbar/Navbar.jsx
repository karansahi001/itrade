import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material'
import './Navbar.scss';
import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {

  const activeNav = useSelector((state) => state.nav.value)
  console.log(activeNav)
  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'primary.main', boxShadow: 'none' }}>
      <Toolbar sx={{ paddingTop: 2 }}>
        <Typography variant="h4" component="div" sx={{ paddingLeft: 2, flexGrow: 1 }}>
          iTrade
        </Typography>
        <Stack direction="row" spacing={4} sx={{ paddingRight: 2 }}>
          <Button
            href="/"
            color='inherit'
            className={`nav__btn ${activeNav === 'home' ? `nav__btn--active` : ``}`}>
            Home
          </Button>
          <Button
            href="/trending"
            color='inherit'
            className={`nav__btn ${activeNav === 'trending' ? `nav__btn--active` : ``}`}>
            Trending Stocks
          </Button>
          <Button 
            color='inherit' 
            className={`nav__btn ${activeNav === 'portfolio' ? `nav__btn--active` : ``}`}>
            My Portfolio
          </Button>
          <Button 
            href="/signin" 
            color='inherit' 
            className={`nav__btn ${activeNav === 'signin' ? `nav__btn--active` : ``}`}>
            Login
          </Button>
          <Button 
            href="/signup" 
            color='inherit' 
            className={`nav__btn ${activeNav === 'signup' ? `nav__btn--active` : ``}`}>
            Sign Up
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar