import React, { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './Header.module.css';
// import { NavLink, BrowserRouter as Router } from 'react-router-dom';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const isloggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={classes.header__wrapper}>
      <div>
        <img
          src='https://www.vetro.co.za/wp-content/uploads/2017/09/VetroMedia-WhiteLogo.png'
          alt=''
        />
      </div>
      <nav className={classes.header__nav}>
        {isloggedIn && <button onClick={logoutHandler}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
