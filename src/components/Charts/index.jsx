import React, { useState } from 'react';
import { btn } from "../style";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

const ChartComponent = ({ sortedTransaction }) => {

  const [typeChart, setTypeChart] = useState(false);

  let sortedData = sortedTransaction.map((item) => {
    return { date: item.date, amount: item.amount }
  })

  // const labels = sortedData.map((item) => new Date(item.date).getUTCFullYear());
  function ExpenseData() {
    return sortedTransaction.map((item) => {
      if (item.type === "expense") {
        return item.amount;
      }
    })
  }

  function IncomeData() {
    return sortedTransaction.map((item) => {
      if (item.type === "income") {
        return item.amount;
      }
    })
  }

  const data = {
    labels: sortedData.map((item) => item.date),
    datasets: typeChart ?
      [
        {
          label: 'Expense',
          data: ExpenseData(),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Income',
          data: IncomeData(),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ] : [
        {
          label: 'Cash Flow',
          data: sortedTransaction.map((item) => item.amount),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235)',
        },
      ],
  };

  return (
    <div className='w-[58%] p-8 my-8 ml-8 mr-4 bg-white shadowBox flex flex-col justify-between'>
      <h1 className="font-bold text-lg">{typeChart ? "Income Expense Analytics" : "Cash Flow Analytics"}</h1>
      
      {
        typeChart ? <Bar data={data} /> : <Line data={data} />
      }
      <p className={`${btn.btnActive} `} onClick={() => setTypeChart(!typeChart)}>{typeChart ? "Line Chart" : "Bar Chart"}</p>
    </div>
  )
}

export default ChartComponent
