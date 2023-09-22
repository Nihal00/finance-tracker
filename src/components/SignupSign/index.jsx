import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import PageLoader from "../PageLoader"



const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createDoc(user) {
    // //make sure the doc with uid doest exit
    // //create a doc
    setLoading(true)
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userDate = await getDoc(userRef);

    if (!userDate.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false)
      } catch (err) {
        toast.error(err.message);
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // console.log("user>>", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("user authenticated!")

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      {
        loading ? <PageLoader />
          : loginForm ?
            <>
              <SignInForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                googleAuth={googleAuth}
                setLoginForm={setLoginForm}
                loginForm={loginForm}
                setLoading={setLoading}
                navigate={navigate}
              />
            </>
            :
            <>
              <SignUpForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                setPassword={setPassword}
                loading={loading}
                googleAuth={googleAuth}
                setLoginForm={setLoginForm}
                loginForm={loginForm}
                setLoading={setLoading}
                createDoc={createDoc}
              />
            </>
      }
    </>

  )
}

export default SignupSignin
