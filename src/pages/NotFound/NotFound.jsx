import { Box, Button, Typography } from '@mui/material';

const NotFound = () =>  {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '90vh',
        backgroundColor: "white",
      }}
    >
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ color: "primary.main"}}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button href="/" variant="contained" className="mt-4">Back Home</Button>
    </Box>
  );
}

export default NotFound;