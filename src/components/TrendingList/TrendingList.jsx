import { LinkContainer } from 'react-router-bootstrap'

const TrendingList = ({ ticker, price, priceChange, percChange }) => {
  return (
    <LinkContainer to={`/stocks/${ticker}`}>
      <tr className="align-items-center lead fs-6">
        <th scope="row" className="fw-normal py-3 align-items-center">{ticker}</th>
        <td className={`py-3 text-center ${priceChange > 0 ? "text-success" : "text-danger"}`}>{priceChange}</td>
        <td className={`py-3 text-center ${percChange > 0 ? "text-success" : "text-danger"}`}>{percChange}</td>
        <td className="py-3 text-center">${Number(price).toFixed(2)}</td>
      </tr>
    </LinkContainer>
  )
}

export default TrendingList