import React from 'react';

import Modal from '../Modal/Modal';
import Timer from '../../Timer/Timer';
import Send from '../../Buttons/Send/Send';

import classes from './MessageBox.module.scss';

const MessageBox = (props) => (
  <Modal
    class={classes.modal}
    show={props.show}
    modalClosed={props.msgBoxShowHandler}
    hidden
    zIndex={1}
  >
    <div className={classes.msgBox}>
      <Timer radius={60} stroke={4} counter={props.counter} />
      <p className={classes.msgBox_msg}>
        If you didn't receice email after 30 seconds, click resend to send email
        again
      </p>
      <Send
        status={props.status}
        disabled={props.disabled || props.counter !== 0}
        loading={props.loading}
        textValue={props.textValue}
        clicked={props.sendBtnHandler}
      />
    </div>
  </Modal>
);

export default MessageBox;
