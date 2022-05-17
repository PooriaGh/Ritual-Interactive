import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import BaseModal from '../BaseModal/BaseModal';

import { generateHttpErrorMessage } from '../../../../shared/Utilities/index';

import classes from './ErrorModal.module.scss';
import './ErrorModal.scss';

const ErrorModal = (props) => {
  const newsError = props.news;
  const gamesError = props.games;
  const error = newsError + gamesError;

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (newsError === null && gamesError === null) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
    setErrorMsg(generateHttpErrorMessage(newsError, gamesError));
  }, [newsError, gamesError]);

  return (
    <BaseModal
      show={showModal}
      modalClosed={() => setShowModal(false)}
      modalStyles={classes.error_modal}
      modalAnimationStyles="animated-error-modal"
      zIndex={200}
      timeout={300}
      noBackdrop
    >
      <SwitchTransition>
        <CSSTransition
          key={error}
          timeout={300}
          classNames="animated-error-modal-message"
        >
          <div className={classes.error_box}>
            <p className={classes.error_box_title}>
              {errorMsg ? errorMsg.title + '!' : null}
            </p>
            <p className={classes.error_box_text}>
              {errorMsg ? errorMsg.text + '.' : null}
            </p>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </BaseModal>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news.error,
    games: state.games.error,
  };
};

export default connect(mapStateToProps)(ErrorModal);
