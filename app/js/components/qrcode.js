'use strict';

import React from 'react';

const QRCode = (props) => {
  const { getMeridianSearchURL } = props;
  return (
    <div className="noah-qrcode">
      <p> {getMeridianSearchURL('新神田小学校')} </p>
    </div>
  );
};

export default QRCode;
