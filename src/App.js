import React, { useContext } from 'react';
import classes from './App.module.css';
import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
// import AuthForm from './components/Auth/AuthForm';
import Login from './components/Auth/Login';
import AuthContext from './store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className={classes.mainApp}>
      {/* Header */}
      <Header />

      {/* Auth Page */}
      {!isLoggedIn && <Login />}
      
      {/* Main_section */}
      {isLoggedIn && <Main />}
    </div>
  );
}

export default App;
