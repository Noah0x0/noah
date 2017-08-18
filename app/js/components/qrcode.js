'use strict';

import React from 'react';

const getImg = (qrSrc) => {
  if (qrSrc === '') {
    return <p>QRコードが表示できません</p>;
  }
  return <img src={qrSrc} alt="QRコード" />;
}

const QRCode = (props) => {
  return (
    <div className="noah-qrcode">
      {getImg(props.qrSrc)}
    </div>
  );
};

export default QRCode;
