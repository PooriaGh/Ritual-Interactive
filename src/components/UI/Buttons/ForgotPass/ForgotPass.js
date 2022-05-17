import React from 'react';

import Button from '../Button/Button';

import classes from './ForgotPass.module.scss';

const ForgotPass = (props) => (
  <Button
    {...props}
    classNames={{
      default: classes.btn,
      failed: classes.btn_failed,
      succeeded: classes.btn_succeed,
    }}
    type="button"
    color="#42acea"
  />
);

export default ForgotPass;
