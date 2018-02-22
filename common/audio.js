var audio = {
  innerAudioContext: wx.createInnerAudioContext(),
  init: function () {
    this.bind();
  },
  bind: function () {
    var innerAudioContext = this.innerAudioContext;

    innerAudioContext.onPlay(() => {
      console.log('开始播放');
      this.start && this.start();
    });

    innerAudioContext.onError((res) => {
      console.log(res.errCode);
      this.error && this.error(res);
    });

    innerAudioContext.onTimeUpdate((res) => {
      this.timeUpdate && this.timeUpdate(res);
    });

    innerAudioContext.onWaiting((res) => {
      this.waiting && this.waiting(res);
    });

    innerAudioContext.onEnded((res) => {
      this.ended && this.ended(res);
    });
  },
  setSrc: function (src) {
    innerAudioContext.src = src;
  },
  musicList: [],
  play: function () {
    if (!this.innerAudioContext.src) {
      this.innerAudioContext.src = this.musicList[0];
    }
    this.innerAudioContext.play();
  },
  pause: function () {
    this.innerAudioContext.pause();
  },
  stop: function () {
    this.innerAudioContext.stop();
  },
  seek: function (n) {
    this.innerAudioContext.seek(n);
  }
}
audio.init();
module.exports = audio;