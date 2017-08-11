'use strict';

const { ipcRenderer } = require('electron');
const { getMenu } = require('./js/menu');

ipcRenderer.on('dataReflect', (ev, data) => {
    const testDiv = document.getElementById('test');
    testDiv.innerHTML = data;
});

const iconCog = document.querySelector('.fa-cog');
iconCog.addEventListener('click', () => {
    const menu = getMenu();
    menu.popup();
});