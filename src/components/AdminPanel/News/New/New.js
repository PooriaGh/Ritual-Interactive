import React, { useState, useEffect } from 'react';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';

import Pin from '../../../../assets/Icons/Pin.png';
import ArrowUp from '../../../../assets/Icons/ArrowUp.png';
import ArrowDown from '../../../../assets/Icons/ArrowDown.png';
import Language from '../../../../assets/Icons/Language.png';
import CheckMark from '../../../../assets/Icons/CheckMark.png';
import TrashCan from '../../../../assets/Icons/TrashCan.png';

import {
  removeButtonTextValues,
  dataManipulationActions,
  checkValidity,
  getImageUrl,
  dataKeys,
  getTextWithPlaceholder,
} from '../../../../shared/Utilities/index';

import classes from './New.module.scss';
import './New.scss';

const ValidationRules = {
  title: { required: true },
  desc: { required: true },
  btns: { required: true },
  icons: { required: true },
};

const New = (props) => {
  const [showError, setShowError] = useState(false);
  const [addBtnActive, setAddBtnActive] = useState(true);
  const [validation, setValidation] = useState({
    title: false,
    desc: false,
    btns: [],
    icons: [],
  });

  // states
  const validationBtns = validation.btns;
  const validationIcons = validation.icons;

  // props
  const {
    title_Eng,
    title_Pol,
    article_Eng,
    article_Pol,
    buttons,
    icons,
    editing,
    english,
    loadLongDesc,
    actions,
    pre_actions,
    isValidUpdated,
  } = props;

  const updateNew = (newItemData) => {
    const newItem = {
      orderIndex: props.orderIndex,
      largeImageName: props.largeImageName,
      smallImageName: props.smallImageName,
      title_Eng: title_Eng,
      title_Pol: title_Pol,
      article_Eng: article_Eng,
      article_Pol: article_Pol,
      buttons: buttons,
      icons: icons,
      actions: actions,
      pre_actions: pre_actions,
      editing: editing,
      loadLongDesc: loadLongDesc,
      validations: props.validations,
      valid: props.valid,
      ...newItemData,
    };

    props.updateNews(newItem);
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

    updateNew({ validations: validations });
    // eslint-disable-next-line
  }, [validation]);

  // check validation for title
  useEffect(() => {
    validation.title =
      checkValidity(title_Eng, ValidationRules.title).isValid &&
      checkValidity(title_Pol, ValidationRules.title).isValid;

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [title_Eng, title_Pol]);

  // check validation for description
  useEffect(() => {
    validation.desc =
      checkValidity(article_Eng, ValidationRules.desc).isValid &&
      checkValidity(article_Pol, ValidationRules.desc).isValid;

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [article_Eng, article_Pol]);

  // check validation for all buttons
  useEffect(() => {
    for (let index = 0; index < buttons.length; index++) {
      validation.btns[index] =
        checkValidity(buttons[index].name_eng ?? '', ValidationRules.btns)
          .isValid &&
        checkValidity(buttons[index].name_pol ?? '', ValidationRules.btns)
          .isValid &&
        checkValidity(buttons[index].url ?? '', ValidationRules.icons).isValid;
    }

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [buttons]);

  // check all buttons are valid
  useEffect(() => {
    let allBtnsAreValid = true;
    if (validationBtns.length !== 0) {
      for (const validationBtn of validationBtns) {
        if (!validationBtn) {
          allBtnsAreValid = false;
          break;
        }
      }
    }
    setAddBtnActive(allBtnsAreValid);
  }, [validationBtns]);

  // check validation for all icons (links)
  useEffect(() => {
    for (let index = 0; index < icons.length; index++) {
      validation.icons[index] = checkValidity(
        icons[index] ?? '',
        ValidationRules.icons,
      ).isValid;
    }

    setValidation({ ...validation });
    // eslint-disable-next-line
  }, [icons]);

  // title event handlers:
  const titleInputChangedHandler = (event) => {
    if (actions === null) {
      english
        ? updateNew({
            actions: dataManipulationActions.update,
            title_Eng: event.target.value,
          })
        : updateNew({
            actions: dataManipulationActions.update,
            title_Pol: event.target.value,
          });
    } else {
      english
        ? updateNew({ title_Eng: event.target.value })
        : updateNew({ title_Pol: event.target.value });
    }
  };

  const titleToggleEditingHandler = () => {
    editing.title = !editing.title;
    updateNew({ editing: { ...editing } });
  };

  // desc event handlers:
  const descInputChangedHandler = (event) => {
    if (actions === null) {
      english
        ? updateNew({
            actions: dataManipulationActions.update,
            article_Eng: event.target.value,
          })
        : updateNew({
            actions: dataManipulationActions.update,
            article_Pol: event.target.value,
          });
    } else {
      english
        ? updateNew({ article_Eng: event.target.value })
        : updateNew({ article_Pol: event.target.value });
    }
  };

  const descToggleEditingHandler = () => {
    editing.desc = !editing.desc;
    updateNew({ editing: { ...editing } });
  };

  // btns event handlers:
  const addBtnClickedHandler = () => {
    buttons.forEach((button, index) => (editing.btns[index] = false));
    buttons.push({
      name_eng: '',
      name_pol: '',
      url: '',
    });
    icons.push('');
    editing.btns.push(true);

    updateNew({
      buttons: [...buttons],
      icons: [...icons],
      editing: { ...editing },
    });
  };

  const newBtnInputChangedHandler = (event, index) => {
    buttons[index] = english
      ? { ...buttons[index], name_eng: event.target.value }
      : { ...buttons[index], name_pol: event.target.value };

    if (actions === null) {
      updateNew({
        actions: dataManipulationActions.update,
        buttons: [...buttons],
      });
    } else {
      updateNew({ buttons: [...buttons] });
    }
  };

  const newBtnToggleEditingHandler = (index) => {
    editing.btns[index] = true;
    updateNew({ editing: { ...editing } });
  };

  const confirmBtnClickedHandler = (index) => {
    editing.btns[index] = false;
    editing.icons[index] = false;
    updateNew({ editing: { ...editing } });
  };

  const removeBtnClickedHandler = (index) => {
    validation.btns.splice(index, 1);
    validation.icons.splice(index, 1);
    setValidation({ ...validation });

    buttons.splice(index, 1);
    icons.splice(index, 1);
    editing.btns.splice(index, 1);

    updateNew({
      buttons: [...buttons],
      icons: [...icons],
      editing: { ...editing },
    });
  };

  // link btn event handlers:
  const toggleShowIconHandler = (index) => {
    editing.icons[index] = true;
    updateNew({ editing: { ...editing } });
  };

  const linkInputChangedHandler = (event, index) => {
    icons[index] = event.target.value;
    updateNew({ icons: [...icons] });
  };

  const linkInputConfirmBtnClickedHandler = (index) => {
    buttons[index] = { ...buttons[index], url: icons[index] };
    editing.icons[index] = false;

    if (actions === null) {
      updateNew({
        actions: dataManipulationActions.update,
        buttons: [...buttons],
      });
    } else {
      updateNew({ buttons: [...buttons], editing: { ...editing } });
    }
  };

  // actions event handlers:
  const toggleRemoveActionsHandler = (event) => {
    event.stopPropagation();

    if (actions === dataManipulationActions.remove) {
      updateNew({ actions: pre_actions });
    } else {
      updateNew({
        pre_actions: actions,
        actions: dataManipulationActions.remove,
      });
    }
  };

  const titleText = getTextWithPlaceholder(
    {
      index: dataKeys.title,
      english,
      englishValue: title_Eng,
      polishValue: title_Pol,
    },
    true,
  );

  const titleContent = (
    <SwitchTransition>
      <CSSTransition
        key={editing.title}
        timeout={{ enter: 300, exit: 200 }}
        classNames="animated-title"
      >
        {!editing.title ? (
          <h2
            className={classes.new_container_section_tools_left_title}
            onClick={() => {
              titleToggleEditingHandler();
            }}
          >
            {titleText}
          </h2>
        ) : (
          <div
            className={classes.new_container_section_tools_left_title_editing}
          >
            <input
              className={classes.new_container_section_tools_left_editing_input}
              value={english ? title_Eng : title_Pol}
              onChange={(event) => titleInputChangedHandler(event)}
            />
            <button
              className={classes.new_container_section_tools_left_btn_confirm}
              disabled={!validation.title}
              onClick={() => {
                titleToggleEditingHandler();
              }}
            >
              <img
                className={
                  classes.new_container_section_tools_left_btn_confirm_icon
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
      englishValue: article_Eng,
      polishValue: article_Pol,
    },
    true,
  );

  const editingModeDesc = (
    <div className={classes.new_container_section_tools_left_desc_editing}>
      <textarea
        className={classes.new_container_section_tools_left_editing_textarea}
        value={english ? article_Eng : article_Pol}
        onChange={(event) => descInputChangedHandler(event)}
      />
      <button
        className={classes.new_container_section_tools_left_btn_confirm}
        disabled={!validation.desc}
        onClick={descToggleEditingHandler}
      >
        <img
          className={classes.new_container_section_tools_left_desc_confirm_icon}
          src={CheckMark}
          alt=""
        />
      </button>
    </div>
  );

  const presentationModeDesc = loadLongDesc ? (
    <p
      className={classes.new_container_section_tools_left_desc}
      onClick={descToggleEditingHandler}
    >
      {descText}
    </p>
  ) : (
    <>
      <p
        className={
          classes.new_container_section_tools_left_desc_load_long_desc_sm
        }
        onClick={() => updateNew({ loadLongDesc: true })}
      >
        load long description
      </p>
      <p
        className={
          classes.new_container_section_tools_left_desc_load_long_desc_lg
        }
        onClick={descToggleEditingHandler}
      >
        {descText}
      </p>
    </>
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
        {!editing.desc ? presentationModeDesc : editingModeDesc}
      </CSSTransition>
    </SwitchTransition>
  );

  const btnsContent = (
    <TransitionGroup component={null}>
      {buttons.map((button, index) => {
        const editingMode = (
          <div
            className={classes.new_container_section_tools_left_btn_container}
            key={index}
          >
            <input
              className={classes.new_container_section_tools_left_editing_input}
              value={english ? button.name_eng : button.name_pol}
              onChange={(event) => newBtnInputChangedHandler(event, index)}
            />
            <button
              className={classes.new_container_section_tools_left_btn_confirm}
              disabled={!validationBtns[index]}
              onClick={() => {
                confirmBtnClickedHandler(index);
              }}
            >
              <img
                className={
                  classes.new_container_section_tools_left_btn_confirm_icon
                }
                src={CheckMark}
                alt=""
              />
            </button>
            <button
              className={classes.new_container_section_tools_left_btn_remove}
              onClick={() => {
                removeBtnClickedHandler(index);
              }}
            >
              <img
                className={
                  classes.new_container_section_tools_left_btn_remove_icon
                }
                src={TrashCan}
                alt=""
              />
            </button>
            <button
              className={classes.new_container_section_tools_left_btn_pin}
              onClick={() => toggleShowIconHandler(index)}
            >
              <img
                className={
                  classes.new_container_section_tools_left_btn_pin_icon
                }
                alt=" "
                src={Pin}
              />
            </button>
            {editing.icons[index] ? (
              <div
                className={
                  classes.new_container_section_tools_left_link_container
                }
              >
                <input
                  className={
                    classes.new_container_section_tools_left_link_input
                  }
                  value={icons[index]}
                  onChange={(event) => linkInputChangedHandler(event, index)}
                />
                <button
                  className={
                    classes.new_container_section_tools_left_link_btn_confirm
                  }
                  disabled={!validationIcons[index]}
                  onClick={() => {
                    linkInputConfirmBtnClickedHandler(index);
                  }}
                >
                  <img
                    className={
                      classes.new_container_section_tools_left_link_btn_confirm_icon
                    }
                    src={CheckMark}
                    alt=""
                  />
                </button>
              </div>
            ) : null}
          </div>
        );

        const presentationMode = (
          <div
            className={classes.new_container_section_tools_left_btn_container}
            key={index}
          >
            <button
              className={
                classes.new_container_section_tools_left_btn_already_added_btn
              }
              onClick={() => {
                newBtnToggleEditingHandler(index);
              }}
            >
              {english ? button.name_eng : button.name_pol}
            </button>
          </div>
        );

        return (
          <CSSTransition key={index} timeout={300} classNames="animated-btn">
            {editing.btns[index] ? editingMode : presentationMode}
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );

  return (
    <div
      className={
        showError && actions !== dataManipulationActions.remove
          ? classes.new_container_alert
          : classes.new_container
      }
      onClick={() => setShowError(false)}
    >
      <div className={classes.new_container_imgs}>
        <img
          alt=""
          className={classes.new_container_img_lg}
          src={getImageUrl(props.largeImageName, true)}
          onClick={() => props.modalShowHandler(props.orderIndex, true)}
        />
        <img
          alt=""
          className={
            english
              ? classes.new_container_language_english
              : classes.new_container_language_polish
          }
          src={Language}
          onClick={() => updateNew({ english: !english })}
        />
        <img
          alt=""
          className={classes.new_container_img_sm}
          src={getImageUrl(props.smallImageName)}
          onClick={() => props.modalShowHandler(props.orderIndex)}
        />
      </div>
      <div className={classes.new_container_section_tools}>
        <div className={classes.new_container_section_tools_left}>
          {titleContent}
          {descContent}
          <div
            className={classes.new_container_section_tools_left_btns_container}
          >
            {btnsContent}
            <button
              className={classes.new_container_section_tools_left_btn_add_btn}
              disabled={!addBtnActive}
              onClick={addBtnClickedHandler}
            >
              add button
            </button>
          </div>
        </div>
        <div className={classes.new_container_section_tools_right}>
          <div
            className={classes.new_container_section_tools_right_btns_arrows}
          >
            <button
              className={classes.new_container_section_tools_right_btn_arrow_up}
              onClick={() => props.increaseOrder(props.orderIndex)}
              disabled={props.max}
            >
              <img alt="" src={ArrowUp} />
            </button>
            <button
              className={
                classes.new_container_section_tools_right_btn_arrow_down
              }
              onClick={() => props.decreaseOrder(props.orderIndex)}
              disabled={props.min}
            >
              <img alt="" src={ArrowDown} />
            </button>
          </div>
          <button
            className={classes.new_container_section_tools_right_btn_remove}
            onClick={(event) => toggleRemoveActionsHandler(event)}
          >
            {actions === dataManipulationActions.remove
              ? removeButtonTextValues.active
              : removeButtonTextValues.inactive}
          </button>
        </div>
      </div>
      {actions === dataManipulationActions.remove ? (
        <div className={classes.new_container_remove_layer} />
      ) : null}
    </div>
  );
};

export default New;
