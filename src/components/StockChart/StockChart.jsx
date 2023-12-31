import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const StockChart = ({ ticker }) => {
  const [pricedata, setPricedata] = useState([]);
  const [days, setDays] = useState(1);
  
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetch = async () => {
      try{
        const { data } = await axios.get(`${apiUrl}/stocks-chartdata/${ticker}`)
        setPricedata(data);
      }catch(err){
        console.log(err);
      }
    }
    const interval = setInterval(() => {
      // Code to be executed every 5 minutes
      fetch();   
    }, 5 * 60 * 1000); // 5 minutes i
    fetch(); 
    return () => clearInterval(interval);
  }, [apiUrl, ticker])

  return (
    <div className="container mt-5" style={{ width: "100%" }}>
      <div className="row text-center">
      </div>
      <div className="row">
        <div className="col">
          {
          pricedata &&
            <Line
              data={{
                labels: (pricedata?.t?.map((timestamp) => {
                  let date = new Date(timestamp * 1000);
                  let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : new Date(date).toLocaleDateString(); 
                })
                ),
                datasets: [
                  {
                    label: `${ticker.toUpperCase()} Prices in USD`,
                    fill: 'none',
                    data: pricedata?.c?.map((price) => price),
                    backgroundColor: "#41A693",
                    borderColor: "#41A693",
                  }
                ]
              }}
              options={{

                elements: {

                  point: {
                    radius: 1
                  }
                },

                plugins: {
                  filler: {
                    propagate: false,
                  },
                  title: {
                    display: false,
                    text: (ctx) => 'Fill: ' + ctx.chart.data.datasets[0].fill
                  }
                },
                interaction: {
                  intersect: false,
                }
              }}

            />
          }
        </div>
      </div>
    </div>
  )
}

export default StockChart



