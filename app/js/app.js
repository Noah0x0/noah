'use strict';

import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import Header from './components/header';
import Main from './components/main';

class App extends Component {
  constructor() {
    super();
    this.updateCurrent = this.updateCurrent.bind(this);
    this.updateGeolocation = this.updateGeolocation.bind(this);
    this.state = {
      current: { country: '---', prefecture: '---', river: '---' },
      list: [{ country: '---', prefecture: '---', river: '---' }],
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      data: {
        precipitation: 0,
        trendencyPr: 0,
        trendencyWl: 0,
        warning: false,
        qrSrc: '',
      }
    }
  }

  componentWillMount() {
    this.updateGeolocation();
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

  async getGeolocation() {
    if (!'geolocation' in navigator) return { latitude: 0, longitude: 0 };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
        (err) => reject(`ERROR(${err.code}): ${err.message}`)
      );
    });
  }

  async updateGeolocation() {
    try {
      const geolocation = await this.getGeolocation();
      ipcRenderer.send('updateGeolocation', geolocation);
      this.setState({ geolocation });
    } catch (err) {
      throw err;
    }
  }

  render() {
    return (
      <div>
        <Header
          current={this.state.current}
          updateGeolocation={this.updateGeolocation}
        />
        <Main {...this.state} changeLocation={this.updateCurrent} />
        {this.state.geolocation.latitude}<br />
        {this.state.geolocation.longitude}
      </div>
    );
  }
}

export default App;
