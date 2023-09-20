import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [token, setToken] = useState();
  const [allTasks, setAllTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logedInUser = JSON.parse(localStorage.getItem("userDetails"));
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    setUserDetails(logedInUser?.user);
    setIsLoggedIn(loggedIn);
    setToken(logedInUser?.token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setUserDetails,
        token,
        setToken,
        allTasks,
        setAllTasks,
        isLoggedIn,
        setIsLoggedIn,
        allTasks,
        setAllTasks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const TaskState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
