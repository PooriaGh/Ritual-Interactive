import React from 'react';

import Button from '../Button/Button';

import classes from './SaveChange.module.scss';

const SaveChange = (props) => (
  <Button
    {...props}
    classNames={{
      default: classes.btn,
      failed: classes.btn_failed,
      succeeded: classes.btn_succeed,
    }}
    textStyle={classes.btn_text}
  />
);

export default SaveChange;
