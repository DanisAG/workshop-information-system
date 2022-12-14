import {useState} from "react";
import React from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

const calculateRemainingTime =(expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    
    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
}

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken)

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        console.log(token);
        localStorage.setItem('token', token);

        const remainingTime = calculateRemainingTime(expirationTime);
        console.log(remainingTime);
        setTimeout(logoutHandler, remainingTime);
    };

const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
}

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;