import React from 'react';

import classes from './ProgressBar.module.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className={classes.progress}>
      <div className={classes.bar} style={{ width: progress + '%' }}>
        {progress === 0 ? null : (
          <div className={classes.bar_text}>{progress}%</div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
