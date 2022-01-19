import { createContext, useState } from "react";
import { createAccount, login } from "../services/apiFactory";
import { useRouter } from "next/router";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [authIsLoading, setAuthIsLoading] = useState(false);
  const [errors, setErrors] = useState({ message: "", status: null });
  const [success, setSuccess] = useState({ message: "", status: null });


  const router = useRouter()

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.setItem('user',null)
  };



  const signUpUser = (data) => {
    createAccount(data)
      .then((res) => {
        setErrors(null);
        setSuccess(res.data.success);
        router.push('/login')
      })
      .catch((err) => {
        setSuccess(null);
        setErrors(err.response.data.error);
      })
  };
  const loginUser = (data) => {
    login(data)
      .then((res) => {
        console.log(res);
        setErrors(null);
        setSuccess(res.data.success);
        setCurrentUser(res.data.success.user)
        localStorage.setItem('token',res.data.success.user.access_token)
        localStorage.setItem('user',JSON.stringify(res.data.success.user))
        router.push('/dashboard')
      })
      .catch((err) => {
        console.log("Err", err);
        setSuccess(null);
        setErrors(err.response.data.error);
      });
  };

  
  const checkLogin = () => {
      console.log('checking')
};

  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    authIsLoading,
    setAuthIsLoading,
    handleLogout,
    signUpUser,
    errors,
    success,
    loginUser,
    setErrors,
    setSuccess,
    currentUser,
    setCurrentUser,
    checkLogin,
  };
  return (
    <UserContext.Provider value={stateValues}>{children}</UserContext.Provider>
  );
};
