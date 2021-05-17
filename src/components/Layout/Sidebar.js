import React from 'react';
import SidebarItem from '../UI/SidebarItem';
import classes from './Sidebar.module.css';

import {
  MdBusiness,
  MdLibraryAdd,
  MdPersonAdd,
  MdPeople,
  MdDashboard,
} from 'react-icons/md';

const Sidebar = ({ onChangeContent }) => {
  return (
    <div className={classes.sidebarContent__wrapper}>
      <div
        className={classes.sidebarContent__details}
        onClick={onChangeContent.bind(this, 'dashbord')}
      >
        <SidebarItem actionName='Dashboard'>
          <MdDashboard size={23} color='black' />
        </SidebarItem>
      </div>

      <div
        className={classes.sidebarContent__details}
        onClick={onChangeContent.bind(this, 'addStore')}
      >
        <SidebarItem actionName='Add Store'>
          <MdLibraryAdd size={23} color='black' />
        </SidebarItem>
      </div>

      <div
        className={classes.sidebarContent__details}
        onClick={onChangeContent.bind(this, 'listStores')}
      >
        <SidebarItem actionName='Stores'>
          <MdBusiness size={23} color='black' />
        </SidebarItem>
      </div>

      <div
        className={classes.sidebarContent__details}
        onClick={onChangeContent.bind(this, 'addMembers')}
      >
        <SidebarItem actionName='Add Member'>
          <MdPersonAdd size={23} color='black' />
        </SidebarItem>
      </div>

      <div
        className={classes.sidebarContent__details}
        onClick={onChangeContent.bind(this, 'listSubscribers')}
      >
        <SidebarItem actionName='Members' routePath='/subscribe/list'>
          <MdPeople size={23} color='black' />
        </SidebarItem>
      </div>

      <div className={classes.footerTag}>
        <p>@Vetro 2021</p>
      </div>
    </div>
    // </div>
  );
};

export default Sidebar;
