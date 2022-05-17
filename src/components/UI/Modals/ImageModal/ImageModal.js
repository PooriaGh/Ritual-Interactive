import React, { useState } from 'react';
import { authAxios } from '../../../../axios-default';

import Modal from '../../../UI/Modals/Modal/Modal';
import LoginModal from '../../../UI/Modals/LoginModal/LoginModal';
import ProgressBar from '../../../UI/ProgressBar/ProgressBar';

import TrashCan from '../../../../assets/Icons/TrashCan.png';
import CheckMark from '../../../../assets/Icons/CheckMark.png';
import ExclamationMark from '../../../../assets/Icons/ExclamationMark.png';

import {
  httpStatusCodes,
  getImageUrl,
  generateOtherHttpErrorMessage,
} from '../../../../shared/Utilities/index';
import useHttpAuthHandler from '../../../../hooks/http-auth-handler';

import classes from './ImageModal.module.scss';

const ImageModal = (props) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  useHttpAuthHandler(authAxios);

  const {
    data,
    setData,
    modalData,
    setModalData,
    isModalShowed,
    setIsModalShowed,
    error,
    setError,
    isImageUploaded,
    setIsImageUploaded,
    modalShowHandler,
    isImageLarge,
    imageSize,
    zIndex,
  } = props;

  const fileSelectedHandler = (event) => {
    setUploading(true);
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('imageFile', selectedFile, selectedFile.name);

    authAxios
      .post('Photos/UploadPhoto', formData, {
        params: {
          imageSize: imageSize,
        },
        onUploadProgress: (ProgressEvent) => {
          setProgress(
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100),
          );
        },
      })
      .then((respone) => {
        setError(null);
        setUploading(false);
        setIsImageUploaded(true);
        isImageLarge
          ? setModalData({
              ...modalData,
              largeImageName: respone.data.data,
            })
          : setModalData({
              ...modalData,
              smallImageName: respone.data.data,
            });
      })
      .catch((error) => {
        const title = generateOtherHttpErrorMessage(error?.response);
        setError(title);
        setUploading(false);
        if (
          error.response &&
          error.response.status === httpStatusCodes.Unauthorized
        ) {
          setIsUnauthorized(true);
        }
      });
  };

  const confirmPhotoHandler = () => {
    const item = data.find((item) => item.orderIndex === modalData.orderIndex);
    const itemIndex = data.indexOf(item);
    if (data[itemIndex].actions === null) {
      data[itemIndex].actions = 'update';
    }
    isImageLarge
      ? (data[itemIndex].largeImageName = modalData.largeImageName)
      : (data[itemIndex].smallImageName = modalData.smallImageName);

    setData([...data]);
    setIsImageUploaded(false);
    setIsModalShowed(false);
  };

  const declinePhotoHandler = () => {
    authAxios
      .post(
        'Photos/CancelPhotoUpload',
        JSON.stringify(
          isImageLarge ? modalData.largeImageName : modalData.smallImageName,
        ),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        if (response.status === httpStatusCodes.Ok) {
          setIsImageUploaded(false);
          setIsModalShowed(false);
        }
      })
      .catch((error) => {
        const title = generateOtherHttpErrorMessage(error?.response);
        setError(title);
        if (
          error.response &&
          error.response.status === httpStatusCodes.Unauthorized
        ) {
          setIsUnauthorized(true);
        }
      });
  };

  const errorMessage = (
    <div className={classes.error_msg}>
      <img className={classes.error_msg_icon} src={ExclamationMark} alt="" />
      {error}
    </div>
  );

  const modalContentLarge = (
    <Modal
      class={classes.modal_large}
      show={isModalShowed}
      zIndex={zIndex}
      modalClosed={modalShowHandler}
    >
      <img
        className={classes.modal_large_img}
        src={getImageUrl(modalData.largeImageName)}
        alt=""
      />
      <div className={classes.modal_large_btns}>
        {isImageUploaded ? (
          <>
            <button
              className={classes.modal_large_btn_confirm}
              onClick={confirmPhotoHandler}
            >
              <img
                className={classes.modal_large_btn_confirm_icon}
                src={CheckMark}
                alt=""
              />
              Confirm
            </button>
            <button
              className={classes.modal_large_btn_decline}
              onClick={declinePhotoHandler}
            >
              <img
                className={classes.modal_large_btn_decline_icon}
                src={TrashCan}
                alt=""
              />
              Decline
            </button>
            {error ? errorMessage : null}
          </>
        ) : uploading ? (
          <ProgressBar progress={progress} />
        ) : (
          <>
            <label
              className={classes.modal_large_btn_choose_file}
              htmlFor="upload-file"
            >
              Choose Image
            </label>
            {error ? errorMessage : null}
            <input
              id="upload-file"
              className={classes.modal_large_btn_choose_file_input}
              type="file"
              onChange={(event) => fileSelectedHandler(event)}
            />
          </>
        )}
      </div>
    </Modal>
  );

  const modalContentSmall = (
    <Modal
      class={classes.modal_small}
      show={isModalShowed}
      zIndex={zIndex}
      modalClosed={modalShowHandler}
    >
      <img
        className={classes.modal_small_img}
        src={getImageUrl(modalData.smallImageName)}
        alt=""
      />
      <div className={classes.modal_small_btns}>
        {isImageUploaded ? (
          <>
            <button
              className={classes.modal_small_btn_confirm}
              onClick={confirmPhotoHandler}
            >
              <img
                className={classes.modal_small_btn_confirm_icon}
                src={CheckMark}
                alt=""
              />
              Confirm
            </button>
            <button
              className={classes.modal_small_btn_decline}
              onClick={declinePhotoHandler}
            >
              <img
                className={classes.modal_small_btn_decline_icon}
                src={TrashCan}
                alt=""
              />
              Decline
            </button>
            {error ? errorMessage : null}
          </>
        ) : uploading ? (
          <ProgressBar progress={progress} />
        ) : (
          <>
            <label
              className={classes.modal_small_btn_choose_file}
              htmlFor="upload-file"
            >
              Choose Image
            </label>
            {error ? errorMessage : null}
            <input
              id="upload-file"
              className={classes.modal_small_btn_choose_file_input}
              type="file"
              onChange={(event) => fileSelectedHandler(event)}
            />
          </>
        )}
      </div>
    </Modal>
  );

  return (
    <>
      <LoginModal
        show={isUnauthorized}
        modalClosed={() => setIsUnauthorized(false)}
      />
      {isImageLarge ? modalContentLarge : modalContentSmall}
    </>
  );
};

export default ImageModal;
