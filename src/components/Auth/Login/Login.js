import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextBox from '../../UI/TextBox/TextBox';
import Submit from '../../UI/Buttons/Submit/Submit';
import ForgotPass from '../../UI/Buttons/ForgotPass/ForgotPass';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import MessageBox from '../../UI/Modals/MessageBox/MessageBox';

import axios from '../../../axios-default';
import * as actions from '../../../store/actions/index';
import {
  buttonStatus,
  httpErrorTypes,
  httpStatusCodes,
  submitButtonTextValues,
  forgotPassButtonTextValues,
  sendButtonTextValues,
  generateFormElements,
  submitForm,
} from '../../../shared/Utilities/index';

import styles from './Login.module.scss';
import smallStyles from './LoginSmall.module.scss';

export const Login = (props) => {
  const [loginForm, setLoginForm] = useState({
    username: {
      elementType: 'input',
      placeholder: 'Your Username',
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: null,
    },
    password: {
      elementType: 'input',
      placeholder: 'Your Password',
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: null,
      isPassword: true,
    },
  });
  const [error, setError] = useState(null);

  // Submit Button States
  const [submitBtnLoading, setSubmitBtnLoading] = useState(null);
  const [submitBtnTextValue, setSubmitBtnTextValue] = useState(
    submitButtonTextValues.default,
  );
  const [submitBtnStatus, setSubmitBtnStatus] = useState(buttonStatus.normal);
  const [submitBtnActive, setSubmitBtnActive] = useState(false);

  // Forgot Password Button States
  const [forgotPassBtnLoading, setForgotPassBtnLoading] = useState(null);
  const [forgotPassBtnTextValue, setForgotPassBtnTextValue] = useState(
    forgotPassButtonTextValues.default,
  );
  const [forgotPassBtnStatus, setForgotPassBtnStatus] = useState(
    buttonStatus.normal,
  );
  const [forgotPassBtnActive, setForgotPassBtnActive] = useState(false);

  // Forgot Password Button States
  const [sendBtnLoading, setSendBtnLoading] = useState(null);
  const [sendBtnTextValue, setSendBtnTextValue] = useState(
    sendButtonTextValues.default,
  );
  const [sendBtnStatus, setSendBtnStatus] = useState(buttonStatus.normal);
  const [sendBtnActive, setSendBtnActive] = useState(false);

  // Message Box States
  const [msgBoxShow, setMsgBoxShow] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (msgBoxShow) {
      const timer =
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setCounter(0);
    }
  }, [counter, msgBoxShow]);

  useEffect(() => {
    if (submitBtnLoading) {
      setSubmitBtnTextValue(submitButtonTextValues.sendingRequest);
      setSubmitBtnActive(false);
    } else {
      setSubmitBtnTextValue(submitButtonTextValues.default);
      setSubmitBtnActive(true);
    }

    if (submitBtnLoading === false) {
      setSubmitBtnActive(false);
      if (error) {
        setSubmitBtnTextValue(submitButtonTextValues.requestFailed);
        setSubmitBtnStatus(buttonStatus.failed);
      }

      var timer = setTimeout(() => {
        setSubmitBtnTextValue(submitButtonTextValues.default);
        setSubmitBtnActive(true);
        setSubmitBtnStatus(buttonStatus.normal);
        setError(null);
      }, 2000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [submitBtnLoading]);

  useEffect(() => {
    if (forgotPassBtnLoading) {
      setForgotPassBtnTextValue(forgotPassButtonTextValues.sendingRequest);
      setForgotPassBtnActive(false);
    } else {
      setForgotPassBtnTextValue(forgotPassButtonTextValues.default);
      setForgotPassBtnActive(true);
    }

    if (forgotPassBtnLoading === false) {
      setForgotPassBtnActive(false);
      if (error) {
        setForgotPassBtnTextValue(forgotPassButtonTextValues.requestFailed);
        setForgotPassBtnStatus(buttonStatus.failed);
      } else {
        setForgotPassBtnTextValue(forgotPassButtonTextValues.requestSucceeded);
        setForgotPassBtnStatus(buttonStatus.succeeded);
        msgBoxShowHandler();
      }

      var timer = setTimeout(() => {
        setForgotPassBtnTextValue(forgotPassButtonTextValues.default);
        setForgotPassBtnActive(true);
        setForgotPassBtnStatus(buttonStatus.normal);
        setError(null);
      }, 2000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [forgotPassBtnLoading]);

  useEffect(() => {
    if (sendBtnLoading) {
      setSendBtnTextValue(sendButtonTextValues.sendingRequest);
      setSendBtnActive(false);
    } else {
      setSendBtnTextValue(sendButtonTextValues.default);
      setSendBtnActive(true);
    }

    if (sendBtnLoading === false) {
      setSendBtnActive(false);
      if (error) {
        setSendBtnTextValue(sendButtonTextValues.requestFailed);
        setSendBtnStatus(buttonStatus.failed);
      } else {
        setSendBtnTextValue(sendButtonTextValues.requestSucceeded);
        setSendBtnStatus(buttonStatus.succeeded);
      }

      var timer = setTimeout(() => {
        setSendBtnTextValue(sendButtonTextValues.default);
        setSendBtnActive(true);
        setSendBtnStatus(buttonStatus.normal);
        setError(null);
        setCounter(30);
      }, 2000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [sendBtnLoading]);

  const postLogin = (formElementsObject) => {
    props.onAuthLogedin(
      formElementsObject.username.value,
      formElementsObject.password.value,
      setSubmitBtnLoading,
      setError,
      props.isModal,
      props.modalClosed,
    );
  };

  const submitedFormHandler = (event) => {
    event.preventDefault();
    submitForm(loginForm, setLoginForm, setSubmitBtnLoading, () =>
      postLogin(loginForm),
    );
  };

  const sendEmail = (setLoading) => {
    axios
      .get('Auth/ForgotPassword')
      .then((response) => {
        if (response.status === httpStatusCodes.Ok) {
          setError(null);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const forgotPasswordBtnHandler = () => {
    setForgotPassBtnLoading(true);
    sendEmail(setForgotPassBtnLoading);
  };

  const sendBtnHandler = () => {
    setSendBtnLoading(true);
    sendEmail(setSendBtnLoading);
  };

  const msgBoxShowHandler = () => {
    if (!msgBoxShow) {
      setCounter(30);
    }
    setMsgBoxShow((prevState) => !prevState);
  };

  const classes = props.isModal ? smallStyles : styles;

  const formElementsArray = generateFormElements(loginForm);

  const form = (
    <form
      className={classes.section_login_form}
      onSubmit={(event) => submitedFormHandler(event)}
    >
      {formElementsArray.map((formElement, index) => (
        <TextBox
          key={index}
          index={index}
          formElement={formElement}
          data={loginForm}
          setData={setLoginForm}
          isModal={props.isModal}
        />
      ))}
      <div className={classes.section_login_form_btns}>
        <Submit
          status={submitBtnStatus}
          disabled={!submitBtnActive}
          loading={submitBtnLoading}
          textValue={submitBtnTextValue}
        />
        {!props.isModal ? (
          <ForgotPass
            status={forgotPassBtnStatus}
            disabled={!forgotPassBtnActive}
            loading={forgotPassBtnLoading}
            textValue={forgotPassBtnTextValue}
            clicked={forgotPasswordBtnHandler}
          />
        ) : null}
      </div>
      <ErrorMessage error={error} httpErrorType={httpErrorTypes.OTHER} />
    </form>
  );

  let component = null;
  component =
    !props.isModal && props.isAuthenticated ? (
      <Redirect to="/admin" />
    ) : (
      <>
        <MessageBox
          show={msgBoxShow}
          counter={counter}
          status={sendBtnStatus}
          disabled={!sendBtnActive}
          loading={sendBtnLoading}
          textValue={sendBtnTextValue}
          sendBtnHandler={sendBtnHandler}
          msgBoxShowHandler={msgBoxShowHandler}
        />
        <section className={classes.section_login}>
          <h2 className={classes.section_login_title}>log in</h2>
          {form}
        </section>
      </>
    );

  return component;
};

const mapStateTopProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogedin: (
      user,
      pass,
      setSubmitBtnLoading,
      setError,
      isModal,
      modalClosed,
    ) =>
      dispatch(
        actions.authLogin(
          user,
          pass,
          setSubmitBtnLoading,
          setError,
          isModal,
          modalClosed,
        ),
      ),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(Login);
