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
      }
    }
  }

  componentWillMount() {
    ipcRenderer.on('dataReflect', (ev, data) => {
      this.setState({
        data: {
          precipitation: data
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Main {...this.state.data} />
      </div>
    );
  }
}

export default App;
