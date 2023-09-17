import React from 'react';
import CardImg from "../../assets/card.svg";

const NoTransactions = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col mb-8">
      <img src={CardImg} alt="card" className="w-[300px]" />
      <p className="text-center text-xl">You Have No Transactions Currently</p>
    </div>
  )
}

export default NoTransactions
