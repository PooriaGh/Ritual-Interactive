import React from 'react';

import BaseModal from '../BaseModal/BaseModal';

import classes from './Modal.module.scss';
import './Modal.scss';

const Modal = (props) => (
  <BaseModal
    show={props.show}
    modalClosed={props.modalClosed}
    modalStyles={`${classes.modal_default} ${props.class}`}
    modalAnimationStyles="animated-modal"
    noBackdrop={props.noBackdrop}
    hidden={props.hidden}
    zIndex={props.zIndex}
    timeout={100}
  >
    {props.children}
  </BaseModal>
);

export default Modal;
