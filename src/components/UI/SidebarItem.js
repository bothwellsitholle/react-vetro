import React from 'react';
import classes from './SidebarItems.module.css';

const SidebarItem = ({ actionName, routePath, children }) => {
  return (
    <div className={classes.sidebarContent__actions}>
      <div className={classes.sidebarContent__item}>
        <div>{children}</div>
        <div className={classes.sidebarContent__text}>
          <p>{actionName}</p>
        </div>
      </div>
    </div>
  );
};
// activeClassName={classes.sidebarContent__active}
export default SidebarItem;
