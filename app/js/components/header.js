'use strict';

import React from 'react';
import { ipcRenderer } from 'electron';
import getMenu from '../menu';

const onRefresh = (e, current) => {
  ipcRenderer.send('refresh', current);
};

const openMenu = () => {
  const menu = getMenu();
  menu.popup();
};

const Header = (props) => {
  return (
    <header className="noah-header">
      <i className="fa fa-refresh" aria-hidden="true" aria-label="Refresh"
        onClick={(e) => onRefresh(e, props.current)}
      ></i>
      <h1>noah</h1>
      <i className="fa fa-cog" aria-hidden="true" aria-label="Options" onClick={openMenu}></i>
    </header>
  );
};

export default Header;
