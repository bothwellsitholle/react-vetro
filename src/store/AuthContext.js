import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  token: '',
  id: '',
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialId = localStorage.getItem('id');
  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(initialId);
  const isLoggedin = !!token;

  const loginHandler = (token, id) => {
    setToken(token);
    setId(id);
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
  };
  const logoutHandler = (token) => {
    setToken(null);
    setId(null);
    localStorage.removeItem('token');
  };
  const ctxState = {
    isLoggedIn: isLoggedin,
    login: loginHandler,
    logout: logoutHandler,
    token: token,
    id: id,
  };
  return (
    <AuthContext.Provider value={ctxState}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
