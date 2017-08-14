'use strict';

import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import Header from './components/header';
import Main from './components/main';

class App extends Component {
  constructor() {
    super();
    this.updateCurrent = this.updateCurrent.bind(this);
    this.getMeridianSearchURL = this.getMeridianSearchURL.bind(this);
    this.state = {
      current: { country: '---', prefecture: '---', river: '---' },
      list: [{ country: '---', prefecture: '---', river: '---' }],
      data: {
        precipitation: 0,
        trendencyPr: 0,
        trendencyWl: 0,
        warning: false,
      },
    }
  }

  componentWillMount() {
    ipcRenderer.on('dataReflect', (ev, data) => {
      this.setState({ data });
    });
    ipcRenderer.on('locationReflect', (ev, { current, list }) => {
      this.setState({ current, list });
    });
  }

  updateCurrent(current) {
    ipcRenderer.send('updateLocation', current);
    ipcRenderer.send('refresh');
    this.setState({ current });
  }

  getCurrentPreciseLocation() {
    if (!("geolocation" in navigator)) {
      return Promise.reject('geolocation not supported');
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve([position.coords.latitude, position.coords.longitude]),
        (err) => reject('ERROR(' + err.code + '): ' + err.message),
        options,
      );
    });
  }

  async getMeridianSearchURL(destination) {
    try {
      const current = await this.getCurrentPreciseLocation();
      return `https://www.google.co.jp/maps/dir/${ current.latitude },${ current.longitude }/${encodeURIComponent(destination)}/`;
    } catch(err) {
      throw err;
    }
  }

  render() {
    return (
      <div>
        <Header current={this.state.current} />
        <Main {...this.state} changeLocation={this.updateCurrent} getMeridianSearchURL={this.getMeridianSearchURL} />
      </div>
    );
  }
}

export default App;
