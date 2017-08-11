'use strict';

import React from 'react';
import { render } from 'react-dom';
import App from './js/app';

document.addEventListener('DOMContentLoaded', () => {
  render(<App />,
    document.querySelector('#app'),
  );
});
