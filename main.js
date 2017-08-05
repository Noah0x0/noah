'use strict';

const electron = require('electron');
const menubar = require('menubar');
const path = require('path');

const mb = menubar({
  dir: path.join(__dirname, '/app'),
  width: 200,
  height: 200,
  icon: path.join(__dirname, '/app/icon.png'),
  preloadWindow: true,
  alwaysOnTop: false
});

mb.on('ready', function ready() {
  console.log('app is ready');
});
