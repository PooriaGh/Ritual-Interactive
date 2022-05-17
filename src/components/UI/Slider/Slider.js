import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import Arrow from '../../../assets/Icons/Arrow.png';

import { getImageUrl } from '../../../shared/Utilities/index';

import classes from './Slider.module.scss';
import './Slider.scss';

const Slider = ({ isEnglish, slides, loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentContent, setCurrentContent] = useState(0);
  const count = slides.length;
  const [arrow, setArrow] = useState(false);

  const nextSlide = () => {
    setArrow(false);
    setCurrentContent(currentContent === count - 1 ? 0 : currentContent + 1);
    setCurrentSlide(currentSlide === count - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setArrow(true);
    setCurrentContent(currentContent === 0 ? count - 1 : currentContent - 1);
    setCurrentSlide(currentSlide === 0 ? count - 1 : currentSlide - 1);
  };

  const chooseSlide = (index, active) => {
    if (!active) {
      setCurrentContent(index);
      setTimeout(() => {
        setCurrentSlide(-1);
        setTimeout(() => {
          setCurrentSlide(index);
        }, 100);
      }, 300);
    }
  };

  useEffect(() => {
    const timer =
      !loading && count > 1 ? setInterval(() => nextSlide(), 10000) : null;
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [currentSlide, count, loading]);

  const slider = slides.map((slide, index) => (
    <React.Fragment key={index}>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={index}
        in={index === currentSlide}
        timeout={{ enter: 800, exit: 500 }}
        classNames={`animated-slider-img-${arrow ? 'rtl' : 'ltr'}`}
      >
        <>
          <img
            className={classes.slider_img_large}
            src={getImageUrl(slide.largeImageName)}
            alt=""
          />
          <img
            className={classes.slider_img_small}
            src={getImageUrl(slide.smallImageName)}
            alt=""
          />
        </>
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={index === currentContent}
        timeout={{ enter: 1000, exit: 300 }}
        classNames="animated-slider-content"
      >
        <div className={classes.slider_content}>
          <h2 className={classes.slider_content_title}>
            {isEnglish ? slide.title_Eng : slide.title_Pol}
          </h2>
          <p className={classes.slider_content_text}>
            {isEnglish ? slide.article_Eng : slide.article_Pol}
          </p>
          <div className={classes.slider_content_btn_container}>
            {slide.buttons.map((btn, index) => (
              <button
                key={index}
                className={classes.slider_content_btn}
                href={btn.url}
                target="_blank"
              >
                {isEnglish ? btn.name_eng : btn.name_pol}
              </button>
            ))}
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  ));

  return (
    <section className={classes.slider_container}>
      {loading ? <div className={classes.slider_img_placeholder} /> : slider}
      {!loading && count > 1 ? (
        <>
          <button className={classes.slider_arrow_left} onClick={prevSlide}>
            <img
              className={classes.slider_arrow_left_icon}
              src={Arrow}
              alt=""
            />
          </button>
          <button className={classes.slider_arrow_right} onClick={nextSlide}>
            <img
              className={classes.slider_arrow_right_icon}
              src={Arrow}
              alt=""
            />
          </button>
          <div className={classes.slider_counter}>
            {slides.map((slide, index) => (
              <span
                className={
                  index === currentSlide
                    ? classes.slider_counter_item_active
                    : classes.slider_counter_item
                }
                key={index}
                onClick={() => chooseSlide(index, index === currentSlide)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
};

export default Slider;
