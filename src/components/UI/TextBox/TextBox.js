import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Mult from '../../../assets/Icons/Mult.png';
import ExclamationMark from '../../../assets/Icons/ExclamationMark.png';

import { checkValidity, elementTypes } from '../../../shared/Utilities/index';

import EnglishStyles from './TextBoxEN.module.scss';
import PolishStyles from './TextBoxPL.module.scss';
import './TextBox.scss';

const TextBox = (props) => {
  const classes = props.isPolish ? PolishStyles : EnglishStyles;

  const inputChangedHandler = (event, id) => {
    const password = props.data.password;

    const { isValid, message } = checkValidity(
      event.target.value,
      props.data[id].validation,
      id === 'confirm password' && password
        ? { confirmedValue: password.value }
        : {},
    );

    props.setData((prevState) => {
      return {
        ...prevState,
        ...{
          [id]: {
            ...prevState[id],
            value: event.target.value,
            valid: isValid,
            message,
          },
        },
      };
    });
  };

  const inputFocusedHandler = (id, index) => {
    const updatedFormElement = {
      ...props.data[id],
      touched: false,
    };

    const updatedContactForm = {
      ...props.data,
      ...{
        [id]: updatedFormElement,
      },
    };

    props.setData(updatedContactForm);
  };

  const inputUnfocusedHandler = (id) => {
    const { message } = checkValidity(
      props.data[id].value,
      props.data[id].validation,
    );

    const updatedFormElement = {
      ...props.data[id],
      touched: true,
      message,
    };

    const updatedContactForm = {
      ...props.data,
      ...{
        [id]: updatedFormElement,
      },
    };

    props.setData(updatedContactForm);
  };

  return (
    <>
      {props.formElement.elementType === elementTypes.input ? (
        <div className={classes.form_control}>
          <label className={classes.form_control_label}>
            {props.formElement.id}
          </label>
          <input
            className={
              !props.formElement.valid && props.formElement.touched
                ? classes.form_control_text_box_alert
                : classes.form_control_text_box
            }
            type={props.formElement.isPassword ? 'password' : 'text'}
            placeholder={props.formElement.placeholder}
            value={props.formElement.value}
            onChange={(event) =>
              inputChangedHandler(event, props.formElement.id)
            }
            onFocus={() =>
              inputFocusedHandler(props.formElement.id, props.index)
            }
            onBlur={() => inputUnfocusedHandler(props.formElement.id)}
          />
          <CSSTransition
            unmountOnExit
            mountOnEnter
            in={!props.formElement.valid && props.formElement.touched}
            timeout={200}
            classNames="animated-textbox"
          >
            <div className={classes.form_control_text_box_alert_msg}>
              <img
                className={
                  props.isModal
                    ? classes.form_control_text_box_alert_msg_cross_icon_modal
                    : classes.form_control_text_box_alert_msg_cross_icon
                }
                onClick={() => inputFocusedHandler(props.formElement.id)}
                src={Mult}
                alt=""
              />
              {props.formElement.message}
              <img
                className={classes.form_control_text_box_alert_msg_active_icon}
                src={ExclamationMark}
                alt=""
              />
            </div>
          </CSSTransition>
        </div>
      ) : props.formElement.elementType === elementTypes.textArea ? (
        <div className={classes.form_control_text_area_container}>
          <label className={classes.form_control_text_area_label}>
            {props.formElement.id}
          </label>
          <textarea
            className={
              !props.formElement.valid && props.formElement.touched
                ? classes.form_control_text_area_alert
                : classes.form_control_text_area
            }
            placeholder={props.formElement.placeholder}
            value={props.formElement.value}
            onChange={(event) =>
              inputChangedHandler(event, props.formElement.id)
            }
            onFocus={() => inputFocusedHandler(props.formElement.id)}
            onBlur={() => inputUnfocusedHandler(props.formElement.id)}
          />
          <CSSTransition
            unmountOnExit
            mountOnEnter
            in={!props.formElement.valid && props.formElement.touched}
            timeout={200}
            classNames="animated-textbox"
          >
            <div className={classes.form_control_text_area_alert_msg}>
              <img
                className={
                  props.isModal
                    ? classes.form_control_text_box_alert_msg_cross_icon_modal
                    : classes.form_control_text_box_alert_msg_cross_icon
                }
                onClick={() => inputFocusedHandler(props.formElement.id)}
                src={Mult}
                alt=""
              />
              {props.formElement.message}
              <img
                className={classes.form_control_text_box_alert_msg_active_icon}
                src={ExclamationMark}
                alt=""
              />
            </div>
          </CSSTransition>
        </div>
      ) : null}
      ,
    </>
  );
};

export default TextBox;
