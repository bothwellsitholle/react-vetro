import React from 'react';
import classes from './DashBoardItem.module.css';

const DashBoardItem = ({ title, details, children }) => {
  return (
    <div className={classes.Item__wrapper}>
      <div className={classes.Item__content__wrapper}>
        <div className={classes.Item__icon__wrapper}>
          <div>{children}</div>
        </div>
        <div className={classes.Item__details}>
          <h3>{title}</h3>
          <h2>{details}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashBoardItem;
