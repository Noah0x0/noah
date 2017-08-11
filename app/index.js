'use strict';

const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('dataReflect', (ev, data) => {
    const testDiv = document.getElementById('test');
    const element = document.createElement('span');
    element.innerHTML = data;
    testDiv.appendChild(element);
});
