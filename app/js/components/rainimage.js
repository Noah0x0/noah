'use strict';

import React from 'react';

const getWarning = () => {
  return <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>;
};

const RainImage = (props) => {
  return (
    <div className="noah-rainimage">
      <span>
        <i className="fa fa-umbrella" aria-hidden="true"></i>
        {props.data.warning ? getWarning() : null}
      </span>
    </div>
  );
};

export default RainImage;
