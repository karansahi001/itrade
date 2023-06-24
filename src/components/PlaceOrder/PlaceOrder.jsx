import { Button, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase';
import { addDoc, collection } from "firebase/firestore";
import StickyBox from "react-sticky-box";
import { LinkContainer } from 'react-router-bootstrap';
import './PlaceOrder.scss'

const PlaceOrder = ({ ticker, currentPrice, currentStock }) => {
  const [numShares, setNumShares] = useState("");
  const databaseRef = collection(db, "stocks");
  const userId = auth.currentUser?.uid;

  const handleOrder = async () => {
    try {
      await addDoc(databaseRef, {
        price: Number(currentPrice),
        qty: numShares,
        ticker: ticker,
        user_id: userId
      })
    } catch (err) {
      console.log(err)
    }
  }
  if (userId) {
    return (
      <StickyBox offsetTop={20} offsetBottom={20}>
        <section className="place-order-sec">
          <h5 className="text-secondary place-order-sec__head">Place Order:</h5>
          <Paper elevation={3} className="place-order">
            <div className="place-order-num">
              <h5 className="place-order-num__text fw-normal">No. of Shares:</h5>
              <input
                className="place-order-num__input"
                type="number"
                placeholder='0'
                value={numShares}
                onChange={(e) => setNumShares(Number(e.target.value))}
              />
            </div>
            <h5 className="place-order__cost fw-normal">Estimated Cost:
              <span className="fw-light ms-4">${(numShares * currentPrice).toLocaleString("en-US")} usd</span>
            </h5>
            <Button
              className="mt-4"
              variant="contained"
              sx={{ bgcolor: "secondary.main", width: "100%" }}
              onClick={handleOrder}>
              Buy {ticker}
            </Button>
            {
              currentStock ?
                <Button
                  className="mt-4"
                  variant="contained"
                  sx={{ bgcolor: "secondary.main", width: "100%" }}
                  onClick={handleOrder}>
                  Sell {ticker}
                </Button>
                : <></>
            }
          </Paper>
        </section>
      </ StickyBox>
    )
  }
  else {
    return (
      <StickyBox offsetTop={20} offsetBottom={20}>
        <section className="place-order-sec">
          <h5 className="text-secondary place-order-sec__head">Place Order:</h5>
          <Paper elevation={3} className="place-order">
            <div className="place-order-num">
              <h5 className="place-order-num__text fw-normal">No. of Shares:</h5>
              <input
                className="place-order-num__input"
                type="number"
                placeholder='0'
                defaultValue={numShares}
              />
            </div>
            <h5 className="place-order__cost fw-normal">Estimated Cost:
              <span className="fw-light ms-4">${(numShares * currentPrice).toLocaleString("en-US")} usd</span>
            </h5>
            <LinkContainer to="/signin">
              <Button
                className="mt-4"
                variant="contained"
                sx={{ bgcolor: "danger.main", width: "100%" }}>
                Login to Place an Order
              </Button>
            </LinkContainer>
          </Paper>
        </section>
      </ StickyBox>
    )
  }
}

export default PlaceOrder