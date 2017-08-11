'use strict';

import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import Header from './components/header';
import Main from './components/main';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        precipitation: 0
      },
      location: {
        list: []
      }
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

  render() {
    return (
      <div>
        <Header />
        <Main {...this.state} />
      </div>
    );
  }
}

export default App;
