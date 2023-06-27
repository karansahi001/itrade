import { Paper } from '@mui/material';
import SingleNewsCont from '../SingleNewsCont/SingleNewsCont';
import StickyBox from "react-sticky-box";
import './SingleNews.scss'

const SingleNews = ({ newsData, description, ticker }) => {
  return (
    <section className='single-news-section'>
      <div className="single-news-section__left">
        <h5 className="text-secondary">Related News:</h5>
        <Paper elevation={3} className="single-news">
          <section className="single-news__section">
            {newsData && newsData.map((news, index) => {
              return <SingleNewsCont
                key={index}
                url={news.article_url}
                newsImage={news.image_url}
                title={news.title}
                summary={news.description}
                source={news.publisher.name} />
            })}
          </section>
        </Paper>
      </div>
      <div className="single-news-section__right">
        <StickyBox offsetTop={20} offsetBottom={20}>
          <h5 className="text-secondary">About {ticker}:</h5>
          <Paper elevation={3} className="about-container">
            <p className="fw-normal about-container__desc">{description || "Sorry, No Data Available"}</p>
          </Paper>
        </StickyBox>
      </div>
    </section>
  )
}

export default SingleNews