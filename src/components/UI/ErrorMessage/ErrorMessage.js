import React from 'react';

import {
  httpErrorTypes,
  generateHttpErrorMessage,
  generateOtherHttpErrorMessage,
} from '../../../shared/Utilities/index';

import ExclamationMark from '../../../assets/Icons/ExclamationMark.png';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = ({
  error,
  top,
  httpErrorType = httpErrorTypes.FETCHING_DATA,
}) => {
  const icon = (
    <img className={classes.error_msg_icon} src={ExclamationMark} alt="" />
  );

  let title = null;
  switch (httpErrorType) {
    case httpErrorTypes.FETCHING_DATA:
      title = generateHttpErrorMessage(error?.response?.status)?.title;
      break;
    case httpErrorTypes.VALIDATION:
      title = error;
      break;
    case httpErrorTypes.OTHER:
      title = generateOtherHttpErrorMessage(error?.response);
      break;
    default:
      title = null;
      break;
  }

  return (
    <div className={top ? classes.error_msg_top : classes.error_msg}>
      {error ? (
        top ? (
          <>
            {title}
            {icon}
          </>
        ) : (
          <>
            {icon}
            {title}
          </>
        )
      ) : null}
    </div>
  );
};

export default ErrorMessage;
