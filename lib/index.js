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

const requestWaterLevel = (url, param) => {
  httpRequest(url, 'GET')
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
};

const getWarning = (precipitation, trendencyPr, trendencyWl) => {
  return precipitation > 100 && (trendencyPr === 4 || trendencyWl === 4);
};

// export class
module.exports = class Lib {
  constructor(country, prefecture, river) {
    this.host = 'xxxxxxxxxxxxxx';
    this.country = country;
    this.prefecture = prefecture;
    this.river = river;
    this.list = [
      { country: 'japan', prefecture: 'ishikawa', river: 'asano' },
      { country: 'japan', prefecture: 'tokyo', river: 'sumida' },
    ];
  }
  setCurrentLocation ({ country = this.country, prefecture = this.prefecture, river = this.river }) {
    this.country = country;
    this.prefecture = prefecture;
    this.river = river;
  }
  getCurrentLocation () {
    return { country: this.country, prefecture: this.prefecture, river: this.river };
  }
  getWaterLevelURL () {
    return `https://${this.host}/production/water-level/countries/${this.country}/prefectures/${this.prefecture}/rivers/${this.river}`;
  }
  getRainFallURL () {
    return '';
  }
  getData () {
    // example data
    const precipitation = Math.floor(Math.random() * 999);
    const trendencyPr = Math.floor(Math.random() * 5);
    const trendencyWl = Math.floor(Math.random() * 5);
    const warning = getWarning(precipitation, trendencyPr, trendencyWl);
    return {
      precipitation,
      trendencyPr,
      trendencyWl,
      warning,
    };
  }

  getQrCode () {
    // ここでURLを生成するロジックを書く
    return {
      src: 'http://chart.apis.google.com/chart?chs=150x150&cht=qr&chl=http://lgtm.in/i/yFqM3iGVp'
    };
  }

  getLocation () {
    return {
      current: this.getCurrentLocation(),
      list: this.list,
    };
  }
  polling (param, cronTime) {
    const job = new CronJob({
      cronTime,
      onTick: () => requestWaterLevel(this.getWaterLevelURL, param),
      start: true,
    });
    job.start();
  }
}
