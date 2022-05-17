import React from 'react';

import Spinner from '../../../UI/Spinner/Spinner';

import { buttonStatus } from '../../../../shared/Utilities/index';

const Button = (props) => {
  const btnStatusHandler = () => {
    switch (props.status) {
      case buttonStatus.failed:
        return props.classNames.failed;
      case buttonStatus.succeeded:
        return props.classNames.succeeded;
      default:
        return props.classNames.default;
    }
  };

  return (
    <button
      className={btnStatusHandler()}
      type={props.type ?? 'submit'}
      disabled={props.disabled}
      onClick={props.clicked}
    >
      <span className={props.textStyle && props.loading ? props.textStyle : ''}>
        {props.textValue}
      </span>
      <Spinner show={props.loading} color={props.color} />
    </button>
  );
};

export default Button;
