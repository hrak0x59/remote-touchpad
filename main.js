const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;
let serverProcess = null;
let currentIp = null;

function getLocalIp() {
  // Mac/Linux: ipconfig getifaddr en0 or hostname -I, Windows: ipconfig
  if (process.platform === 'darwin') {
    return new Promise((resolve) => {
      exec('ipconfig getifaddr en0', (err, stdout) => {
        resolve(stdout.trim() || 'localhost');
      });
    });
  } else if (process.platform === 'win32') {
    return new Promise((resolve) => {
      exec('ipconfig', (err, stdout) => {
        const match = stdout.match(/IPv4[\s\S]*?: ([0-9.]+)/);
        resolve((match && match[1]) || 'localhost');
      });
    });
  } else {
    return new Promise((resolve) => {
      exec('hostname -I', (err, stdout) => {
        resolve((stdout.split(' ')[0] || 'localhost').trim());
      });
    });
  }
}

function startServer() {
  if (!serverProcess) {
    serverProcess = require('child_process').fork(path.join(__dirname, 'server.js'));
  }
}

function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
}

function isServerRunning() {
  return !!serverProcess;
}

function sendServerStatus() {
  if (mainWindow) {
    mainWindow.webContents.send('server-status', {
      running: isServerRunning(),
      ipAddr: isServerRunning() ? currentIp : null
    });
  }
}

function createWindow(ip) {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 300,
    resizable: false,
    minimizable: true,
    maximizable: false,
    title: 'Remote Touchpad Server',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, 'public', 'server-ui.html'));
}

app.whenReady().then(async () => {
  currentIp = await getLocalIp();
  createWindow(currentIp);
  // サーバーはデフォルトで起動しない
  // startServer();
});

ipcMain.on('start-server', () => {
  startServer();
  sendServerStatus();
});

ipcMain.on('stop-server', () => {
  stopServer();
  sendServerStatus();
});

ipcMain.on('get-server-status', () => {
  sendServerStatus();
});

app.on('window-all-closed', () => {
  stopServer();
  app.quit();
}); 