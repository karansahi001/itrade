import "./SingleNewsCont.scss"

const SingleNewsCont = ({ url, newsImage, title, source }) => {
  return (
    <a className="text-dark" href={url} target="_blank" rel="noreferrer">
      <article className="news-article">
        <div className="news-article-img">
          <img className="news-article-img__image" src={newsImage} alt={title} />
        </div>
        <div className="news-article-info">
          <h4 className="news-article-info__title fw-normal">{title}</h4>
          <p className="news-article-info__source fw-light">Source: {source}</p>
        </div>
      </article>
    </a>
  )
}

export default SingleNewsCont