import { Typography, Grid, Paper, Container, SvgIcon, Icon } from '@mui/material';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const OurFeatures = () => {
  return (
    <Container sx={{marginBottom: "6rem"}}>
      <Typography variant="h2" component="h2" color="primary.main" align="center" mb={5}>
        Our Features
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ height: '100%', padding: '1rem', textAlign: "center" }} >
            <SvgIcon component={NewspaperOutlinedIcon} sx={{color: "primary.main", fontSize: "13rem", paddingTop: "2rem"}}></SvgIcon>
            <Typography variant="h5" component="h2" color="primary.main" align="center" my={5} px={3} sx={{fontWeight: "300"}}>
              Get Latest News related to your investments
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ height: '100%', padding: '1rem', textAlign: "center" }}>
            <SvgIcon component={LockOutlinedIcon} sx={{color: "primary.main", fontSize: "12rem", paddingTop: "2rem"}}></SvgIcon>
            <Typography variant="h5" component="h2" color="primary.main" align="center" mt={7} px={3} sx={{fontWeight: "300"}}>
              Your Data is Secure, we use Firebase by Google
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ height: '100%', padding: '1rem', textAlign: "center" }}>
            <SvgIcon component={AssessmentOutlinedIcon} sx={{color: "primary.main", fontSize: "12rem",  paddingTop: "2rem"}}></SvgIcon>
            <Typography variant="h5" component="h2" color="primary.main" align="center" mt={7} px={3} sx={{fontWeight: "300"}}>
              Get Advanced Charts for Analysis
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default OurFeatures