'use strict';

import React from 'react';

const QRCode = (props) => {
  const { getMeridianSearchURL } = props;
  const qrcode = `http://chart.apis.google.com/chart?chs=150x150&cht=qr&chl=${ getMeridianSearchURL('新神田小学校') }`;
  return (
    <div className="noah-qrcode">
      <img src={qrcode} alt="QRコード" />
    </div>
  );
};

export default QRCode;
