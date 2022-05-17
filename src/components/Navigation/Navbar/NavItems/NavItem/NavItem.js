import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => (
  <NavLink
    className={props.class}
    activeClassName={props.activeClass}
    to={props.link}
    exact={props.exact}
  >
    {props.children}
    <div className={props.activeClassEffect} />
  </NavLink>
);

export default NavItem;
