'use strict';

const { ipcRenderer } = require('electron');
const { getMenu } = require('./js/menu');

const iconCog = document.querySelector('.fa-cog');
const iconRefresh = document.querySelector('.fa-refresh');

ipcRenderer.on('dataReflect', (ev, data) => {
    const precipitation = document.querySelector('.data-precipitation');
    precipitation.innerHTML = data;
});

iconCog.addEventListener('click', () => {
    const menu = getMenu();
    menu.popup();
});

iconRefresh.addEventListener('click', () => {
    ipcRenderer.send('refresh');
});
