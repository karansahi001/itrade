import { Paper } from '@mui/material'
import SingleNewsCont from '../SingleNewsCont/SingleNewsCont'
import './SingleNews.scss'

const SingleNews = ({newsData}) => {
  return (
    <section className='single-news-section'>
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
    </section>
  )
}

export default SingleNews