import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import New from './New/New';
import NewPlaceholder from './New/NewPlaceholder';
import ImageModal from '../../UI/Modals/ImageModal/ImageModal';
import LoginModal from '../../UI/Modals/LoginModal/LoginModal';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import SaveChange from '../../UI/Buttons/SaveChange/SaveChange';

import { authAxios } from '../../../axios-default';
import useHttpAuthHandler from '../../../hooks/http-auth-handler';
import {
  dataManipulationActions,
  buttonStatus,
  saveChangeButtonTextValues,
  httpErrorTypes,
  httpStatusCodes,
  initializeNews,
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

import classes from './News.module.scss';

const News = (props) => {
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
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // custom hooks
  useHttpAuthHandler(authAxios);

  // states
  const news = props.news.data;
  const newsLoading = props.news.loading;

  // actions
  const { onNewsFetched, onNewsSet } = props;

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
    onNewsFetched();
  }, [onNewsFetched]);

  const increaseOrder = (orderIndex) => {
    increaseOrderItem(news, orderIndex);
    onNewsSet([...news]);
  };

  const decreaseOrder = (orderIndex) => {
    decreaseOrderItem(news, orderIndex);
    onNewsSet([...news]);
  };

  const updateNews = (newItem) => {
    updateItems(news, newItem);
    onNewsSet([...news]);
  };

  const addNewBtnHandler = () => {
    let newsItem = {
      largeImageName: '',
      smallImageName: '',
      title_Pol: '',
      title_Eng: '',
      article_Pol: '',
      article_Eng: '',
      buttons: [],
      icons: [],
      actions: dataManipulationActions.add,
      pre_actions: null,
      english: true,
      loadLongDesc: false,
      valid: true,
      isValidUpdated: 0,
      editing: {
        title: false,
        desc: false,
        btns: [],
        icons: [],
      },
    };

    addNewItem(news, newsItem);
    onNewsSet([...news, newsItem]);
  };

  const postNews = () => {
    const filteredNews = news.filter((newItem) => newItem.actions !== null);
    const { allItemsValid, invalidItemsIndex } = validateItems(filteredNews);
    if (allItemsValid) {
      setSaveChangeBtnLoading(true);
      initializeRemovedItems(filteredNews);
      authAxios
        .post('News/UpdateNewsArticles', filteredNews)
        .then((response) => {
          if (response.status === httpStatusCodes.Ok) {
            setError(null);
            setSaveChangeBtnLoading(false);
            return response.data.data;
          }
        })
        .then((responseData) => {
          if (responseData) {
            initializeNews(responseData);
            onNewsSet([...responseData]);
          } else {
            onNewsSet([]);
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
        'news',
        'news',
      );
      setErrorType(httpErrorTypes.VALIDATION);
      setError(message);
      onNewsSet([...news]);
    }
  };

  const modalShowHandler = (orderIndex, isLarge = false) => {
    if (!isModalShowed) {
      isLarge ? setIsImageLarge(true) : setIsImageLarge(false);
      const item = news.find((item) => item.orderIndex === orderIndex);
      const itemIndex = news.indexOf(item);
      setModalData({ ...news[itemIndex] });
    } else {
      setIsImageUploaded(false);
    }
    setIsModalShowed(!isModalShowed);
  };

  const noDataMsg = (
    <div className={classes.message_no_data_container}>
      <p className={classes.message_no_data_text}>
        We have no news to show yet,
        <span
          className={classes.message_no_data_add}
          onClick={addNewBtnHandler}
        >
          {' '}
          Add your first news
        </span>{' '}
        now!
      </p>
    </div>
  );

  const component = (
    <>
      {news
        .sort((a, b) => b.orderIndex - a.orderIndex)
        .map((data, index) => (
          <New
            key={index}
            {...data}
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            updateNews={updateNews}
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
        data={news}
        setData={onNewsSet}
        modalData={modalData}
        setModalData={setModalData}
        isModalShowed={isModalShowed}
        setIsModalShowed={setIsModalShowed}
        error={modalError}
        setError={setModalError}
        isImageUploaded={isImageUploaded}
        setIsImageUploaded={setIsImageUploaded}
        isImageLarge={isImageLarge}
        imageSize={imageSize.default}
        zIndex={2}
        modalShowHandler={modalShowHandler}
      />
      <div className={classes.section_news_btn_container}>
        <button
          className={classes.section_news_btn_add_new}
          onClick={addNewBtnHandler}
        >
          add new
        </button>
        <div className={classes.section_news_btn_save_changes_container}>
          <SaveChange
            status={saveChangeBtnStatus}
            disabled={!saveChangeBtnActive}
            loading={saveChangeBtnLoading}
            textValue={saveChangeBtnTextValue}
            clicked={postNews}
          />
          <ErrorMessage error={error} top httpErrorType={errorType} />
        </div>
      </div>
      <div className={classes.section_news_filter_first}>
        <div className={classes.section_news_filter_text}>first</div>
      </div>
      {newsLoading ? (
        <NewPlaceholder />
      ) : news.length === 0 ? (
        noDataMsg
      ) : (
        component
      )}
      <div className={classes.section_news_filter_last}>
        <div className={classes.section_news_filter_text}>last</div>
      </div>
    </section>
  );
};

const mapStateTopProps = (state) => {
  return {
    token: state.auth.token,
    news: state.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewsFetched: () => dispatch(actions.fetchNews()),
    onNewsUpdated: (newItem) => dispatch(actions.updateNews(newItem)),
    onNewsSet: (news) => dispatch(actions.setNews(news)),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(News);
