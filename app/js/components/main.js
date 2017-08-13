'use strict';

import React from 'react';
import Location from './location';
import Data from './data';

const Main = (props) => {
  return (
    <main className="noah-main">
      <Location
        current={props.current}
        list={props.list}
        changeLocation={props.changeLocation}
      />
      <div className="noah-rainimage">
        <i className="fa fa-umbrella" aria-hidden="true"></i>
      </div>
      <Data data={props.data} />
    </main>
  );
};

export default Main;
