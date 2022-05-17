import React from 'react';

import ImagePlaceholder from '../../../UI/Image/ImagePlaceholder/ImagePlaceholder';

import classes from './GameSmall.module.scss';

const GameSmallPlaceholder = () => {
  return (
    <div className={classes.game_container_placeholder}>
      <div className={classes.game_img_placeholder} />
      <ImagePlaceholder />
    </div>
  );
};

export default GameSmallPlaceholder;
