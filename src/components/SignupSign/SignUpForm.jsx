import React from 'react';
import Button from '../Button';
import Input from '../Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import ActiveLoader from "../ButtonLoader/ActiveLoader";
import NormalLoader from "../ButtonLoader/NormalLoader";

const SignUpForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  googleAuth,
  setLoginForm,
  loginForm,
  signupToEmail,
  setLoading,
  createDoc
}) => {

  function signupToEmail() {
    setLoading(true);
    //Authenticate user
    if (name.trim() !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            toast.success("Welcome To FinanceTrako");
            setLoading(false);
            setConfirmPassword("");
            setEmail("");
            setName("");
            setPassword("");
            createDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      console.log('Please fill all the fields');
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  return (
    <div className="shadowBox w-[70%] max-w-[400px] h-auto rounded-2xl p-4">
      <h2 className="text-center text-lg py-4 px-2">Sign Up on <span className="text-primary font-semibold ">FinanceTrako</span></h2>
      <form action="">
        <Input
          type={"text"}
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
        <Input
          type={"email"}
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"JohnDoe@gmail.com"}
        />
        <Input
          type={"password"}
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"example@123"}
        />
        <Input
          type={"password"}
          label={"confirm password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"example@123"}
        />
        <Button
          disable={loading}
          text={loading ? <NormalLoader /> : "Signup Using Email and Password"}
          onClick={signupToEmail} />
        <p className="text-center text-xs m-0">or</p>
        <Button
          onClick={googleAuth}
          disable={loading}
          text={loading ? <ActiveLoader /> : "Signup Using Google"}
          blueCl={true} />
        <p className="text-center text-xs mt-2 cursor-pointer" onClick={() => setLoginForm(!loginForm)}>or have an Account Already? Click Here</p>
      </form>
    </div>
  )
}

export default SignUpForm
