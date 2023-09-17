import React from 'react';
import { Row } from 'antd';
import Card from 'antd/es/card/Card';
import Button from '../Button';

const Cards = ({ 
    income, 
    expense, 
    totalBalance,
    showExpModal, 
    showIncomeModal,
    deleteAll
}) => {
    return (
        <div>
            <Row className="flex justify-between items-center my-4 mx-auto p-8 gap-4 lg:grid lg:grid-cols-3">
                <Card
                    className="shadowBox w-full  lg:w-[100%] ">
                    <h1 className="font-semibold text-lg">Current Balance</h1>
                    <p className="m-0 font-medium">₹ {totalBalance}</p>
                    <Button text="Reset Balance" blueCl={true} onClick={deleteAll} />
                </Card>
                <Card
                    className="shadowBox w-full  lg:w-[100%] ">
                    <h1 className="font-semibold text-lg">Total Income</h1>
                    <p className="m-0 font-medium">₹ {income}</p>
                    <Button text="Add Income" blueCl={true} onClick={showIncomeModal} />
                </Card>
                <Card
                    className="shadowBox w-full lg:w-[100%] ">
                    <h1 className="font-semibold text-lg">Total Expense</h1>
                    <p className="m-0 font-medium">₹ {expense}</p>
                    <Button text="Add Expense" blueCl={true} onClick={showExpModal} />
                </Card>
            </Row>
        </div>
    )
}

export default Cards
