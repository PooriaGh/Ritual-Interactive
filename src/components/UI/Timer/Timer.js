import React from 'react';

import ProgressRing from '../../UI/ProgressRing/ProgressRing';

import classes from './Timer.module.scss';

const Timer = (props) => {
  const { radius } = props;

  return (
    <div className={classes.timer} height={radius * 2}>
      <p className={classes.timer_text}>{props.counter}</p>
      <ProgressRing {...props} progress={props.counter * (10 / 3)} />
    </div>
  );
};

export default Timer;
