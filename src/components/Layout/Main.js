import React, { useState } from 'react';
import AddMember from '../Features/AddMember';
import AddStore from '../Features/AddStore';
import DashBoard from '../Features/DashBoard';
import ListStores from '../Features/ListStores';
import StoresList from '../Features/StoresList';
import Subscribers from '../Features/Subscribers';
import classes from './Main.module.css';
import Sidebar from './Sidebar';
// import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const Main = () => {
  const [display, setDisplay] = useState('');
  let content;
  const mainDisplayHandler = (displayChanger) => {
    setDisplay(displayChanger);
  };
  switch (display) {
    case 'dashboard':
      content = <DashBoard />;
      break;
    case 'addStore':
      content = <AddStore />;
      break;
    case 'listStores':
      content = <StoresList />;
      break;
    case 'addMembers':
      content = <AddMember />;
      break;
    case 'listSubscribers':
      content = <Subscribers />;
      break;
    default:
      content = <DashBoard />;
  }
  return (
    <div className={classes.main__wrapper}>
      {/* side_bar Content*/}
      <div className={classes.main__siderbar}>
        <Sidebar onChangeContent={mainDisplayHandler} />
      </div>
      {/* main_content of the sidebar actions*/}
      <div className={classes.main__content}>{content}</div>
    </div>
  );
};

export default Main;
