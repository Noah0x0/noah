'use strict';

const { app, Tray, BrowserWindow } = require('electron');
const electronReload = require('electron-reload');
const lib = require('./lib/');
const constants = require('./constants');

electronReload(__dirname);

// Electron obj
let appIcon = null;
let win = null;

app.on('ready', function ready() {
  // hide icon on dock
  app.dock.hide();

  // Tray
  appIcon = new Tray(constants.trayIcon1);
  const trayBounds = appIcon.getBounds();

  // BrowserWindow
  win = new BrowserWindow({
    frame: false,
    width: 200,
    height: 200,
    x: trayBounds.x - 80,
    y: trayBounds.y,
  });
  win.loadURL(constants.windowURL);
  // Initialize hiding window
  win.hide();

  win.on('blur', () =>{
    win.hide();
  });

  appIcon.on('click', () => {
    // win.setPosition(trayBounds.x - 80, trayBounds.y);
    win.isVisible() ? win.hide() : win.show();
    win.webContents.send( 'ping', 'test' );
  });

  lib.polling(lib.requestWaterLevel, appIcon, '* */10 * * * *');
});
