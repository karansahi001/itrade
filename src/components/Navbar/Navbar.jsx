import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material'
import './Navbar.scss';
import React from 'react'

const Navbar = () => {
  return (
    <AppBar position="static" sx={{bgcolor: 'white', color: 'primary.main', boxShadow: 'none'}}>
      <Toolbar sx={{paddingTop: 2}}>
        <Typography variant="h4" component="div" sx={{paddingLeft:2, flexGrow: 1}}>
          iTrade
        </Typography>
        <Stack direction="row" spacing={4} sx={{paddingRight: 2}}>
          <Button href="/" color='inherit' className="nav__btn nav__btn--active">Home</Button>
          <Button href="/trending" color='inherit' className="nav__btn">Trending Stocks</Button>
          <Button color='inherit' className="nav__btn">My Portfolio</Button>
          <Button href="/signin" color='inherit' className="nav__btn">Login</Button>
          <Button href="/signup" color='inherit' className="nav__btn">Sign Up</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar