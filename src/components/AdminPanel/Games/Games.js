import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Game from './Game/Game';
import GamePlaceholder from './Game/GamePlaceholder';
import GameSmall from './GameSmall/GameSmall';
import GameSmallPlaceholder from './GameSmall/GameSmallPlaceholder';
import ImageModal from '../../UI/Modals/ImageModal/ImageModal';
import LoginModal from '../../UI/Modals/LoginModal/LoginModal';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import SaveChange from '../../UI/Buttons/SaveChange/SaveChange';

import GameDisplayFormatLarge from '../../UI/SvgComponents/GameDisplayFormat/GameDisplayFormatLarge';
import GameDisplayFormatSmall from '../../UI/SvgComponents/GameDisplayFormat/GameDisplayFormatSmall';

import { authAxios } from '../../../axios-default';
import useHttpAuthHandler from '../../../hooks/http-auth-handler';
import {
  dataManipulationActions,
  buttonStatus,
  saveChangeButtonTextValues,
  httpErrorTypes,
  httpStatusCodes,
  initializeGames,
  increaseOrderItem,
  decreaseOrderItem,
  updateItems,
  addNewItem,
  initializeRemovedItems,
  validateItems,
  generateValidationMessage,
  imageSize,
} from '../../../shared/Utilities/index';
import * as actions from '../../../store/actions/index';

import classes from './Games.module.scss';
import './Games.scss';

const gameComponents = {
  normal: 0,
  small: 1,
};

