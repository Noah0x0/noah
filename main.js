'use strict';

const { app, Tray, BrowserWindow } = require('electron');
const mycron = require('cron').CronJob;
const fetch = require('isomorphic-fetch');
const notifier = require('node-notifier');

const waterLevelURL = '';

// icon
const trayIcon1 = `${ __dirname }/icon/tray-icon1.png`;
const trayIcon2 = `${ __dirname }/icon/tray-icon2.png`;
const trayIcon3 = `${ __dirname }/icon/tray-icon3.png`;
const trayIcon4 = `${ __dirname }/icon/tray-icon4.png`;
const trayIcon5 = `${ __dirname }/icon/tray-icon5.png`;
const pushIcon = `${ __dirname }/icon/push-icon.png`;

let appIcon = null;
let win = null;

app.on('ready', function ready() {
  // hide icon on dock
  app.dock.hide();

  // Tray
  appIcon = new Tray(trayIcon1);
  let trayBounds = appIcon.getBounds();

  // BrowserWindow
  win = new BrowserWindow({
    frame: false,
    width: 200,
    height: 200,
    x: trayBounds.x - 80,
    y: trayBounds.y,
  });
  win.loadURL(`file://${__dirname}/app/index.html`);

  win.on('blur', () =>{
    win.hide()
  });

  appIcon.on('click', () => {
    // win.setPosition(trayBounds.x - 80, trayBounds.y);
    win.isVisible() ? win.hide() : win.show()
  });

  polling(requestWaterLevel, '*/2 * * * * *');
  // String
  scheduledNotify(generateNotify, '*/10 * * * * *');
});




function polling(func, cronTime) {
  const job = new mycron({
    cronTime: cronTime,
    onTick: func,
    start: true,
  });
  job.start();
}

function generateNotify() {
  return notifier.notify({
    'title': '警告',
    'message': '水位が急上昇しています!',
    'icon': pushIcon,
  });
}

function scheduledNotify(func, cronTime) {
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
    appIcon.setImage(trayIcon1);
  } else if (randomNum === 1) {
    appIcon.setImage(trayIcon2);
  } else if (randomNum === 2) {
    appIcon.setImage(trayIcon3);
  } else if (randomNum === 3) {
    appIcon.setImage(trayIcon4);
  } else {
    appIcon.setImage(trayIcon5);
  }

  httpRequest(waterLevelURL, 'GET')
    .then((res) => console.log(res))
    .catch((err) => {
      console.error(err.stack);
    });
}

function httpRequest(path, method, body = undefined) {
  return fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error("Bad response from server")
      }
      return res.json();
    });
}
