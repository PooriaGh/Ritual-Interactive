import React from 'react';

import ArrowUp from '../../../../assets/Icons/ArrowUp.png';
import ArrowDown from '../../../../assets/Icons/ArrowDown.png';
import Language from '../../../../assets/Icons/Language.png';

import classes from './New.module.scss';
import './New.scss';

const NewPlaceholder = () => (
  <div className={classes.new_container}>
    <div className={classes.new_container_imgs}>
      <div className={classes.new_container_img_lg_placeholder} />
      <img
        alt=""
        className={classes.new_container_language_placeholder}
        src={Language}
      />
      <div className={classes.new_container_img_sm_placeholder} />
    </div>
    <div className={classes.new_container_section_tools}>
      <div className={classes.new_container_section_tools_left}>
        <h2
          className={classes.new_container_section_tools_left_title_placeholder}
        >
          <div
            className={
              classes.new_container_section_tools_left_title_text_placeholder
            }
          />
        </h2>
        <div
          className={classes.new_container_section_tools_left_desc_placeholder}
        >
          <div
            className={
              classes.new_container_section_tools_left_desc_text_placeholder
            }
          />
        </div>
        <div
          className={classes.new_container_section_tools_left_btns_container}
        >
          <div
            className={classes.new_container_section_tools_left_btn_container}
          >
            <button
              className={
                classes.new_container_section_tools_left_btn_already_added_btn
              }
              disabled={true}
            >
              ...
            </button>
          </div>
          <button
            className={classes.new_container_section_tools_left_btn_add_btn}
            disabled={true}
          >
            add button
          </button>
        </div>
      </div>
      <div className={classes.new_container_section_tools_right}>
        <div className={classes.new_container_section_tools_right_btns_arrows}>
          <button
            className={classes.new_container_section_tools_right_btn_arrow_up}
            disabled={true}
          >
            <img alt="" src={ArrowUp} />
          </button>
          <button
            className={classes.new_container_section_tools_right_btn_arrow_down}
            disabled={true}
          >
            <img alt="" src={ArrowDown} />
          </button>
        </div>
        <button
          className={classes.new_container_section_tools_right_btn_remove}
          disabled={true}
        >
          remove
        </button>
      </div>
    </div>
  </div>
);

export default NewPlaceholder;
