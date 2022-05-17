import React from 'react';

import classes from './Spinner.module.scss';

const SpinnerLarge = (props) => {
  const ratio = props.ratio ?? 1;

  const dimensions = {
    width: `${2.8 * ratio}rem`,
    height: `${2 * ratio}rem`,
    innerWidth: `${0.6 * ratio}rem`,
    innerHeight: `${1.4 * ratio}rem`,
  };

  const styles = {
    width: dimensions.width,
    height: dimensions.height,
  };

  const innerStyles = {
    width: dimensions.innerWidth,
    height: dimensions.innerHeight,
    backgroundColor: props.color ?? '#1a1a1e',
  };

  return (
    <>
      {props.show ? (
        <div className={classes.main} style={styles}>
          <div className={classes.item1} style={innerStyles} />
          <div className={classes.item2} style={innerStyles} />
          <div className={classes.item3} style={innerStyles} />
        </div>
      ) : null}
    </>
  );
};

export default SpinnerLarge;
