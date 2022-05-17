import React from 'react';

import NavItem from './NavItem/NavItem';

import classes from './NavItems.module.scss';

const NavItems = (props) => {
  return (
    <ul className={classes.navbar_item_pages}>
      {props.navItems.map((navItem, index) => (
        <li key={index}>
          <NavItem
            class={classes.navbar_item_page_link}
            activeClass={classes.navbar_item_page_link_active}
            activeClassEffect={classes.navbar_item_page_link_effect_active}
            link={'/' + navItem.value}
          >
            {navItem.name}
          </NavItem>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
