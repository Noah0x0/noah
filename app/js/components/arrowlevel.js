'use strict';

import React from 'react';

const ArrowLevel = (props) => {
  return (
    <p className={`noah-arrow-level noah-arrow-level-${props.level ? props.level : 0}`}>
      <i className="fa fa-arrow-down" aria-hidden="true"></i>
    </p>
  );
};

export default ArrowLevel;
