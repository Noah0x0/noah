'use strict';

const { app, Tray, Menu } = require('electron');

let appIcon = null;

app.on('ready', function ready() {
  appIcon = new Tray(`${__dirname}/app/icon.png`);

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);

  appIcon.setImage(`${__dirname}/app/icon2.png`);
  appIcon.setImage(`${__dirname}/app/icon1.png`);
});
