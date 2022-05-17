import React, { useState } from 'react';

import Game from '../Game/Game';
import BaseModal from '../../../UI/Modals/BaseModal/BaseModal';

import { getImageUrl } from '../../../../shared/Utilities/index';

import classes from './GameSmall.module.scss';

const GameSmall = (props) => {
  const [gameModalShow, setGameModalShow] = useState(false);

  const gameModalShowHandler = () =>
    setGameModalShow((prevState) => !prevState);

  return (
    <>
      <BaseModal
        show={gameModalShow}
        modalClosed={gameModalShowHandler}
        modalStyles={classes.game_modal}
        modalAnimationStyles="animated-modal"
        hidden
        zIndex={1}
        timeout={100}
      >
        <Game
          isSmall
          {...props.data}
          increaseOrder={props.increaseOrder}
          decreaseOrder={props.decreaseOrder}
          updateGames={props.updateGames}
          modalShowHandler={props.modalShowHandler}
        />
      </BaseModal>
      <div className={classes.game_container} onClick={gameModalShowHandler}>
        <img
          alt=""
          className={classes.game_img}
          src={getImageUrl(props.data.smallImageName)}
        />
      </div>
    </>
  );
};

export default GameSmall;
