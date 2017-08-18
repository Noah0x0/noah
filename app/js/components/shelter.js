'use strict';

import React from 'react';
import { shell } from 'electron';
import QRCode from './qrcode';

const openLink = (mapSrc) => {
    shell.openExternal(mapSrc);
};

const Shelter = (props) => {
  return (
    <div className="noah-shelter">
      <QRCode qrSrc={props.data.qrSrc} />
      <div className="noah-shelter-link">
        <h2>Near Shelter</h2>
        <a onClick={() => openLink(props.data.mapSrc)}>{props.data.mapSrc}</a>
      </div>
    </div>
  );
};

export default Shelter;
