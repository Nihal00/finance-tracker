import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AddExpense from '../components/Modals/AddExpense';
import AddIncome from '../components/Modals/AddIncome';
import { addDoc, collection, getDocs, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import TransactionTable from '../components/TransactionTable';
import ChartComponent from "../components/Charts";
import NoTransactions from "../components/NoTransactions";
import PieChart from '../components/PieChart';
import PageLoader from "../components/PageLoader";

const Dashboard = () => {

  const [transactions, setTransactions] = useState([]);
  const [loader, setLoader] = useState(true);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);



  function showExpModal() {
    setIsExpenseModalVisible(true);
  }

  function showIncomeModal() {
    setIsIncomeModalVisible(true);
  }

  function handleExpModal() {
    setIsExpenseModalVisible(false);
  }

  function handleIncomeModal() {
    setIsIncomeModalVisible(false);
  }

  function onFinish(values, type) {
    console.log("On Finish", values, type);
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseInt(values.amount),
      tag: values.tag,
      name: values.name
    };
    console.log("New Traa", newTransaction);
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Doc written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance()
    } catch (e) {
      console.log("Error adding document: ", e);
      if (!many) toast.error(`Failed to Add Transaction!`);
    }
  }

  useEffect(() => {
    //get all doc from collection
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance()
  }, [transactions])

  function calculateBalance() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income" && transaction.amount !== NaN) {
        totalIncome += transaction.amount;
      } else if(transaction.type === "expense" && transaction.amount !== NaN) {
        totalExpense += transaction.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalIncome - totalExpense);
  }

  async function fetchTransactions() {
    setLoader(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      // toast.success("Transactions Fetched!");
    }
    setLoader(false);
  }

  function deleteAll() {
    setLoader(true);
    const collectionRef = collection(db, `users/${user.uid}/transactions`);
    getDocs(collectionRef).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        deleteDoc(doc.ref).then(() => {
          console.log(`Document ${doc.id} successfully deleted.`);
        }).catch(error => {
          console.error(`Error deleting document: ${error}`);
          setLoader(false);
        });
      });
      toast.success("All The data Erased");
      setTransactions([]);
      setLoader(false);
    }).catch(error => {
      console.error(`Error getting documents from collection: ${error}`);
      toast.error(error.message);
      setLoader(false);
    });
  }

  let sortedTransaction = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      <Header />
      <>
        {
          loader ? 
          <div className="flex h-screen items-center justify-center"><PageLoader /></div>
            :
            <>
              <Cards
                income={income}
                expense={expense}
                totalBalance={totalBalance}
                showExpModal={showExpModal}
                showIncomeModal={showIncomeModal}
                deleteAll={deleteAll}
              />
              {transactions.length !== 0 ? <div className="flex flex-row">
                <ChartComponent sortedTransaction={sortedTransaction} />
                <PieChart sortedTransaction={sortedTransaction} />
              </div> : <NoTransactions />}
              <AddExpense
                isExpenseModalVisible={isExpenseModalVisible}
                handleExpModal={handleExpModal}
                onFinish={onFinish}
              />
              <AddIncome
                isIncomeModalVisible={isIncomeModalVisible}
                handleIncomeModal={handleIncomeModal}
                onFinish={onFinish}
              />
              <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions} />
            </>
           
        }
      </>

    </div>
  )
}

export default Dashboard
