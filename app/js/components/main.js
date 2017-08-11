'use strict';

import React from 'react';
import Location from './location';

const Main = (props) => {
  return (
    <main className="noah-main">
      <Location
        current={props.current}
        location={props.location}
        changeLocation={props.changeLocation}
      />
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
