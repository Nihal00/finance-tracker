import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from "../../assets/userImg.svg"

const Header = () => {

  const [user, loading] = useAuthState(auth);
  //use loading to show the loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading])

  function logMeOutFn() {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("User Logged out Successfully!")
        navigate("/");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    } catch (e) {
      toast.error(e.message);
    }
  }


  return (
    <nav className="bg-primary px-2 py-2 sticky top-0 left-0 w-[100%] flex justify-between items-center overflow-x-hidden z-50">
      <h1 className="text-white font-semibold text-xl m-0 p-4 cursor-pointer opacity-80 hover:opacity-100 hover:transition-all hover:duration-300">FinanceTrako.</h1>
      {user &&
        (
          <div className="flex items-center gap-3">
            <img className="w-6 h-6 rounded-[50%]" src={user.photoURL ? user.photoURL : userImg} alt="" />
            <p onClick={logMeOutFn} className="text-white cursor-pointer">Logout</p>
          </div>
        )
      }
    </nav>
  )
}

export default Header
