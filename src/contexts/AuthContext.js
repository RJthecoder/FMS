import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    return storedAuthData || { user: null, isLoggedIn: false };
  });

  const [userToken, setuserToken] = useState(() => {
    const storeUserToken = JSON.parse(localStorage.getItem("token"));
    return storeUserToken || { user: null, isLoggedIn: false };
  });

  const setloginData = (user) => {
    const newAuthData = { user, isLoggedIn: true };
    setAuthData(newAuthData);

    localStorage.setItem("authData", JSON.stringify(newAuthData));
  };

  const setLoginToken = (token) => {
    const newUserToken = { token, isLoggedIn: true };
    setuserToken(newUserToken);
    localStorage.setItem("token", JSON.stringify(newUserToken));
  };

  const logout = () => {
    const newAuthData = { user: null, isLoggedIn: false };
    setAuthData(newAuthData);

    localStorage.setItem("authData", JSON.stringify(newAuthData));
  };

  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify(authData));
  }, [authData]);

  return (
    <AuthContext.Provider value={{ ...authData, setloginData, logout, setLoginToken }}>
      {children}
    </AuthContext.Provider>
  );
};