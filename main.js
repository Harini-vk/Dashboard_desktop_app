const { app, BrowserWindow } = require('electron');
const path = require('path');
const net = require('net');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    }
  });


  // Check when React dev server is ready
  const port = 3000;
  const retryInterval = 300;

  const checkServer = () => {
    const socket = new net.Socket();
    socket
      .setTimeout(1000)
      .on('connect', () => {
        socket.destroy();
        win.loadURL(`http://localhost:${port}`);
      })
      .on('error', () => {
        setTimeout(checkServer, retryInterval);
      })
      .on('timeout', () => {
        setTimeout(checkServer, retryInterval);
      })
      .connect(port, 'localhost');
  };

  checkServer();
}

app.whenReady().then(createWindow);
