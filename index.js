const {app, BrowserWindow } = require("electron")
const path = require('path')

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'Test',
        wight:  1920,
        heigt: 1200,
        webPreferences: {
            nodeIntegration : true
        }
});
    mainWindow.loadFile(path.join('Index.html'));
}
app.whenReady().then(() => {
    createMainWindow();

});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  