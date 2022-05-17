import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../../Backdrop/Backdrop';

import Mult from '../../../../assets/Icons/Mult.png';

import classes from './BaseModal.module.scss';
import './BaseModal.scss';

const BaseModal = (props) => (
  <>
    {props.noBackdrop ? null : (
      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={props.show}
        timeout={200}
        classNames="animated-backdrop"
      >
        <Backdrop
          show={props.show}
          clicked={props.modalClosed}
          hidden={props.hidden}
          zIndex={props.zIndex}
        />
      </CSSTransition>
    )}
    <CSSTransition
      unmountOnExit
      mountOnEnter
      in={props.show}
      timeout={props.timeout}
      classNames={props.modalAnimationStyles}
    >
      <div className={props.modalStyles} style={{ zIndex: props.zIndex }}>
        <button className={classes.modal_close_btn} onClick={props.modalClosed}>
          <img className={classes.modal_close_btn_icon} src={Mult} alt="" />
        </button>
        {props.children}
      </div>
    </CSSTransition>
  </>
);

export default BaseModal;
