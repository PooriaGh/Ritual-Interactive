import React from 'react';

import Steam from '../../../assets/Icons/Steam.png';
import Trailer from '../../../assets/Icons/Trailer.png';

import classes from './Game.module.scss';

const GamePlaceholder = () => (
  <div className={classes.game_box}>
    <div className={classes.game_img_placeholder} />
    <div className={classes.game_content_container}>
      <h2 className={classes.game_content_title}>
        <div className={classes.game_content_title_placeholder} />
      </h2>
      <p className={classes.game_content_genre}>
        <span className={classes.game_content_genre_title}>Genre: </span>
        <span className={classes.game_content_genre_placeholder} />
        <span className={classes.game_content_genre_placeholder} />
      </p>
      <div className={classes.game_content_desc_placeholder} />
      <br />
      <p className={classes.game_content_desc_read_more_placeholder}>
        read more
      </p>
    </div>
    <div className={classes.game_btn_container}>
      <button className={classes.game_btn_steam_placeholder}>
        <img className={classes.game_btn_icon} src={Steam} alt="" />
        steam
      </button>
      <button className={classes.game_btn_trailer_placeholder}>
        <img className={classes.game_btn_icon} src={Trailer} alt="" />
        trailer
      </button>
    </div>
  </div>
);

export default GamePlaceholder;
