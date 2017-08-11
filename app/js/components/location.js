'use strict';

import React from 'react';

const getOption = (current, location) => {
  return location.map((label, index) => {
    return (
      <option key={`${index}-${label}`} value={index}>
        {label}
      </option>
    );
  });
};

const Location = (props) => {
  const { current, location, changeLocation } = props;
  return (
    <div className="noah-select">
      <select value={current} onChange={e => changeLocation(e.target.value)}>
        {getOption(current, location)}
      </select>
      <i className="fa fa-caret-down" aria-hidden="true"></i>
    </div>
  );
};

export default Location;
