const { Menu, MenuItem } = require("electron");
const ctxMenu = new Menu();

const items = [
  { role: 'reload' },
  { type: 'separator' },
  { role: 'cut' },
  { role: 'copy' },
  { role: 'paste' },
  { type: 'separator' },
  {
    label: 'Inspecter..',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.openDevTools();
    }
  }
];

items.forEach(m => {
  ctxMenu.append(new MenuItem(m))
});

module.exports = ctxMenu;