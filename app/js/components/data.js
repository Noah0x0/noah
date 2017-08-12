'use strict';

import React from 'react';
import ArrowLevel from './arrowlevel';

const Data = (props) => {
  return (
    <div className="noah-data">
      <div className="noah-data-precipitation">
        <h2>Precipitation</h2>
        <p><span>{props.data.precipitation}</span>mm / 1h</p>
      </div>
      <div className="noah-data-trendency">
        <h2>Trendency</h2>
        <div className="noah-data-trendency-inner">
          <div>
            <h3>Precipitation</h3>
            <ArrowLevel level={props.data.trendencyPr} />
          </div>
          <div>
            <h3>Water Level</h3>
            <ArrowLevel level={props.data.trendencyWl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
