import React, { useState } from 'react';

import Steam from '../../../assets/Icons/Steam.png';
import Trailer from '../../../assets/Icons/Trailer.png';

import { getImageUrl } from '../../../shared/Utilities/index';

import classes from './Game.module.scss';

const englishContent = {
  genre: 'Genres:',
  readMore: ['close description', 'read more'],
  steam: 'steam',
  trailer: 'trailer',
};

const polishContent = {
  genre: 'Gatunki:',
  readMore: ['Zamknij opis', 'Więcej'],
  steam: 'steam',
  trailer: 'zwiastun',
};

const Game = (props) => {
  const [readMore, setReadMore] = useState(false);
  const content = props.isPolish ? polishContent : englishContent;

  return (
    <div className={classes.game_box}>
      <img
        className={classes.game_img}
        alt=""
        src={getImageUrl(props.largeImageName)}
      />
      <div className={classes.game_content_container}>
        <h2 className={classes.game_content_title}>{props.name}</h2>
        <p className={classes.game_content_genre}>
          <b className={classes.game_content_genre_title}>{content.genre}</b>
          {props.genres
            ? props.genres.map((genre, index) =>
                index === props.genres.length - 1 ? genre : genre + ', ',
              )
            : null}
        </p>
        <div
          className={
            readMore
              ? classes.game_content_desc_active
              : classes.game_content_desc
          }
        >
          <p
            className={
              readMore
                ? classes.game_content_desc_text_active
                : classes.game_content_desc_text
            }
          >
            {props.isPolish ? props.description_Pol : props.description_Eng}
          </p>
        </div>
        <p
          className={classes.game_content_desc_read_more}
          onClick={() => setReadMore((prevState) => !prevState)}
        >
          {readMore ? content.readMore[0] : content.readMore[1]}
        </p>
      </div>
      <div className={classes.game_btn_container}>
        <a
          className={classes.game_btn_steam}
          href={props.steamUrl}
          target="_blank"
          rel="noreferrer"
        >
          <img className={classes.game_btn_icon} src={Steam} alt="" />
          {content.steam}
        </a>
        <button
          className={classes.game_btn_trailer}
          onClick={props.modalShowHandler}
        >
          <img className={classes.game_btn_icon} src={Trailer} alt="" />
          {content.trailer}
        </button>
      </div>
    </div>
  );
};

export default Game;
