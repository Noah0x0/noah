'use strict';

const electron = require('electron');
const menubar = require('menubar');
const path = require('path');

const mb = menubar({index: path.join(`file://${ __dirname }/index.html`), width:300, height:200, preloadWindow:true});
mb.on('ready', function ready() {
  console.log('app is ready');
});
