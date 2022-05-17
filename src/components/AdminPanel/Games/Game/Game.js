import React, { useState, useEffect } from 'react';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';

import Steam from '../../../../assets/Icons/Steam.png';
import Trailer from '../../../../assets/Icons/Trailer.png';
import ArrowUp from '../../../../assets/Icons/ArrowUp.png';
import ArrowDown from '../../../../assets/Icons/ArrowDown.png';
import Language from '../../../../assets/Icons/Language.png';
import TrashCan from '../../../../assets/Icons/TrashCan.png';
import CheckMark from '../../../../assets/Icons/CheckMark.png';
import Plus from '../../../../assets/Icons/Plus.png';

import {
  removeButtonTextValues,
  dataManipulationActions,
  checkValidity,
  getImageUrl,
  dataKeys,
  getTextWithPlaceholder,
} from '../../../../shared/Utilities/index';

import classes from './Game.module.scss';
import './Game.scss';

const ValidationRules = {
  title: { required: true },
  desc: { required: true },
  genres: { required: true, withoutComma: true },
  trailer: { required: true, isYotubeLink: true },
  steam: { required: true, isSteamLink: true },
};

const Game = (props) => {
  const [showError, setShowError] = useState(false);
  const [validation, setValidation] = useState({
    title: false,
    desc: false,
    genres: false,
    trailer: [],
    steam: [],
  });

  // props
  const trailer = props.trailerUrl;
  const steam = props.steamUrl;
  const {
    name,
    genres,
    description_Eng,
    description_Pol,
    english,
    loadLongDesc,
    editing,
    actions,
    pre_actions,
    isValidUpdated,
  } = props;

  const updateGame = (gameData) => {
    const newGame = {
      orderIndex: props.orderIndex,
      largeImageName: props.largeImageName,
      smallImageName: props.smallImageName,
      name: name,
      genres: genres,
      description_Pol: description_Pol,
      description_Eng: description_Eng,
      trailerUrl: trailer,
      steamUrl: steam,
      actions: actions,
      pre_actions: pre_actions,
      english: english,
      loadLongDesc: loadLongDesc,
      validations: props.validations,
      valid: props.valid,
      ...gameData,
    };

    props.updateGames(newGame);
  };

  // check valid
  useEffect(() => {
    setShowError(!props.valid);
    // eslint-disable-next-line
  }, [isValidUpdated]);

  // check all validations
  useEffect(() => {
    const validations = [];
    for (const item of Object.entries(validation)) {
      const itemValue = item[1];
      if (Array.isArray(itemValue)) {
        for (const i of itemValue) {
          validations.push(i);
        }
      } else {
        validations.push(item[1]);
      }
    }

    updateGame({ validations: validations });
    // eslint-disable-next-line
  }, [validation]);

  // check validation for title
  useEffect(() => {
    validation.title = checkValidity(name, ValidationRules.title).isValid;

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [name]);

  // check validation for all genres
  useEffect(() => {
    let isValid = true;
    if (genres.length === 0) {
      isValid = false;
    } else {
      for (const genre of genres) {
        isValid = checkValidity(genre ?? '', ValidationRules.genres).isValid;
        if (!isValid) {
          break;
        }
      }
    }

    validation.genres = isValid;
    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [genres]);

  // check validation for description
  useEffect(() => {
    validation.desc =
      checkValidity(description_Eng, ValidationRules.desc).isValid &&
      checkValidity(description_Pol, ValidationRules.desc).isValid;

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [description_Eng, description_Pol]);

  // check validation for trailer
  useEffect(() => {
    validation.trailer = checkValidity(
      trailer,
      ValidationRules.trailer,
    ).isValid;

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [trailer]);

  // check validation for steam
  useEffect(() => {
    validation.steam = checkValidity(steam, ValidationRules.steam).isValid;

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [steam]);

  // title event handlers:
  const titleInputChangedHandler = (event) => {
    actions === null
      ? updateGame({
          actions: dataManipulationActions.update,
          name: event.target.value,
        })
      : updateGame({ name: event.target.value });
  };

  const titleToggleEditingHandler = () => {
    editing.title = !editing.title;
    updateGame({ editing: { ...editing } });
  };

  // genre event handlers:
  const genreInputChangedHandler = (event, index) => {
    genres[index] = event.target.value;
    actions === null
      ? updateGame({
          actions: dataManipulationActions.update,
          genres: [...genres],
        })
      : updateGame({ genres: [...genres] });
  };

  const genreToggleEditingHandler = () => {
    editing.genre = !editing.genre;
    updateGame({ ...editing });
  };

  const genreRemoveBtnClickedHandler = (index) => {
    genres.splice(index, 1);
    updateGame({ genres: [...props.genres] });
  };

  const genreAddBtnClickedHandler = () => {
    updateGame({ genres: [...props.genres, ''] });
  };

  // desc event handlers:
  const descInputChangedHandler = (event) => {
    if (actions === null) {
      english
        ? updateGame({
            actions: dataManipulationActions.update,
            description_Eng: event.target.value,
          })
        : updateGame({
            actions: dataManipulationActions.update,
            description_Pol: event.target.value,
          });
    } else {
      english
        ? updateGame({ description_Eng: event.target.value })
        : updateGame({ description_Pol: event.target.value });
    }
  };

  const descToggleEditingHandler = () => {
    editing.desc = !editing.desc;
    updateGame({ ...editing });
  };

  // trailer event handlers:
  const trailerInputChangedHandler = (event) => {
    actions === null
      ? updateGame({
          actions: dataManipulationActions.update,
          trailerUrl: event.target.value,
        })
      : updateGame({ trailerUrl: event.target.value });
  };

  const trailerToggleEditingHandler = () => {
    if (editing.trailer) {
      updateGame({ trailerUrl: trailer });
    }

    editing.trailer = !editing.trailer;
    updateGame({ ...editing });
  };

  // steam event handlers:
  const steamInputChangedHandler = (event) => {
    actions === null
      ? updateGame({
          actions: dataManipulationActions.update,
          steamUrl: event.target.value,
        })
      : updateGame({ steamUrl: event.target.value });
  };

  const steamToggleEditingHandler = () => {
    editing.steam = !editing.steam;
    updateGame({ ...editing });
  };

  // actions event handlers:
  const toggleRemoveActionsHandler = (event) => {
    event.stopPropagation();

    if (props.actions === dataManipulationActions.remove) {
      updateGame({ actions: pre_actions });
    } else {
      updateGame({
        pre_actions: actions,
        actions: dataManipulationActions.remove,
      });
    }
  };

  const toggleEnglishHandler = () => {
    updateGame({ english: !english });
  };

  const titleText = getTextWithPlaceholder({
    index: dataKeys.title,
    englishValue: name,
  });

  const titleContent = (
    <SwitchTransition>
      <CSSTransition
        key={editing.title}
        timeout={{ enter: 300, exit: 200 }}
        classNames="animated-title"
      >
        {!editing.title ? (
          <h2
            className={classes.game_container_title}
            onClick={titleToggleEditingHandler}
          >
            {titleText}
          </h2>
        ) : (
          <div className={classes.game_container_title_editing}>
            <input
              className={classes.game_container_editing_input}
              value={name}
              onChange={(event) => titleInputChangedHandler(event)}
            />
            <button
              className={classes.game_container_editing_btn_confirm}
              disabled={!validation.title}
              onClick={() => {
                titleToggleEditingHandler();
              }}
            >
              <img
                className={classes.game_container_editing_btn_confirm_icon}
                src={CheckMark}
                alt=""
              />
            </button>
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );

  const genreContent = (
    <SwitchTransition>
      <CSSTransition
        key={editing.genre}
        timeout={300}
        classNames="animated-genres-list"
      >
        {!editing.genre ? (
          <p
            className={classes.game_container_genre}
            onClick={genreToggleEditingHandler}
          >
            <span className={classes.game_container_genre_title}>genre: </span>
            {genres.map((item, index) => (
              <span className={classes.game_container_genre_item} key={index}>
                {index === genres.length - 1 ? item : item + ','}
              </span>
            ))}
          </p>
        ) : (
          <div className={classes.game_container_genre}>
            <span className={classes.game_container_genre_title}>genre: </span>
            <TransitionGroup component={null}>
              {genres.map((genre, index) => (
                <CSSTransition
                  key={index}
                  timeout={{ enter: 300, exit: 200 }}
                  classNames="animated-genres-item"
                >
                  <div className={classes.game_container_genre_item}>
                    <input
                      className={classes.game_container_genre_editing_input}
                      value={genre}
                      onChange={(event) =>
                        genreInputChangedHandler(event, index)
                      }
                    />
                    <button
                      className={classes.game_container_editing_btn_remove}
                      onClick={() => {
                        genreRemoveBtnClickedHandler(index);
                      }}
                    >
                      <img
                        className={
                          classes.game_container_genre_editing_btn_remove_icon
                        }
                        src={TrashCan}
                        alt=""
                      />
                    </button>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
            <button
              className={classes.game_container_genre_editing_btn_add}
              onClick={genreAddBtnClickedHandler}
            >
              <img
                className={classes.game_container_genre_editing_btn_add_icon}
                src={Plus}
                alt=""
              />
            </button>
            <button
              className={classes.game_container_genre_editing_btn_confirm}
              disabled={!validation.genres}
              onClick={genreToggleEditingHandler}
            >
              <img
                className={
                  classes.game_container_genre_editing_btn_confirm_icon
                }
                src={CheckMark}
                alt=""
              />
            </button>
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );

  const descText = getTextWithPlaceholder(
    {
      index: dataKeys.description,
      english,
      englishValue: description_Eng,
      polishValue: description_Pol,
    },
    true,
  );

  const descContent = (
    <SwitchTransition>
      <CSSTransition
        key={editing.desc}
        timeout={{
          enter: 300,
          exit: 200,
        }}
        classNames="animated-desc"
      >
        {!editing.desc ? (
          loadLongDesc ? (
            <p
              className={classes.game_container_desc}
              onClick={descToggleEditingHandler}
            >
              {descText}
            </p>
          ) : (
            <>
              <p
                className={classes.game_container_desc_load_long_desc_sm}
                onClick={() => updateGame({ loadLongDesc: true })}
              >
                load long description
              </p>
              <p
                className={classes.game_container_desc_load_long_desc_lg}
                onClick={descToggleEditingHandler}
              >
                {descText}
              </p>
            </>
          )
        ) : (
          <div className={classes.game_container_desc}>
            <textarea
              className={classes.game_container_desc_editing_textarea}
              value={english ? description_Eng : description_Pol}
              onChange={(event) => descInputChangedHandler(event)}
            />
            <button
              className={classes.game_container_desc_editing_btn_confirm}
              disabled={!validation.desc}
              onClick={() => {
                descToggleEditingHandler();
              }}
            >
              <img
                className={classes.game_container_desc_editing_btn_confirm_icon}
                src={CheckMark}
                alt=""
              />
            </button>
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );

  const trailerText = getTextWithPlaceholder({
    index: dataKeys.trailer,
    englishValue: trailer,
  });

  const trailerContent = (
    <SwitchTransition>
      <CSSTransition
        key={editing.trailer}
        timeout={{ enter: 300, exit: 200 }}
        classNames="animated-btn"
      >
        {!editing.trailer ? (
          <button
            className={classes.game_container_btn_trailer}
            onClick={trailerToggleEditingHandler}
          >
            <img
              className={classes.game_container_btn_trailer_icon}
              src={Trailer}
              alt=""
            />
            <p className={classes.game_container_btn_txt}>{trailerText}</p>
          </button>
        ) : (
          <div className={classes.game_container_btn_trailer_editing}>
            <img
              className={classes.game_container_btn_trailer_icon_editing}
              src={Trailer}
              alt=""
            />
            <input
              className={classes.game_container_btn_trailer_input_editing}
              value={trailer}
              onChange={(event) => trailerInputChangedHandler(event)}
            />
            <button
              className={classes.game_container_editing_btn_confirm}
              disabled={!validation.trailer}
              onClick={trailerToggleEditingHandler}
            >
              <img
                className={classes.game_container_editing_btn_confirm_icon}
                src={CheckMark}
                alt=""
              />
            </button>
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );

  const steamText = getTextWithPlaceholder({
    index: dataKeys.steam,
    englishValue: steam,
  });

  const steamContent = (
    <SwitchTransition>
      <CSSTransition
        key={editing.steam}
        timeout={{ enter: 300, exit: 200 }}
        classNames="animated-btn"
      >
        {!editing.steam ? (
          <button
            className={classes.game_container_btn_steam}
            onClick={steamToggleEditingHandler}
          >
            <img
              className={classes.game_container_btn_steam_icon}
              src={Steam}
              alt=""
            />
            <p className={classes.game_container_btn_txt}>{steamText}</p>
          </button>
        ) : (
          <div className={classes.game_container_btn_steam_editing}>
            <img
              className={classes.game_container_btn_steam_icon_editing}
              src={Steam}
              alt=""
            />
            <input
              className={classes.game_container_btn_steam_input_editing}
              value={steam}
              onChange={(event) => steamInputChangedHandler(event)}
            />
            <button
              className={classes.game_container_editing_btn_confirm}
              disabled={!validation.steam}
              onClick={steamToggleEditingHandler}
            >
              <img
                className={classes.game_container_editing_btn_confirm_icon}
                src={CheckMark}
                alt=""
              />
            </button>
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );

  return (
    <div
      className={
        props.isSmall
          ? classes.game_container_small
          : showError && actions !== dataManipulationActions.remove
          ? classes.game_container_alert
          : classes.game_container
      }
      onClick={() => setShowError(false)}
    >
      <div className={classes.game_container_imgs}>
        <img
          alt=""
          className={classes.game_container_img_lg}
          src={getImageUrl(props.largeImageName, true)}
          onClick={() => props.modalShowHandler(props.orderIndex, true)}
        />
        <img
          alt=""
          className={
            english
              ? classes.game_container_language_english
              : classes.game_container_language_polish
          }
          src={Language}
          onClick={toggleEnglishHandler}
        />
        <img
          alt=""
          className={classes.game_container_img_sm}
          src={getImageUrl(props.smallImageName)}
          onClick={() => props.modalShowHandler(props.orderIndex)}
        />
      </div>
      <div className={classes.game_container_section_tools}>
        <div className={classes.game_container_section_tools_left}>
          {titleContent}
          {genreContent}
          {descContent}
          <div className={classes.game_container_btns}>
            {trailerContent}
            {steamContent}
          </div>
        </div>
        <div
          className={
            props.isSmall
              ? classes.game_container_section_tools_right_small
              : classes.game_container_section_tools_right
          }
        >
          {!props.isSmall ? (
            <div className={classes.game_container_btns_arrows}>
              <button
                className={classes.game_container_btn_arrow_up}
                onClick={() => props.increaseOrder(props.orderIndex)}
                disabled={props.max}
              >
                <img alt="" src={ArrowUp} />
              </button>
              <button
                className={classes.game_container_btn_arrow_down}
                onClick={() => props.decreaseOrder(props.orderIndex)}
                disabled={props.min}
              >
                <img alt="" src={ArrowDown} />
              </button>
            </div>
          ) : (
            <div className={classes.game_container_btns_arrows_small} />
          )}
          <button
            className={classes.game_container_btn_remove}
            onClick={(event) => toggleRemoveActionsHandler(event)}
          >
            {props.actions === dataManipulationActions.remove
              ? removeButtonTextValues.active
              : removeButtonTextValues.inactive}
          </button>
        </div>
      </div>
      {props.actions === dataManipulationActions.remove ? (
        <div className={classes.game_container_remove_layer} />
      ) : null}
    </div>
  );
};

export default Game;
