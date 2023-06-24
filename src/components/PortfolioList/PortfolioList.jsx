import { LinkContainer } from 'react-router-bootstrap'

const PortfolioList = ({ ticker, todayPrice, totalValue, totalReturn }) => {
  return (
    <LinkContainer to={`/stocks/${ticker}`}>
      <tr className="align-items-center lead fs-6">
        <th scope="row" className="fw-normal py-3 align-items-center">{ticker}</th>
        <td className={`py-3 text-center`}>{todayPrice?.toLocaleString("en-US")}</td>
        <td className={`py-3 text-center`}>{totalValue?.toLocaleString("en-US")}</td>
        <td className={`py-3 text-center ${totalReturn > 0 ? "text-success" : "text-danger"}`}>${totalReturn?.toLocaleString("en-US")}</td>
      </tr>
    </LinkContainer>
  )
}

export default PortfolioList