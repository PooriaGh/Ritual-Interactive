import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Layout from './hoc/Layout/Layout';
import ScrollToTop from './hoc/ScrollToTop/ScrollToTop';
import HomePageEN from './components/HomePage/HomePage_EN';
import HomePagePL from './components/HomePage/HomePage_PL';
import GamesEN from './components/Games/Games_EN';
import GamesPL from './components/Games/Games_PL';
import ContactEN from './components/Contact/Contact_EN';
import ContactPL from './components/Contact/Contact_PL';
import AboutEN from './components/About/About_EN';
import AboutPL from './components/About/About_PL';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Login from './components/Auth/Login/Login';
import Profile from './components/Auth/Profile/Profile';
import ErrorModal from './components/UI/Modals/ErrorModal/ErrorModal';

import * as actions from './store/actions/index';

import './App.scss';

const englishRoutes = [
  { path: '/en', component: HomePageEN },
  { path: '/en/games', component: GamesEN },
  { path: '/en/contact', component: ContactEN },
  { path: '/en/about', component: AboutEN },
  { path: '/admin', component: AdminPanel },
  { path: '/login', component: Login },
  { path: '/resetpassword/:token', component: Profile },
  { redirect: true, to: '/en' },
];

const polishRoutes = [
  { path: '/pl', component: HomePagePL },
  { path: '/pl/games', component: GamesPL },
  { path: '/pl/contact', component: ContactPL },
  { path: '/pl/about', component: AboutPL },
  { path: '/admin', component: AdminPanel },
  { path: '/login', component: Login },
  { path: '/resetpassword/:token', component: Profile },
  { redirect: true, to: '/pl' },
];

const App = (props) => {
  props.onTokenChecked();
  let location = useLocation();
  let routesData = !props.isEnglish ? polishRoutes : englishRoutes;

  let routes = routesData.map((route, index) => {
    if (route.redirect) {
      return <Redirect key={index} to={route.to} />;
    } else {
      return (
        <Route
          key={index}
          path={route.path}
          exact
          component={route.component}
        />
      );
    }
  });

  return (
    <Layout>
      <ScrollToTop />
      <ErrorModal />
      <SwitchTransition>
        <CSSTransition
          key={location.key}
          classNames="animated-page"
          timeout={{ enter: 500, exit: 400 }}
        >
          <Switch location={location || location.pathname + location.search}>
            {routes}
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </Layout>
  );
};

const mapStateTopProps = (state) => {
  return {
    isEnglish: state.language.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTokenChecked: () => dispatch(actions.authCheckToken()),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(App);
