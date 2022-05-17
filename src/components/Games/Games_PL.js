import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Game from './Game/Game';
import GamePlaceholder from './Game/GamePlaceholder';
import Modal from '../UI/Modals/Modal/Modal';

import * as actions from '../../store/actions/index';
import { generateTrailerLink } from '../../shared/Utilities/index';

import classes from './Games.module.scss';

const Games = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalGame, setModalGame] = useState({});

  // states
  const games = props.games.data;
  const gamesLoading = props.games.loading;

  // actions
  const { onErrorCleared, onGamesFetched } = props;

  useEffect(() => {
    onErrorCleared();
    onGamesFetched();
  }, [onErrorCleared, onGamesFetched]);

  const modalShowHandler = (index) => {
    if (!modalShow) {
      setModalGame({ ...games[index] });
    }
    setModalShow((prevState) => !prevState);
  };

  const modalContent = (
    <div className={classes.modal_content_video}>
      <iframe
        width="853"
        height="480"
        src={generateTrailerLink(modalGame.trailerUrl)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );

  return (
    <>
      <Modal
        class={classes.modal}
        show={modalShow}
        zIndex={1}
        modalClosed={modalShowHandler}
      >
        {modalContent}
      </Modal>
      <div className={classes.games_container}>
        <h2 className={classes.games_title}>wszystkie gry</h2>
        {gamesLoading ? (
          <div className={classes.games}>
            <GamePlaceholder />
            <GamePlaceholder />
          </div>
        ) : (
          <div className={classes.games}>
            {games.map((game, index) => (
              <Game
                key={index}
                isPolish
                modalShowHandler={() => modalShowHandler(index)}
                {...game}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onErrorCleared: () => {
      dispatch(actions.clearNewsError());
      dispatch(actions.clearGamesError());
    },
    onGamesFetched: () => dispatch(actions.fetchGames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
