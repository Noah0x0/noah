'use strict';

const CronJob = require('cron').CronJob;
const fetch = require('isomorphic-fetch');
const notifier = require('node-notifier');
const constants = require('../constants');

const httpRequest = (path, method, body = undefined) => {
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
};

const setTrayIconForWaterLevel = (waterLevel, appIcon = null) => {
  const embankmentHeight = waterLevel.height;
  const currentWaterLevel = waterLevel.latestDate['4_10'].dataStr;
  const levelOfWaterLevel= (currentWaterLevel / embankmentHeight) * 100;

  let trayIcon;
  if (levelOfWaterLevel >= 0 && levelOfWaterLevel < 20) {
    trayIcon = constants.trayIcon1;
  } else if (levelOfWaterLevel >= 20 && levelOfWaterLevel < 40) {
    trayIcon = constants.trayIcon2;
  } else if (levelOfWaterLevel >= 40 && levelOfWaterLevel < 60) {
    trayIcon = constants.trayIcon3;
    this.generateNotify(); // TODO: 水位 or 降水量の遷移によって通知を出し分ける
  } else if (levelOfWaterLevel >= 60 && levelOfWaterLevel < 80) {
    trayIcon = constants.trayIcon4;
    this.generateNotify(); // TODO: 水位 or 降水量の遷移によって通知を出し分ける
  } else if (levelOfWaterLevel >= 80 && levelOfWaterLevel < 100) {
    trayIcon = constants.trayIcon5;
    this.generateNotify(); // TODO: 水位or 降水量の遷移によって通知を出し分ける
  } else {
    throw new Error(`Fault levelOfWaterLevel. levelOfWaterLevel: ${levelOfWaterLevel}`);
  }

  if (appIcon) {
    appIcon.setImage(trayIcon);
  }
};

const generateNotify = () => {
  return notifier.notify({
    'title': '警告',
    'message': '水位が急上昇しています!',
    'icon': constants.pushIcon,
  });
};

// export functions
module.exports = {
  polling: (func, param, cronTime) => {
    const job = new CronJob({
      cronTime,
      onTick: () => func(param),
      start: true,
    });
    job.start();
  },
  requestWaterLevel: (param) => {
    httpRequest(constants.waterLevelURL, 'GET')
      .then((res) => {
        try {
          setTrayIconForWaterLevel(res, param);
        } catch (err) {
          throw err;
        }
      })
      .catch((err) => {
        console.error(err.stack);
      });
  },
  getData: (current) => {
    console.log(current) // Location number
    return {
      precipitation: Math.floor(Math.random() * 999), // example data
      trendencyPr: Math.floor(Math.random() * 5), // example data
      trendencyWl: Math.floor(Math.random() * 5) // example data
    };
  },
  getLocation: () => {
    return [
      'Japan, Ishikawa, Asano river',
      'Japan, Tokyo, Sumida river'
    ];
  },
}
