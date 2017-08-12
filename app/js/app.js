'use strict';

import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import Header from './components/header';
import Main from './components/main';

class App extends Component {
  constructor() {
    super();
    this.updateCurrent = this.updateCurrent.bind(this);
    this.state = {
      current: 0,
      location: ['---'],
      data: {
        precipitation: 0,
        trendencyPr: 0,
        trendencyWl: 0,
      },
    }
  }

  componentWillMount() {
    ipcRenderer.on('dataReflect', (ev, data) => {
      this.setState({ data });
    });
    ipcRenderer.on('locationReflect', (ev, location) => {
      this.setState({ location });
    });
  }

  updateCurrent(current) {
    ipcRenderer.send('refresh', current);
    this.setState({ current });
  }

  render() {
    return (
      <div>
        <Header current={this.state.current} />
        <Main {...this.state} changeLocation={this.updateCurrent} />
      </div>
    );
  }
}

export default App;
