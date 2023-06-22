import React, { useEffect, useState } from 'react'
// import { HistoricalChart } from '../api';    api url for getting data
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const StockChart = ({ ticker }) => {

  const [pricedata, setPricedata] = useState([]);
  const [days, setDays] = useState(1);
  const apiUrl = process.env.REACT_APP_API_URL;
// try adding timestamps from and to , to check the bottom bar of the chart
  const testApi = `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=30&from=1679476980&to=1679649780&token=ci6vaa1r01quivobtnh0ci6vaa1r01quivobtnhg`

  // `${apiUrl}/stocks-chart/${ticker}`
  const fetch = async () => {
    const { data } = await axios.get(testApi)
    setPricedata(data);
  }

  useEffect(() => {
    fetch()
  }, [days])
  console.log(pricedata)

  return (
    <div className="container mt-5" style={{ width: "68vw" }}>
      <div className="row text-center">
        {/* <div className="col-12 mb-5">
          {cdays.map((cday) => {
            return (<button key={cday.value} className="btn btn-outline-info mx-4 px-4 shadow-none" onClick={() => setDays(cday.value)} value={cday.value}>{cday.label}</button>)
          })}
        </div> */}
      </div>
      <div className="row">
        <div className="col">

          {pricedata &&
            <Line
              data={{
                labels: (pricedata?.t?.map((timestamp) => {
                  let date = new Date(timestamp);
                  let time = date.getHours() > 12
                              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : new Date(date).toLocaleDateString();  
                })
                ),

                datasets: [
                  {
                    label: `${ticker.toUpperCase()} Prices in USD`,
                    data: pricedata?.c?.map((price) => price),
                    backgroundColor: "rgb(145, 217, 204)",
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
                    display: true,
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