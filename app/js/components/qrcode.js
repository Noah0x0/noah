'use strict';

import React from 'react';

const QRCode = (props) => {
  return (
    <div className="noah-qrcode">
      <img src={props.data.src} alt="QRコード" />
    </div>
  );
};

export default QRCode;
