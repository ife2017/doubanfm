/**
 * 音频可视化模块
 * 可以考虑用 canvas 实现
 */
class Visualizer {
  constructor(selector, audio) {
    audio.crossOrigin = 'anonymous'
    this.$root = document.querySelector(selector)
    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 512
    this.audioSrouce = this.audioContext.createMediaElementSource(audio)
    this.audioSrouce.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)
    this.data = new Uint8Array(this.analyser.frequencyBinCount)
    // 只用前 1/4 数据，也就是低频数据
    this.bars = this.analyser.fftSize / 4
    this.$bars = []
    this.initBars()
    this.update()
  }

  initBars() {
    const barWidth = this.$root.clientWidth / this.bars - 1
    for (let i = 0; i < this.bars; i += 1) {
      const $bar = document.createElement('div')
      $bar.className = 'frequency-bar'
      $bar.style.width = barWidth + 'px'
      $bar.style.left = (barWidth + 1) * i + 'px'
      this.$bars.push($bar)
      this.$root.appendChild($bar)
    }
  }

  update() {
    requestAnimationFrame(this.update.bind(this))
    this.analyser.getByteFrequencyData(this.data)
    for (let i = 0; i < this.bars; i += 1) {
      this.$bars[i].style.height = this.data[i] + 'px'
    }
  }
}
