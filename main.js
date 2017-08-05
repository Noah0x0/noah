'use strict';

const { app, Tray, Menu } = require('electron');
const mycron = require('cron').CronJob;

let appIcon = null;

app.on('ready', function ready() {
  appIcon = new Tray(`${__dirname}/icon/icon1.png`);

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
  // hide icon on dock
  app.dock.hide();

  polling(requestWaterLevel, '* * * * * *');
});

function polling(func, cronTime) {
  const job = new mycron({
    cronTime: cronTime,
    onTick: func,
    start: true,
  });
  job.start();
}

function requestWaterLevel() {
  const min = 0 ;
  const max = 4 ;
  const randomNum = Math.floor( Math.random() * (max + 1 - min) ) + min;
  if (randomNum === 0) {
    appIcon.setImage(`${__dirname}/icon/icon1.png`);
  } else if (randomNum === 1) {
    appIcon.setImage(`${__dirname}/icon/icon2.png`);
  } else if (randomNum === 2) {
    appIcon.setImage(`${__dirname}/icon/icon3.png`);
  } else if (randomNum === 3) {
    appIcon.setImage(`${__dirname}/icon/icon4.png`);
  } else {
    appIcon.setImage(`${__dirname}/icon/icon5.png`);
  }
}
