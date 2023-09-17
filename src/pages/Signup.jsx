import React from 'react';
import Header from "../components/Header";
import SignupSign from "../components/SignupSign";

const Signup = () => {
  return (
    <div>
     <Header />
     <div className="flex justify-center items-center h-[90vh]">
      <SignupSign />
     </div>
    </div>
  )
}

export default Signup
