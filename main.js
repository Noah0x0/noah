'use strict';

const { app, Tray, BrowserWindow } = require('electron');
const mycron = require('cron').CronJob;
const fetch = require('isomorphic-fetch');
const notifier = require('node-notifier');

// API URL
const waterLevelURL = '';
const rainFallURL = '';

// icon path
const trayIcon1 = `${ __dirname }/icon/tray-icon1.png`;
const trayIcon2 = `${ __dirname }/icon/tray-icon2.png`;
const trayIcon3 = `${ __dirname }/icon/tray-icon3.png`;
const trayIcon4 = `${ __dirname }/icon/tray-icon4.png`;
const trayIcon5 = `${ __dirname }/icon/tray-icon5.png`;
const pushIcon = `${ __dirname }/icon/push-icon.png`;

// HTML path
const windowURL = `file://${__dirname}/app/index.html`;

// Electron obj
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
  win.loadURL(windowURL);
  // Initialize hiding window
  win.hide();

  win.on('blur', () =>{
    win.hide()
  });

  appIcon.on('click', () => {
    // win.setPosition(trayBounds.x - 80, trayBounds.y);
    win.isVisible() ? win.hide() : win.show()
  });

  polling(requestWaterLevel, '* */10 * * * *');
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
  httpRequest(waterLevelURL, 'GET')
    .then((res) => {
      console.log(res);
      try {
        setTrayIconForWaterLevel(res);
      } catch (err) {
        throw err;
      }
    })
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

function setTrayIconForWaterLevel(waterLevel) {
  const embankmentHeight = waterLevel.height;
  const currentWaterLevel = waterLevel.latestDate['4_10'].dataStr;
  const levelOfWaterLevel= (currentWaterLevel / embankmentHeight) * 100;
  console.log(levelOfWaterLevel);

  let trayIcon;
  if (levelOfWaterLevel >= 0 && levelOfWaterLevel < 20) {
    trayIcon = trayIcon1;
  } else if (levelOfWaterLevel >= 20 && levelOfWaterLevel < 40) {
    trayIcon = trayIcon2;
  } else if (levelOfWaterLevel >= 40 && levelOfWaterLevel < 60) {
    trayIcon = trayIcon3;
    generateNotify(); // TODO: 水位 or 降水量の遷移によって通知を出し分ける
  } else if (levelOfWaterLevel >= 60 && levelOfWaterLevel < 80) {
    trayIcon = trayIcon4;
    generateNotify(); // TODO: 水位 or 降水量の遷移によって通知を出し分ける
  } else if (levelOfWaterLevel >= 80 && levelOfWaterLevel < 100) {
    trayIcon = trayIcon5;
    generateNotify(); // TODO: 水位or 降水量の遷移によって通知を出し分ける
  } else {
    throw new Error(`Fault levelOfWaterLevel. levelOfWaterLevel: ${levelOfWaterLevel}`);
  }
  appIcon.setImage(trayIcon);
}

function generateNotify() {
  return notifier.notify({
    'title': '警告',
    'message': '水位が急上昇しています!',
    'icon': pushIcon,
  });
}
