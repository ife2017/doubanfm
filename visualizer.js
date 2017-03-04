/**
 * 音频可视化模块
 */
class Visualizer {
  constructor(selector, audio) {
    this.$canvas = document.querySelector(selector)
    this.$canvas.width = document.body.clientWidth
    this.$canvas.height = 256
    this.canvasContext = this.$canvas.getContext('2d')

    audio.crossOrigin = 'anonymous'
    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser()
    this.audioSrouce = this.audioContext.createMediaElementSource(audio)
    this.audioSrouce.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
    this.draw()
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this))
    this.analyser.getByteFrequencyData(this.frequencyData)
    const length = this.analyser.fftSize / 3 // 只取低频数据
    const width = this.$canvas.width / length - 0.5
    this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height)
    for (let i = 0; i < length; i += 1) {
      this.canvasContext.fillStyle = 'rgba(47, 152, 66, 0.2)'
      this.canvasContext.fillRect(i * (width + 0.5), this.$canvas.height - this.frequencyData[i], width, this.frequencyData[i])
    }
  }
}
