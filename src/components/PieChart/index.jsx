import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { btn } from '../style';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ sortedTransaction }) => {
  const [pieType, setPieType] = useState(true);
  const [incomeChart, setIncomeChart] = useState(true);
  const [expenseChart, setExpenseChart] = useState(false);

  let spendingData = sortedTransaction.filter((transaction) => {
    if (transaction.type.toLowerCase() === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  })

  let earningData = sortedTransaction.filter((transaction) => {
    if (transaction.type === "income") {
      return{ tag: transaction.tag , amount: transaction.amount} ;
    }
  })

  let expTags = {
    office: 0,
    education: 0,
    food: 0,
  };

  let incomeTag = {
    salary: 0,
    freelancer: 0,
    investment: 0,
  };

  for(let value of Object.values(spendingData)) {
    if(value.tag === "office") {
      expTags.office += parseInt(value.amount);
    } else if (value.tag === "education") {
      expTags.education += parseInt(value.amount);
    } else if (value.tag === "food" ) {
      expTags.food += parseInt(value.amount);
    }
  }

  for (let ele of Object.values(earningData)) {
    if (ele.tag === "salary") {
      incomeTag.salary = incomeTag.salary + ele.amount;
    } else if (ele.tag === "freelance") {
      incomeTag.freelancer = incomeTag.freelancer + ele.amount;
    } else if (ele.tag === "investment") {
      incomeTag.investment = incomeTag.investment + ele.amount;
    }
  }

  const data = {
    labels: incomeChart ? ["Salary", "Freelancer", "Investment"] : ["Office", "Education", "Food"],
    datasets: [
      {
        label: expenseChart ? 'Expense' : "Earning",
        data: expenseChart ? [expTags.office, expTags.education, expTags.food] : [incomeTag.salary, incomeTag.freelancer, incomeTag.investment],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[35%] p-8 my-8 ml-4 mr-8 bg-white shadowBox flex flex-col justify-between ">
      <h1 className='font-bold text-lg'>{incomeChart ? "Your Earning" : "Your Spending"}</h1>
      <div className="flex justify-center gap-4">
        <button onClick={() => {setIncomeChart(true); setExpenseChart(false)}} className={incomeChart ? btn.btnNormal : btn.btnActive}>Income</button>
        <button onClick={() => {setIncomeChart(false); setExpenseChart(true)}} className={incomeChart ? btn.btnActive : btn.btnNormal}>Expense</button>
      </div>
      {
        pieType ? <Pie data={data} /> : <Doughnut data={data} />
      }
      <p className={`${btn.btnActive} mt-8`} onClick={() => setPieType(!pieType)}>{pieType ? "Doughnut Chart" : "Pie Chart"}</p>
    </div>
  )
}

export default PieChart
