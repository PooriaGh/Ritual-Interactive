import React from 'react';

import classes from './Backdrop.module.scss';

const backdrop = (props) =>
  props.show ? (
    <div
      className={
        props.hidden ? classes.backdrop_hidden : classes.backdrop_visible
      }
      style={{ zIndex: props.zIndex }}
      onClick={props.clicked}
    ></div>
  ) : null;

export default backdrop;
