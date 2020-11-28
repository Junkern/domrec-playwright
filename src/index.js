const fs = require('fs')
const path = require('path')

class PlaywrightRecorder {
  constructor(page) {
    this.page = page
    this.recordings = []
  }

  async init() {
    await this.page.exposeFunction('sendData', (data)=> {
      this.recordings.push(data)
    })
    await this.page.addInitScript(this.loadDOMRecordingScript());
    await this.page.addInitScript(this.loadControllerScript());
  }
  loadDOMRecordingScript() {
    const filePath = path.join(__dirname, '..', 'node_modules', 'domrec-core', 'dist', 'recording.js')
    return fs.readFileSync(filePath, 'utf-8')
  }
  loadControllerScript() {
    const filePath = path.join(__dirname, 'assets', 'scriptTag.js')
    return fs.readFileSync(filePath, 'utf-8')
  }

  async stopRecording() {
    await this.page.evaluate(async () => {
      const data = window.rec.stop()
      window.sendData(data)
    });
  }
}


module.exports = {PlaywrightRecorder}