const Games = (props) => {
  const [selectedComponent, setSelectedComponent] = useState(
    gameComponents.normal,
  );
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [modalError, setModalError] = useState(null);

  // save change button states
  const [saveChangeBtnLoading, setSaveChangeBtnLoading] = useState(null);
  const [saveChangeBtnActive, setSaveChangeBtnActive] = useState(false);
  const [saveChangeBtnStatus, setSaveChangeBtnStatus] = useState(
    buttonStatus.normal,
  );
  const [saveChangeBtnTextValue, setSaveChangeBtnTextValue] = useState(
    saveChangeButtonTextValues.default,
  );

  // modals states
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [isImageLarge, setIsImageLarge] = useState(true);
  const [modalData, setModalData] = useState({});
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [modalImageSize, setModalImageSize] = useState(imageSize.default);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // custom hooks
  useHttpAuthHandler(authAxios);

  // states
  const games = props.games.data;
  const gamesLoading = props.games.loading;

  // actions
  const { onGamesFetched, onGamesSet } = props;

  useEffect(() => {
    if (saveChangeBtnLoading) {
      setSaveChangeBtnTextValue(saveChangeButtonTextValues.sendingRequest);
      setSaveChangeBtnActive(false);
    } else {
      setSaveChangeBtnTextValue(saveChangeButtonTextValues.default);
      setSaveChangeBtnActive(true);
    }

    if (saveChangeBtnLoading === false) {
      setSaveChangeBtnActive(false);
      if (error) {
        setSaveChangeBtnTextValue(saveChangeButtonTextValues.requestFailed);
        setSaveChangeBtnStatus(buttonStatus.failed);
      } else {
        setSaveChangeBtnTextValue(saveChangeButtonTextValues.requestSucceeded);
        setSaveChangeBtnStatus(buttonStatus.succeeded);
      }

      var timer = setTimeout(() => {
        setSaveChangeBtnTextValue(saveChangeButtonTextValues.default);
        setSaveChangeBtnActive(true);
        setSaveChangeBtnStatus(buttonStatus.normal);
        setError(null);
      }, 2000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [saveChangeBtnLoading]);

  useEffect(() => {
    onGamesFetched();
  }, [onGamesFetched]);

  const gamesRoutesHandler = (component) => {
    component === gameComponents.small
      ? setSelectedComponent(gameComponents.small)
      : setSelectedComponent(gameComponents.normal);
  };

  const increaseOrder = (orderIndex) => {
    increaseOrderItem(games, orderIndex);
    onGamesSet([...games]);
  };

  const decreaseOrder = (orderIndex) => {
    decreaseOrderItem(games, orderIndex);
    onGamesSet([...games]);
  };

  const updateGames = (game) => {
    updateItems(games, game);
    onGamesSet([...games]);
  };

  const addNewBtnHandler = () => {
    let newGame = {
      largeImageName: '',
      smallImageName: '',
      name: '',
      genres: [],
      description_Pol: '',
      description_Eng: '',
      trailerUrl: '',
      steamUrl: '',
      actions: dataManipulationActions.add,
      pre_actions: null,
      english: true,
      loadLongDesc: false,
      valid: true,
      isValidUpdated: 0,
      editing: {
        title: false,
        genre: false,
        desc: false,
        trailer: false,
        steam: false,
      },
    };

    addNewItem(games, newGame);
    onGamesSet([...games, { ...newGame }]);
  };

  const postGames = () => {
    const filteredGames = games.filter((game) => game.actions !== null);
    const { allItemsValid, invalidItemsIndex } = validateItems(filteredGames);
    if (allItemsValid) {
      setSaveChangeBtnLoading(true);
      initializeRemovedItems(filteredGames);
      authAxios
        .post('Games/UpdateGames', filteredGames)
        .then((response) => {
          if (response.status === httpStatusCodes.Ok) {
            setError(null);
            setSaveChangeBtnLoading(false);
            return response.data.data;
          }
        })
        .then((responseData) => {
          if (responseData) {
            initializeGames(responseData);
            onGamesSet([...responseData]);
          } else {
            onGamesSet([]);
          }
        })
        .catch((error) => {
          setErrorType(httpErrorTypes.OTHER);
          setError(error);
          setSaveChangeBtnLoading(false);
          if (error.response?.status === httpStatusCodes.Unauthorized) {
            setIsUnauthorized(true);
          }
        });
    } else {
      const message = generateValidationMessage(
        invalidItemsIndex,
        'game',
        'games',
      );
      setErrorType(httpErrorTypes.VALIDATION);
      setError(message);
      onGamesSet([...games]);
    }
  };

  const modalShowHandler = (orderIndex, isLarge = false) => {
    if (!isModalShowed) {
      setModalError(false);
      isLarge ? setIsImageLarge(true) : setIsImageLarge(false);
      isLarge
        ? setModalImageSize(imageSize.large)
        : setModalImageSize(imageSize.small);
      const item = games.find((item) => item.orderIndex === orderIndex);
      const itemIndex = games.indexOf(item);
      setModalData({ ...games[itemIndex] });
    } else {
      setIsImageUploaded(false);
    }
    setIsModalShowed((prevState) => !prevState);
  };

  const noDataMsg = (
    <div className={classes.message_no_data_container}>
      <p className={classes.message_no_data_text}>
        We have no games to show yet,
        <span
          className={classes.message_no_data_add}
          onClick={addNewBtnHandler}
        >
          {' '}
          Add your first game
        </span>{' '}
        now!
      </p>
    </div>
  );

  const gamesSmallCmps = (
    <div className={classes.section_games_container}>
      {gamesLoading ? (
        <>
          <GameSmallPlaceholder />
          <GameSmallPlaceholder />
          <GameSmallPlaceholder />
        </>
      ) : games.length === 0 ? (
        noDataMsg
      ) : (
        games
          .sort((a, b) => b.orderIndex - a.orderIndex)
          .map((data, index) => (
            <GameSmall
              key={index}
              data={data}
              increaseOrder={increaseOrder}
              decreaseOrder={decreaseOrder}
              updateGames={updateGames}
              modalShowHandler={modalShowHandler}
            />
          ))
      )}
    </div>
  );

  const gamesCmps = gamesLoading ? (
    <GamePlaceholder />
  ) : games.length === 0 ? (
    noDataMsg
  ) : (
    <>
      {games
        .sort((a, b) => b.orderIndex - a.orderIndex)
        .map((data, index) => (
          <Game
            key={index}
            {...data}
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            updateGames={updateGames}
            modalShowHandler={modalShowHandler}
          />
        ))}
    </>
  );

  return (
    <section>
      <LoginModal
        show={isUnauthorized}
        modalClosed={() => setIsUnauthorized(false)}
      />
      <ImageModal
        data={games}
        setData={onGamesSet}
        imageSize={modalImageSize}
        modalData={modalData}
        setModalData={setModalData}
        isModalShowed={isModalShowed}
        setIsModalShowed={setIsModalShowed}
        error={modalError}
        setError={setModalError}
        isImageUploaded={isImageUploaded}
        setIsImageUploaded={setIsImageUploaded}
        isImageLarge={isImageLarge}
        zIndex={2}
        modalShowHandler={modalShowHandler}
      />
      <div className={classes.section_games_btn_container}>
        <button
          className={classes.section_games_btn_add_new}
          onClick={addNewBtnHandler}
        >
          add new
        </button>
        <div className={classes.section_games_btn_save_changes_container}>
          <SaveChange
            status={saveChangeBtnStatus}
            disabled={!saveChangeBtnActive}
            loading={saveChangeBtnLoading}
            textValue={saveChangeBtnTextValue}
            clicked={postGames}
          />
          <ErrorMessage error={error} top httpErrorType={errorType} />
        </div>
      </div>
      <div className={classes.section_games_filter_first}>
        <div className={classes.section_games_filter_text}>first</div>
      </div>
      <div className={classes.games_display_format}>
        <p className={classes.games_display_format_txt}>
          <span className={classes.games_display_format_txt_extra}>Games </span>
          display
          <span className={classes.games_display_format_txt_extra}>
            {' '}
            format
          </span>
          :
        </p>
        <button
          className={classes.games_display_format_btn}
          onClick={() => {
            gamesRoutesHandler(gameComponents.normal);
          }}
        >
          <GameDisplayFormatLarge
            className={classes.games_display_format_icon}
            active={selectedComponent === gameComponents.normal}
          />
        </button>
        <button
          className={classes.games_display_format_btn}
          onClick={() => {
            gamesRoutesHandler(gameComponents.small);
          }}
        >
          <GameDisplayFormatSmall
            className={classes.games_display_format_icon}
            active={selectedComponent === gameComponents.small}
          />
        </button>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={selectedComponent}
          timeout={{ enter: 400, exit: 300 }}
          classNames="animated-game-component"
        >
          {selectedComponent === gameComponents.small
            ? gamesSmallCmps
            : gamesCmps}
        </CSSTransition>
      </SwitchTransition>
      <div className={classes.section_games_filter_last}>
        <div className={classes.section_games_filter_text}>last</div>
      </div>
    </section>
  );
};

const mapStateTopProps = (state) => {
  return {
    token: state.auth.token,
    games: state.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGamesFetched: () => dispatch(actions.fetchGames()),
    onGamesUpdated: (game) => dispatch(actions.updateGames(game)),
    onGamesSet: (games) => dispatch(actions.setGames(games)),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(Games);
