'use strict';

const { app, Tray, BrowserWindow, ipcMain } = require('electron');
const openAboutWindow = require('about-window').default;
const notifier = require('node-notifier');
const Lib = require('./lib/');
const constants = require('./constants');

// Electron obj
let appIcon = null;
let win = null;
process.env.GOOGLE_API_KEY = constants.apikey;

// init
app.on('ready', () => {

  const lib = new Lib({
    country: 'japan',
    prefecture: 'ishikawa',
    river: 'asano',
  }, process.env.LAMBDA_HOST, process.env.NODE_ENV);

  // hide icon on dock
  if (process.platform === 'darwin') {
    app.dock.hide();
  }

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
    height: 450,
    minWidth: 430,
    minHeight: 450,
    x: trayBounds.x - 400,
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
    }
  });

  win.on('show', () => {
    win.webContents.send('dataReflect', lib.getData());
    win.webContents.send('locationReflect', lib.getLocation());
  });

  // Update Location
  ipcMain.on('updateLocation', (e, current) => {
    lib.setCurrentLocation(current);
    win.webContents.send('locationReflect', lib.getLocation());
  });

  // Update Geolocation
  ipcMain.on('updateGeolocation', (e, geolocation) => {
    lib.setGeolocation(geolocation);
  });

  // Refresh
  ipcMain.on('refresh', () => {
    win.webContents.send('dataReflect', lib.getData());
    win.webContents.send('locationReflect', lib.getLocation());
  });

  // About Setting
  ipcMain.on('about', () => openAboutWindow({
    icon_path: constants.aboutIcon,
    description: 'noah will let you know the water level of the nearest river in the menu bar.',
    css_path: constants.aboutCss,
    win_options: {
      height: 330,
      width: 550,
    }
  }));

  // Click notification to show window
  notifier.on('click', () => win.show());

  // Run Polling
  lib.polling(appIcon, '* */10 * * * *');
});
