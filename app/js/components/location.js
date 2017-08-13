'use strict';

import React from 'react';

const getDisplayString = ({country, prefecture, river}) => {
  return `${country}, ${prefecture}, ${river}`;
};

const getOption = (list) => {
  return list.map((item, index) => {
    return (
      <option key={`${index}`} value={getDisplayString(item)}>
        {getDisplayString(item)}
      </option>
    );
  });
};

const handleChange = (e, changeLocation) => {
  const valueArray = e.target.value.split(', ');
  changeLocation({
    country: valueArray[0],
    prefecture: valueArray[1],
    river: valueArray[2],
  });
};

const Location = (props) => {
  const { current, list, changeLocation } = props;
  return (
    <div className="noah-select">
      <select value={getDisplayString(current)} onChange={(e) => handleChange(e, changeLocation)}>
        {getOption(list)}
      </select>
      <i className="fa fa-caret-down" aria-hidden="true"></i>
    </div>
  );
};

export default Location;
