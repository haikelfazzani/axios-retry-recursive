window.ipcRenderer = require('electron').ipcRenderer;

window.fsPromises = require('fs').promises;
window.path = require('path');
window.ytdlCore = require('ytdl-core');

window.shell = require('electron').shell;

window.dirName = __dirname;