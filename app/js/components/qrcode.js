'use strict';

import React from 'react';

const QRCode = (props) => {
  return (
    <div className="noah-qrcode">
      <p>{props.qrSrc}</p>
      <img src={props.qrSrc} alt="QRコード" />
    </div>
  );
};

export default QRCode;
