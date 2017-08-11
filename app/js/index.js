'use strict';

const { ipcRenderer, remote } = require('electron');
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

ipcRenderer.on('dataReflect', (ev, data) => {
    const testDiv = document.getElementById('test');
    testDiv.innerHTML = data;
});

const iconCog = document.querySelector('.fa-cog');
iconCog.addEventListener('click', () => {
    const menu = new Menu();
    menu.append(new MenuItem({
        label: 'About noah',
        type: 'normal',
        role: 'about'
    }));
    menu.append(new MenuItem({
        label: 'Quit noah',
        type: 'normal',
        accelerator: 'CmdOrCtrl+Q',
        role: 'quit'
    }));
    menu.popup();
});