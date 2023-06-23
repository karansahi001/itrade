import { Paper } from '@mui/material'
import './AdditDetails.scss'
import React from 'react'

const AdditDetails = ({marketCap, eps, divYield, weekHigh, weekLow, sector}) => {
    return (
        <section className="market-details">
            <h5 className="text-secondary">Additional Details:</h5>
            <Paper elevation={3} className="market-container">
                <section className="market-col">
                    <ul className="market-col__li">
                        <li>Market Cap</li>
                        <li>EPS</li>
                        <li>Dividend Yield</li>
                    </ul>
                    <ul className="market-col__la text-secondary">
                        <li className="fw-normal">${Number(marketCap)?.toLocaleString("en-US")}</li>
                        <li className="fw-normal">{eps}</li>
                        <li className="fw-normal">{divYield}%</li>
                    </ul>
                </section>
                <section className="market-col">
                    <ul className="market-col__li">
                        <li>52-week High</li>
                        <li>52-week Low</li>
                        <li>Sector</li>
                    </ul>
                    <ul className="market-col__la text-secondary">
                        <li className="fw-normal">${weekHigh}</li>
                        <li className="fw-normal">${weekLow}</li>
                        <li className="fw-normal">{sector}</li>
                    </ul>
                </section>
            </Paper>
        </section>
    )
}

export default AdditDetails