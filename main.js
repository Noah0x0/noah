'use strict';

const { app, Tray, BrowserWindow } = require('electron');
const mycron = require('cron').CronJob;
const fetch = require('isomorphic-fetch');

const waterLevelURL = '';

let appIcon = null;
let win = null;

app.on('ready', function ready() {
  // hide icon on dock
  app.dock.hide();

  // Tray
  appIcon = new Tray(`${__dirname}/icon/icon1.png`);
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
  appIcon.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  });

  polling(requestWaterLevel, '*/2 * * * * *');
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

