'use strict';

const { app, Tray, BrowserWindow, ipcMain } = require('electron');
const openAboutWindow = require('about-window').default;
const electronReload = require('electron-reload');
const Lib = require('./lib/');
const constants = require('./constants');

electronReload(__dirname);

// Electron obj
let appIcon = null;
let win = null;

// init
app.on('ready', () => {

  const lib = new Lib(
    'japan',
    'ishikawa',
    'asano',
  );

  // hide icon on dock
  app.dock.hide();

  // Tray
  appIcon = new Tray(constants.trayIcon1);
  const trayBounds = appIcon.getBounds();

  // Window
  win = new BrowserWindow({
    title: 'noah',
    show: false,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    width: 430,
    height: 300,
    minWidth: 430,
    minHeight: 300,
    x: trayBounds.x - 80,
    y: trayBounds.y,
  });
  win.loadURL(constants.windowURL);

  // On blur hide window
  win.on('blur', () => win.hide());

  appIcon.on('click', () => {
    const isVisible = win.isVisible();
    if (isVisible) {
      win.hide();
    } else {
      win.show();

      // View Reflect
      win.webContents.send('dataReflect', lib.getData());
      win.webContents.send('locationReflect', lib.getLocation());
    }
  });

  // Update Location
  ipcMain.on('updateLocation', (e, current) => {
    lib.setCurrentLocation(current);
    win.webContents.send('locationReflect', lib.getLocation());
  });

  // Refresh
  ipcMain.on('refresh', () => {
    win.webContents.send('dataReflect', lib.getData());
    win.webContents.send('locationReflect', lib.getLocation());
  });

  // About Setting
  ipcMain.on('about', () => openAboutWindow({
    icon_path: constants.pushIcon,
    description: 'noah will let you know the water level of the nearest river in the menu bar.',
    css_path: constants.aboutCss,
    win_options: {
      height: 330,
      width: 550,
    }
  }));

  // Run Polling
  lib.polling(appIcon, '* */10 * * * *');
});
