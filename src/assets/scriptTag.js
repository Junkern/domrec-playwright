((window) => {
  window.rec = {}
  let recording = false
  let data
  document.addEventListener('DOMContentLoaded', (e) => {
    startRecording()
  })
  function startRecording() {
    recording = true
    rec = new DOMRecorder(document.body)
  }

  function stopRecording() {
    data = rec.stop()
    recording = false
    window.sendData(data)
  }

  window.addEventListener('beforeunload', (event) => {
    if (recording) {
      stopRecording()
    }
  })
})(window)