import { Container, Typography } from '@mui/material';
import imgPlaceholder from '../../assets/placeholder-image.jpg';
import tradingB from '../../assets/trading-2.jpg';
import './WhyUs.scss'


const WhyUs = () => {
  return (
    // <section className="container py-4 mt-2">
      <Container sx={{marginTop: "3rem"}}>
      <Typography variant="h2" component="h2" color="primary.main" align="center">
          Why choose Paper Trading?
      </Typography>
      <div className="row mb-5 py-5 justify-content-center align-items-center">
        <div className="col-md-6">
          <img className="mt-5" src={tradingB} width="80%"/>
        </div>
        <div className="col-md-6">
          <ul className="list-group ">
            <li className="list-group-item d-flex justify-content-between my-2">
              <div className="ms-2 me-auto">
                <span className="badge bg-green rounded-pill">1</span>
                <div className="fw-bold text-green lead">Save money while learning to Trade</div>
                <span className="fw-normal">
                  Dive into the world of trading, gain valuable experience, and sharpen your skills without putting your hard-earned savings on the line
                </span>
                </div>
            </li>
            <li className="list-group-item d-flex justify-content-between my-2">
              <div className="ms-2 me-auto ">
                <span className="badge bg-green rounded-pill">2</span>
                <div className="fw-bold text-green lead">Practice your trading skills without risking real money</div>
                <span className="fw-normal">
                  Hone your trading skills and strategies in a risk-free environment, where you can practice, experiment, and perfect your techniques without any financial consequences
                </span>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between my-2">
              <div className="ms-2 me-auto ">
                <span className="badge bg-green rounded-pill">3</span>
                <div className="fw-bold text-green lead">Get trading experience without risking your savings</div>
                <span className="fw-normal">
                  Embark on your trading journey while keeping your savings intact. Learn the ins and outs of the market, explore investment opportunities, and make informed decisions without the worry of financial loss.
                </span>
                </div>
            </li>
          </ul>
        </div>
      </div>
      </Container>
    // </section>
  )
}

export default WhyUs