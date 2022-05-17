import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import NavItem from '../Navigation/Navbar/NavItems/NavItem/NavItem';
import Modal from '../UI/Modals/Modal/Modal';
import Slider from '../UI/Slider/Slider';
import Image from '../UI/Image/Image';
import TrailerIcon from '../UI/SvgComponents/TrailerIcon/TrailerIcon';
import SteamIcon from '../UI/SvgComponents/SteamIcon/SteamIcon';
import ImagePlaceholder from '../UI/Image/ImagePlaceholder/ImagePlaceholder';

import Facebook from '../../assets/Icons/Facebook.png';
import Youtube from '../../assets/Icons/Youtube.png';
import Twitter from '../../assets/Icons/Twitter.png';
import Linkedin from '../../assets/Icons/Linkedin.png';
import Instagram from '../../assets/Icons/Instagram.png';
import Steam from '../../assets/Icons/Steam.png';
import WhoWeAre from '../../assets/Imgs/WhoWeAre.png';
import SocialMedia from '../../assets/Imgs/SocialMedia.png';

import * as actions from '../../store/actions/index';
import { aspectRatio, generateTrailerLink } from '../../shared/Utilities/index';

import classes from './HomePage.module.scss';

const language = { english: '/en', polish: '/pl' };

const linkPrefix = language.english;

const links = {
  games: linkPrefix + '/games',
  contact: linkPrefix + '/contact',
  about: linkPrefix + '/about',
};

const socialMediaData = [
  {
    src: Youtube,
    link: 'https://www.youtube.com/channel/UCqoO6mwEV-BjqWHLqpfYqbg',
  },
  { src: Twitter, link: 'https://twitter.com/Ritual_Int' },
  { src: Facebook, link: 'https://www.facebook.com/Ritual.Int' },
  { src: Instagram, link: 'https://www.instagram.com/ritualinteractive' },
  { src: Linkedin, link: 'https://www.linkedin.com/company/68706928/admin' },
];

const content = {
  news: 'news',
  games: 'Find Out More About Our Games',
  socialMedia: [
    'stay updated',
    'Follow us on our social media to get the latest news.',
  ],
  contact: [
    'message us',
    'Looking to cooperate with us?',
    'Want to share an opinion?',
    'Send us a message today!',
    'contact us',
  ],
  about: [
    'who are we ?',
    'Ritual Interactive',
    'is an indie game developer and publisher. We devise innovative, fun concepts for video games and work with our numerous associates to make them available for the gaming audience to enjoy worldwide!',
    'more about us',
  ],
  genre: 'Genres',
  readMore: ['close description', 'read more'],
  steam: 'steam',
  information: 'information',
  trailer: 'trailer',
};

