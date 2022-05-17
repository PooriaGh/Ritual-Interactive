import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Navigation/Navbar/Navbar';

import Candle from '../../assets/Imgs/Candle.png';

import classes from './Layout.module.scss';

const Layout = (props) => (
  <>
    <Navbar isEnglish={props.isEnglish} />
    <main>{props.children}</main>;
    <div className={classes.candle_container}>
      <img className={classes.candle} src={Candle} alt=""></img>
      <div className={classes.candle_light}></div>
    </div>
  </>
);

const mapStateToProps = (state) => {
  return {
    isEnglish: state.language.language,
  };
};

export default connect(mapStateToProps)(Layout);
