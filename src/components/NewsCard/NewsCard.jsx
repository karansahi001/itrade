import imgPlaceholder from '../../assets/placeholder-image.jpg'
import './NewsCard.scss'

const NewsCard = ({image, title, source}) => {
  return (
    <article className="main-news__card card mb-3" style={{ maxWidth: '540px', border: 'none'}}>
      <div className="row g-0 align-items-center">
        <div className="news-card col-md-4">
          <img src={image || imgPlaceholder} className="news-card__image rounded" alt="..." /> {/* img-fluid rounded object-fit-contain */}
        </div>
        <div className="col-md-8">
          <div className="card-body ms-1">
            <h5 className="card-title">{title.slice(0, 25)}...</h5>
            <p className="card-text"><small className="text-body-secondary fw-normal">Source: {source}</small></p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default NewsCard