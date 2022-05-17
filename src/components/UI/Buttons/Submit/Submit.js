import React from 'react';

import Button from '../Button/Button';

import classes from './Submit.module.scss';

const Submit = (props) => (
  <Button
    {...props}
    classNames={{
      default: classes.btn,
      failed: classes.btn_failed,
      succeeded: classes.btn_succeed,
    }}
  />
);

export default Submit;
