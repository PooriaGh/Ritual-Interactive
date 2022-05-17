import React from 'react';

import BaseModal from '../BaseModal/BaseModal';
import Login from '../../../Auth/Login/Login';

import classes from './LoginModal.module.scss';
import './LoginModal.scss';

const LoginModal = (props) => (
  <BaseModal
    show={props.show}
    modalClosed={props.modalClosed}
    modalStyles={classes.modal_login}
    modalAnimationStyles="animated-login-modal"
    hidden={true}
    zIndex={300}
    timeout={300}
  >
    <Login isModal modalClosed={props.modalClosed} />
  </BaseModal>
);

export default LoginModal;
