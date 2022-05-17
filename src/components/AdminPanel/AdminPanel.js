import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import News from './News/News';
import Games from './Games/Games';

import classes from './AdminPanel.module.scss';
import './AdminPanel.scss';

const adminComponents = {
  news: false,
  games: true,
};

const AdminPanel = (props) => {
  const [cmp, setCmp] = useState(adminComponents.news);

  const adminRouteHandler = (component) => {
    component === adminComponents.news
      ? setCmp(adminComponents.news)
      : setCmp(adminComponents.games);
  };

  let component = null;
  if (!props.isAuthenticated) {
    component = <Redirect to="/login" />;
  } else {
    component = (
      <div>
        <section className={classes.section_admin_panel}>
          <h2 className={classes.section_admin_panel_title}>admin panel</h2>
        </section>
        <ul className={classes.section_admin_panel_tabs}>
          <li
            className={
              cmp === adminComponents.news
                ? classes.section_admin_panel_tabs_items_active
                : classes.section_admin_panel_tabs_items
            }
            onClick={() => adminRouteHandler(adminComponents.news)}
          >
            <div className={classes.section_admin_panel_tabs_item_text}>
              news
            </div>
          </li>
          <li
            className={
              cmp === adminComponents.games
                ? classes.section_admin_panel_tabs_items_active
                : classes.section_admin_panel_tabs_items
            }
            onClick={() => adminRouteHandler(adminComponents.games)}
          >
            <div className={classes.section_admin_panel_tabs_item_text}>
              games
            </div>
          </li>
          <div
            className={
              cmp === adminComponents.news
                ? classes.section_admin_panel_tabs_item_active_effect_news
                : classes.section_admin_panel_tabs_item_active_effect_games
            }
          />
        </ul>
        <SwitchTransition>
          <CSSTransition
            key={cmp}
            timeout={{ enter: 400, exit: 300 }}
            classNames="animated-page"
          >
            {cmp === adminComponents.games ? <Games /> : <News />}
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }

  return component;
};

const mapStateTopProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateTopProps)(AdminPanel);
