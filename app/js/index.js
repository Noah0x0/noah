'use strict';

const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('dataReflect', (ev, data) => {
    const testDiv = document.getElementById('test');
    testDiv.innerHTML = data;
});
