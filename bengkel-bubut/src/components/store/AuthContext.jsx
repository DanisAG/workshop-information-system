import { useState } from "react";
import React from "react";
import { useRef } from "react";
import { useContext } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  console.log(currentTime,"currenttime");
  console.log(adjExpirationTime,"dataTime");
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [dataLogin, setDataLogin] = useState();
  const authCtx = useContext(AuthContext);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token,data) => {
    setToken(token,data);
    setDataLogin(data);
    localStorage.setItem("token", token);
  };

  fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: JSON.stringify(dataLogin),
  })
    .then((res) => res.json())
    .then((result) => {
      result.map((data) => {
        const expirationTime = new Date(data.expiredDate).getTime();
        let remainingTime = calculateRemainingTime(expirationTime);
        if (remainingTime < 0) remainingTime = 0;
        console.log(remainingTime, "tracetime");
        setTimeout(logoutHandler, remainingTime);
      });
    });

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
