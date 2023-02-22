import { useState } from "react";
import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  expiredDate: "",
  notifStatus: false,
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialExpiredDate = localStorage.getItem("expiredDate");
  const [token, setToken] = useState(initialToken);
  const [notifStatus, setNotifStatus] = useState(false);
  const [expiredDate, setExpiredDate] = useState(initialExpiredDate);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token, data, filteredStocks) => {
    setToken(token);
    setExpiredDate(data);
    console.log(filteredStocks);
    console.log(token);
    if (filteredStocks.length > 0) setNotifStatus(true);
    else setNotifStatus(false);

    localStorage.setItem("token", token);
    localStorage.setItem("expiredDate", data);
  };

  const expirationTime = new Date(expiredDate).getTime();
  let remainingTime = calculateRemainingTime(expirationTime);
  if (remainingTime <= 0) {
    remainingTime = 0;
    localStorage.removeItem("expiredDate");
  }

  setTimeout(logoutHandler, remainingTime);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    expiredDate: expiredDate,
    notifStatus: notifStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
