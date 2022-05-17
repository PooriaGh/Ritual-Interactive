import React from 'react';

import Steam from '../../../../assets/Icons/Steam.png';
import Trailer from '../../../../assets/Icons/Trailer.png';
import ArrowUp from '../../../../assets/Icons/ArrowUp.png';
import ArrowDown from '../../../../assets/Icons/ArrowDown.png';
import Language from '../../../../assets/Icons/Language.png';

import classes from './Game.module.scss';
import './Game.scss';

const GamePlaceholder = () => (
  <div className={classes.game_container}>
    <div className={classes.game_container_imgs}>
      <div className={classes.game_container_img_lg_placeholder} />
      <img
        alt=""
        className={classes.game_container_language_placeholder}
        src={Language}
      />
      <div className={classes.game_container_img_sm_placeholder} />
    </div>
    <div className={classes.game_container_section_tools}>
      <div className={classes.game_container_section_tools_left}>
        <h2 className={classes.game_container_title_placeholder}>
          <div className={classes.game_container_title_text_placeholder} />
        </h2>
        <p className={classes.game_container_genre_placeholder}>
          <span className={classes.game_container_genre_title}>genre: </span>
          <span className={classes.game_container_genre_text_placeholder} />
          <span className={classes.game_container_genre_text_placeholder} />
          <span className={classes.game_container_genre_text_placeholder} />
        </p>
        <div className={classes.game_container_desc_placeholder}>
          <div className={classes.game_container_desc_text_placeholder} />
        </div>
        <div className={classes.game_container_btns}>
          <button
            className={classes.game_container_btn_trailer}
            disabled={true}
          >
            <img
              className={classes.game_container_btn_trailer_icon}
              src={Trailer}
              alt=""
            />
            <p className={classes.game_container_btn_txt}>Trailer</p>
          </button>
          <button className={classes.game_container_btn_steam} disabled={true}>
            <img
              className={classes.game_container_btn_steam_icon}
              src={Steam}
              alt=""
            />
            <p className={classes.game_container_btn_txt}>Steam</p>
          </button>
        </div>
      </div>
      <div className={classes.game_container_section_tools_right}>
        <div className={classes.game_container_btns_arrows}>
          <button
            className={classes.game_container_btn_arrow_up}
            disabled={true}
          >
            <img alt="" src={ArrowUp} />
          </button>
          <button
            className={classes.game_container_btn_arrow_down}
            disabled={true}
          >
            <img alt="" src={ArrowDown} />
          </button>
        </div>
        <button className={classes.game_container_btn_remove} disabled={true}>
          remove
        </button>
      </div>
    </div>
  </div>
);

export default GamePlaceholder;
