import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import TextBox from '../../UI/TextBox/TextBox';
import SubmitBtn from '../../UI/Buttons/Submit/Submit';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

import axios from '../../../axios-default';
import {
  buttonStatus,
  submitButtonTextValues,
  httpErrorTypes,
  httpStatusCodes,
  generateFormElements,
  submitForm,
} from '../../../shared/Utilities/index';

import classes from './Profile.module.scss';

export const Profile = () => {
  const [profileForm, setProfileForm] = useState({
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
    'confirm password': {
      elementType: 'input',
      placeholder: 'Your Confirm Password',
      value: '',
      validation: {
        required: true,
        isConfirmed: true,
      },
      valid: false,
      touched: false,
      message: null,
      isPassword: true,
    },
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [submit, setSubmit] = useState(submitButtonTextValues.default);
  const [btnStatus, setBtnStatus] = useState(buttonStatus.normal);
  const [submitBtnActive, setSubmitBtnActive] = useState(false);
  const [secret, setSecret] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { token } = useParams();
  useEffect(() => {
    setSecret(token);
  }, [token]);

  useEffect(() => {
    if (loading) {
      setSubmit(submitButtonTextValues.sendingRequest);
      setSubmitBtnActive(false);
    } else {
      setSubmit(submitButtonTextValues.default);
      setSubmitBtnActive(true);
    }

    if (loading === false) {
      setSubmitBtnActive(false);
      if (error) {
        setSubmit(submitButtonTextValues.requestFailed);
        setBtnStatus(buttonStatus.failed);
      }

      var timer = setTimeout(() => {
        setSubmit(submitButtonTextValues.default);
        setSubmitBtnActive(true);
        setBtnStatus(buttonStatus.normal);
      }, 2000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [loading]);

  const postProfile = (axios, profileForm) => {
    const body = {
      newName: profileForm.username.value,
      newPassword: profileForm.password.value,
      secret: secret,
    };
    axios
      .post('Auth/ResetPassword', body)
      .then((response) => {
        setError(null);
        setLoading(false);
        if (response.status === httpStatusCodes.Ok) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const submitedFormHandler = (event) => {
    event.preventDefault();
    submitForm(profileForm, setProfileForm, setLoading, () =>
      postProfile(axios, profileForm),
    );
  };

  const formElementsArray = generateFormElements(profileForm);

  const form = (
    <form
      className={classes.section_profile_form}
      onSubmit={(event) => submitedFormHandler(event)}
    >
      {formElementsArray.map((formElement, index) => (
        <TextBox
          key={index}
          index={index}
          formElement={formElement}
          data={profileForm}
          setData={setProfileForm}
        />
      ))}
      <div className={classes.section_profile_form_btns}>
        <SubmitBtn
          status={btnStatus}
          disabled={!submitBtnActive}
          loading={loading}
          textValue={submit}
        />
      </div>
      <ErrorMessage error={error} httpErrorType={httpErrorTypes.OTHER} />
    </form>
  );

  let component = null;
  component = redirect ? (
    <Redirect to="/login" />
  ) : (
    <section className={classes.section_profile}>
      <h2 className={classes.section_profile_title}>user profile</h2>
      {form}
    </section>
  );

  return component;
};

export default Profile;
