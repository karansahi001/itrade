import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="md" style={{ textAlign: 'center', padding: '2.3rem' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} iTrade. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;