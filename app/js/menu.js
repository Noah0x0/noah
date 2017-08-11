'use strict';

const { remote } = require('electron');
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

const about = {
  label: 'About noah',
  type: 'normal',
  role: 'about'
};
const quit = {
  label: 'Quit noah',
  type: 'normal',
  accelerator: 'CmdOrCtrl+Q',
  role: 'quit'
};

module.exports = {
  getMenu: () => {
    const menu = new Menu();
    menu.append(new MenuItem(about));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem(quit));
    return menu;
  },
}
