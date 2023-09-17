import React from 'react';
import Button from '../Button';
import Input from '../Input';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ActiveLoader from "../ButtonLoader/ActiveLoader";
import NormalLoader from "../ButtonLoader/NormalLoader";

const SignInForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  googleAuth,
  setLoginForm,
  loginForm,
  setLoading,
  navigate
}) => {

  function loginUsingEmail() {
    setLoading(true)
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("user Logged in", user);
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false)
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory!")
      setLoading(false)
    }
  }

  return (
    <div className="shadowBox w-[70%] max-w-[400px] h-auto rounded-2xl p-4">
      <h2 className="text-center text-lg py-4 px-2">Login in to <span className="text-primary font-semibold ">FinanceTrako</span></h2>
      <form action="">
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
        <Button
          disable={loading}
          text={loading ? <NormalLoader /> : "Login Using Email and Password"}
          onClick={loginUsingEmail} />
        <p className="text-center text-xs m-0">or</p>
        <Button
          onClick={googleAuth}
          disable={loading}
          text={loading ? <ActiveLoader /> : "Login Using Google"}
          blueCl={true} />
        <p className="text-center text-xs mt-2 cursor-pointer" onClick={() => setLoginForm(!loginForm)} >or Don't have an Account? Click Here</p>
      </form>
    </div>
  )
}

export default SignInForm
