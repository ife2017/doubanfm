class DoubanFM {
  constructor() {
    this.$playlist = document.querySelector('.doubanfm-playlist')
    this.$title = document.querySelector('.doubanfm-title')
    this.$artist = document.querySelector('.doubanfm-artist')
    this.$cover = document.querySelector('.doubanfm-cover img')
    this.$coverLink = document.querySelector('.doubanfm-cover')
    this.$volumeSlider = document.querySelector('.doubanfm-volume-slider')
    this.$volume = document.querySelector('.doubanfm-volume-value')
    this.$progress = document.querySelector('.doubanfm-progress-value')
    this.$time = document.querySelector('.doubanfm-time')
    this.$play = document.querySelector('.icon-play')
    this.$pause = document.querySelector('.icon-pause')
    this.$prev = document.querySelector('.icon-prev')
    this.$next = document.querySelector('.icon-next')
    this.audio = new Audio()
    this.visualizer = new Visualizer('.visualizer', this.audio)
    this.playlist = playlist
    this.playlistIndex = 0
    this.init()
  }

  init() {
    this.$volumeSlider.addEventListener('click', this.setVolume.bind(this))
    this.$play.addEventListener('click', this.play.bind(this))
    this.$pause.addEventListener('click', this.pause.bind(this))
    this.$prev.addEventListener('click', this.prev.bind(this))
    this.$next.addEventListener('click', this.next.bind(this))
    this.audio.addEventListener('ended', this.next.bind(this))
    this.audio.addEventListener('timeupdate', this.updateProgress.bind(this))
    this.createPlaylist()
    this.loadAndPlay(0)
  }

  createPlaylist() {
    this.$playlist.innerHTML = playlist.map((item, index) => {
      return `<div class="doubanfm-playlist-item" data-index="${index}">
        ${index + 1}. ${item.title} - ${item.artist}
      </div>`
    }).join('')
    this.$playlist.addEventListener('click', event => {
      if (event.target.dataset.index) {
        this.loadAndPlay(parseInt(event.target.dataset.index))
      }
    })
    this.$playlistItems = document.querySelectorAll('.doubanfm-playlist-item')
  }

  setVolume() {
    const rect = this.$volumeSlider.getBoundingClientRect()
    const volume = (event.x - rect.left) / rect.width
    this.$volume.style.width = volume * 100 + '%'
    this.audio.volume = volume
  }

  updateProgress(value) {
    const time = parseInt(this.song.length - this.audio.currentTime)
    const minute = parseInt(time / 60)
    let second = time % 60
    if (second < 10) {
      second = '0' + second
    }
    this.$time.textContent = `-${minute}:${second}`
    this.$progress.style.width = (this.audio.currentTime / this.song.length * 100) + '%'
  }

  load() {
    this.$title.textContent = this.song.title
    this.$artist.textContent = this.song.artist
    this.$cover.src = this.song.picture
    this.$coverLink.href = 'https://music.douban.com' + this.song.album
    this.audio.src = this.song.url
    document.title = this.song.title
  }

  play() {
    this.audio.play()
    this.$pause.style.display = 'inline-block'
    this.$play.style.display = 'none'
  }

  pause() {
    this.audio.pause()
    this.$play.style.display = 'inline-block'
    this.$pause.style.display = 'none'
  }

  prev() {
    if (this.playlistIndex == 0) {
      this.loadAndPlay(this.playlist.length - 1)
    } else {
      this.loadAndPlay(this.playlistIndex - 1)
    }
  }

  next() {
    if (this.playlistIndex == this.playlist.length - 1) {
      this.loadAndPlay(0)
    } else {
      this.loadAndPlay(this.playlistIndex + 1)
    }
  }

  loadAndPlay(index) {
    this.$playlistItems[this.playlistIndex].classList.remove('active')
    this.playlistIndex = index
    this.$playlistItems[this.playlistIndex].classList.add('active')
    this.song = this.playlist[this.playlistIndex]
    this.load()
    this.play()
  }
}

const app = new DoubanFM()