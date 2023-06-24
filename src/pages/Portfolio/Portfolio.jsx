import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { getDocs, collection } from "firebase/firestore";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([])
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser)
  const portfolioRef = collection(db, "stocks")

  useEffect(() => {
    dispatch(updateNav("portfolio"));
    const getStocksList = async () => {
      try {
        const data = await getDocs(portfolioRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setPortfolioData(filteredData)
      } catch (err) {
        console.log(err)
      }
    }
    getStocksList();
  }, [])

  console.log(portfolioData)
  return (
    <div>

    </div>
  )
}

export default Portfolio