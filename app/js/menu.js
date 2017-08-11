'use strict';

import { remote, ipcRenderer } from 'electron';
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

const about = {
  label: 'About noah',
  type: 'normal',
  click: () => ipcRenderer.send('about'),
};
const quit = {
  label: 'Quit noah',
  type: 'normal',
  accelerator: 'CmdOrCtrl+Q',
  role: 'quit'
};

const getMenu = () => {
  const menu = new Menu();
  menu.append(new MenuItem(about));
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem(quit));
  return menu;
};

export default getMenu;
