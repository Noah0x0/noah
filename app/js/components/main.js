'use strict';

import React from 'react';
import Location from './location';
import RainImage from './rainimage';
import Data from './data';

const Main = (props) => {
  return (
    <main className="noah-main">
      <Location
        current={props.current}
        list={props.list}
        changeLocation={props.changeLocation}
      />
      <RainImage data={props.data} />
      <Data data={props.data} />
    </main>
  );
};

export default Main;