const HomePage = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTab, setModalTab] = useState(true);
  const [modalGame, setModalGame] = useState({});
  const [readMore, setReadMore] = useState(false);

  // states
  const news = props.news.data;
  const newsLoading = props.news.loading;

  const games = props.games.data;
  const gamesLoading = props.games.loading;

  // actions
  const { onErrorCleared, onNewsFetched, onGamesFetched } = props;

  useEffect(() => {
    onErrorCleared();
    onNewsFetched();
    onGamesFetched();
  }, [onErrorCleared, onNewsFetched, onGamesFetched]);

  const toggleModalTab = (modalTab) => {
    setModalTab(modalTab);
  };

  const modalShowHandler = (index) => {
    if (!modalShow) {
      setModalGame({ ...games[index] });
      setReadMore(false);
      setModalTab(true);
    }
    setModalShow((prevState) => !prevState);
  };

  const modalInformationTab = (
    <>
      <Image
        className={classes.modal_img}
        src={modalGame.largeImageName}
        aspectRatio={aspectRatio.large}
      />
      <div className={classes.modal_title}>{modalGame.name}</div>
      <div className={classes.modal_genre}>
        <span className={classes.modal_genre_title}>{content.genre}: </span>
        {modalGame.genres
          ? modalGame.genres.map((genre, index) => (
              <span className={classes.modal_genre_text} key={index}>
                {index === modalGame.genres.length - 1 ? genre : genre + ','}
              </span>
            ))
          : null}
      </div>
      <div
        className={readMore ? classes.modal_desc_active : classes.modal_desc}
      >
        <p
          className={
            readMore ? classes.modal_desc_text_active : classes.modal_desc_text
          }
        >
          {modalGame.description_Eng}
        </p>
      </div>
      <div
        className={classes.modal_desc_read_more}
        onClick={() => setReadMore((prevState) => !prevState)}
      >
        {readMore ? content.readMore[0] : content.readMore[1]}
      </div>
      <a
        className={classes.modal_btn}
        href={modalGame.steamUrl}
        target="_blank"
        rel="noreferrer"
      >
        <img className={classes.modal_btn_icon} src={Steam} alt="" />
        {content.steam}
      </a>
    </>
  );

  const modalTrailerTab = (
    <div className={classes.modal_video}>
      <iframe
        className={classes.modal_video_iframe}
        src={generateTrailerLink(modalGame.trailerUrl)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );

  const modalButtons = (
    <div className={classes.modal_btns}>
      <div
        className={
          modalTab
            ? classes.modal_btns_active_border_information
            : classes.modal_btns_active_border_trailer
        }
      ></div>
      <button
        className={
          modalTab ? classes.modal_btns_item_active : classes.modal_btns_item
        }
        onClick={() => toggleModalTab(true)}
      >
        <SteamIcon className={classes.modal_btns_item_icon}></SteamIcon>
        {content.information}
      </button>
      <button
        className={
          modalTab ? classes.modal_btns_item : classes.modal_btns_item_active
        }
        onClick={() => toggleModalTab(false)}
      >
        <TrailerIcon className={classes.modal_btns_item_icon}></TrailerIcon>
        {content.trailer}
      </button>
    </div>
  );

  const modalContent = (
    <>
      {modalTab ? modalInformationTab : modalTrailerTab}
      {modalButtons}
    </>
  );

  const gamesImagesPlaceholder = (
    <div className={classes.section_games_imgs}>
      {[1, 2, 3].map((item, index) => (
        <div
          className={classes.section_games_img_container_placeholder}
          key={index}
        >
          <div className={classes.section_games_img_placeholder} />
          <ImagePlaceholder />
        </div>
      ))}
    </div>
  );

  const gamesImages = (
    <div className={classes.section_games_imgs}>
      {games.map((game, index) => (
        <div
          className={classes.section_games_img_container}
          key={index}
          onClick={() => modalShowHandler(index)}
        >
          <Image
            className={classes.section_games_img}
            src={game.smallImageName}
            aspectRatio={aspectRatio.small}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Modal
        class={classes.modal}
        show={modalShow}
        zIndex={200}
        modalClosed={modalShowHandler}
      >
        {modalContent}
      </Modal>
      <section className={classes.section_games}>
        {gamesLoading ? gamesImagesPlaceholder : gamesImages}
        <NavItem exact link={links.games}>
          <button className={classes.section_btn}>{content.games}</button>
        </NavItem>
      </section>
      <hr className={classes.section_horizontal_rule} />
      <section>
        <h2 className={classes.section_news_title}>{content.news}</h2>
        <Slider isEnglish slides={news} loading={newsLoading} />
      </section>
      <hr className={classes.section_horizontal_rule} />
      <section className={classes.section_social_media}>
        <h2 className={classes.section_title}>{content.socialMedia[0]}</h2>
        <p className={classes.section_desc}>{content.socialMedia[1]}</p>
        <div className={classes.section_social_media_icons}>
          {socialMediaData.map((item, index) => (
            <a
              key={index}
              className={classes.section_social_media_icon}
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className={classes.section_social_media_icon_img}
                alt=""
                src={item.src}
              />
            </a>
          ))}
        </div>
        <img
          className={classes.section_social_media_image}
          src={SocialMedia}
          alt=""
        />
      </section>
      <hr className={classes.section_horizontal_rule} />
      <section className={classes.section_contact}>
        <h2 className={classes.section_title}>{content.contact[0]}</h2>
        <p className={classes.section_desc}>{content.contact[1]}</p>
        <p className={classes.section_desc}>{content.contact[2]}</p>
        <p className={classes.section_desc}>{content.contact[3]}</p>
        <NavItem exact link={links.contact}>
          <button className={classes.section_btn}>{content.contact[4]}</button>
        </NavItem>
      </section>
      <hr className={classes.section_horizontal_rule} />
      <section className={classes.section_about_us}>
        <h2 className={classes.section_title}>{content.about[0]}</h2>
        <p className={classes.section_desc}>
          <span className={classes.section_desc_italic}>
            {content.about[1]}
          </span>{' '}
          {content.about[2]}
        </p>
        <NavItem exact link={links.about}>
          <button className={classes.section_btn}>{content.about[3]}</button>
        </NavItem>
        <img className={classes.section_about_us_image} src={WhoWeAre} alt="" />
      </section>
      <hr className={classes.section_horizontal_rule} />
      <section className={classes.section_footer}></section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news,
    games: state.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onErrorCleared: () => {
      dispatch(actions.clearNewsError());
      dispatch(actions.clearGamesError());
    },
    onNewsFetched: () => dispatch(actions.fetchNews()),
    onGamesFetched: () => dispatch(actions.fetchGames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
