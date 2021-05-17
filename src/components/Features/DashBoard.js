import React from 'react';
import DashBoardItem from './DashBoardItem';
import classes from './DashBoard.module.css';
import { MdWc, MdStore, MdEventNote, MdStar, MdTouchApp, MdPoll } from 'react-icons/md';

const DashBoard = () => {
  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboard__section}>
        <DashBoardItem title={'Total Stores'} details={'18'}>
          <MdStore size={23} color='black' />
        </DashBoardItem>
        <DashBoardItem title={'Active Stores'} details={'21'}>
          <MdPoll size={23} color='black' />
        </DashBoardItem>
      </div>
      <div className={classes.dashboard__section}>
        <DashBoardItem title={'Members'} details={'6'}>
          <MdWc size={23} color='black' />
        </DashBoardItem>
        <DashBoardItem title={'Active Members'} details={'6'}>
          <MdTouchApp size={23} color='black' />
        </DashBoardItem>
      </div>
      <div className={classes.dashboard__section}>
        <DashBoardItem title={'Orders'} details={'5'}>
          <MdEventNote size={23} color='black' />
        </DashBoardItem>
        <DashBoardItem title={'Points'} details={'21'}>
          <MdStar size={23} color='black' />
        </DashBoardItem>
      </div>
    </div>
  );
};

export default DashBoard;
