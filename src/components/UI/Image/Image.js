import React, { useState } from 'react';

import ImagePlaceholder from './ImagePlaceholder/ImagePlaceholder';

import { getImageUrl } from '../../../shared/Utilities/index';

import classes from './Image.module.scss';

const Image = ({ className, src, aspectRatio }) => {
  const [loaded, setLoaded] = useState(false);
  const imgSrc = getImageUrl(src);

  return (
    <>
      <img src={imgSrc} onLoad={() => setLoaded(true)} alt="" hidden />
      {loaded ? (
        <img className={className} src={imgSrc} alt="" />
      ) : (
        <div
          className={classes.image_placeholder_container}
          style={{ aspectRatio: aspectRatio }}
        >
          <ImagePlaceholder />
        </div>
      )}
    </>
  );
};

export default Image;
