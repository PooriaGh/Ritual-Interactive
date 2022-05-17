import React from 'react';

import ImagePlaceholder from '../../../../assets/Imgs/ImagePlaceholder.png';

import classes from './ImagePlaceholder.module.scss';

const Image = () => (
  <img className={classes.image_placeholder} src={ImagePlaceholder} alt="" />
);

export default Image;
