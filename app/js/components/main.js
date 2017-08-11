'use strict';

import React, { Component } from 'react';

const Main = (props) => {
  return (
    <main className="noah-main">
      <div className="noah-select">
        <p>Japan, Ishikawa, Asano river</p>
      </div>
      <div className="noah-rainimage">
        <i className="fa fa-umbrella" aria-hidden="true"></i>
      </div>
      <div className="noah-data">
        <h2>Precipitation</h2>
        <p>{props.data.precipitation} mm</p>
        <h2>Trendency</h2>
        <p>0.7 / 0.5 m</p>
      </div>
    </main>
  );
};

export default Main;
