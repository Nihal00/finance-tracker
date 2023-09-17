import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignupSignin from './pages/Signup';
import Dashboard from "./pages/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignupSignin />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
