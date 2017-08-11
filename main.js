'use strict';

const { app, Tray, BrowserWindow } = require('electron');
const electronReload = require('electron-reload');
const lib = require('./lib/');
const constants = require('./constants');

electronReload(__dirname);

// Electron obj
let appIcon = null;
let win = null;

// init
app.on('ready', () => {
  // hide icon on dock
  app.dock.hide();

  // Tray
  appIcon = new Tray(constants.trayIcon1);
  const trayBounds = appIcon.getBounds();

  // Window
  win = new BrowserWindow({
    show: false,
    frame: false,
    width: 200,
    height: 200,
    x: trayBounds.x - 80,
    y: trayBounds.y,
  });
  win.loadURL(constants.windowURL);

  // On blur hide window
  win.on('blur', () => win.hide());

  appIcon.on('click', () => {
    // Switch window
    win.isVisible() ? win.hide() : win.show();

    // View Reflect
    const data = 99999; // example data
    win.webContents.send('dataReflect', data);
  });

  // Run Polling
  lib.polling(lib.requestWaterLevel, appIcon, '* */10 * * * *');
});
