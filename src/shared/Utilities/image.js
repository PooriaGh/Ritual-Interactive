import { baseURL } from '../../axios-default';

import HeroesAndGenerals2 from '../../assets/Imgs/HeroesAndGenerals2.png';
import HeroesAndGenerals3 from '../../assets/Imgs/HeroesAndGenerals3.png';

export const aspectRatio = {
  large: '460 / 215',
  small: '374 / 448',
};

export const imageSize = {
  default: 'news',
  large: 'large',
  small: 'small',
};

export const getImageUrl = (fileName, isImageLarge = false) => {
  return /\S/.test(fileName)
    ? baseURL + 'images/' + fileName
    : isImageLarge
    ? HeroesAndGenerals2
    : HeroesAndGenerals3;
};
