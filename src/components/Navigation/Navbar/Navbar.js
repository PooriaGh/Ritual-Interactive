import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NavItems from './NavItems/NavItems';
import NavItem from './NavItems/NavItem/NavItem';

import Logo from '../../../assets/Logos/Logo.png';
import Logo2 from '../../../assets/Logos/Logo2.png';
import Britain from '../../../assets/Icons/BritainFlag.png';
import Poland from '../../../assets/Icons/PolandFlag.png';

import * as actions from '../../../store/actions/index';
import classes from './Navbar.module.scss';

const englishRoutes = [
  { name: 'games', value: 'en/games' },
  { name: 'contact', value: 'en/contact' },
  { name: 'about', value: 'en/about' },
];

const polishRoutes = [
  { name: 'gry', value: 'pl/games' },
  { name: 'kontakt', value: 'pl/contact' },
  { name: 'o spółce', value: 'pl/about' },
];

const Navbar = (props) => {
  let { pathname } = useLocation();

  const [navItems, setNavItems] = useState(englishRoutes);
  const [homePage, setHomePage] = useState(false);

  useEffect(() => {
    if (pathname === '/en' || pathname === '/pl') {
      setHomePage(true);
    } else {
      setHomePage(false);
    }
  }, [pathname]);

  useEffect(() => {
    setNavItems(props.isEnglish ? englishRoutes : polishRoutes);
  }, [props]);

  useEffect(() => {
    if (props.isAuthenticated) {
      if (navItems.filter((navItem) => navItem.name === 'admin').length === 0) {
        setNavItems((prevState) => [
          ...prevState,
          { name: 'admin', value: 'admin' },
        ]);
      }
    }
  }, [props, navItems]);

  return (
    <nav className={classes.navbar}>
      <li className={classes.navbar_item_logo}>
        <NavItem link={props.isEnglish ? '/en' : '/pl'} exact>
          <img
            alt=""
            className={classes.navbar_item_logo_img}
            src={homePage ? Logo : Logo2}
          />
        </NavItem>
      </li>
      <li
        className={classes.navbar_item_lang}
        onClick={() => {
          props.onLanguageToggled();
        }}
      >
        <span className={classes.navbar_item_lang_txt}>Language</span>
        <div className={classes.navbar_item_lang_box}>
          <img
            alt=""
            className={
              props.isEnglish
                ? classes.navbar_item_lang_box_flag_active
                : classes.navbar_item_lang_box_flag
            }
            src={Britain}
          />
          <img
            alt=""
            className={
              props.isEnglish
                ? classes.navbar_item_lang_box_flag
                : classes.navbar_item_lang_box_flag_active
            }
            src={Poland}
          />
        </div>
      </li>
      <NavItems navItems={[...navItems]} />
    </nav>
  );
};

const mapStateTopProps = (state) => {
  return {
    isEnglish: state.language.language,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLanguageToggled: () => dispatch(actions.toggleLanguage()),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(Navbar);
