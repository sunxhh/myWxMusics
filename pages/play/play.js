var audio = require('../../common/audio.js');

var canvasObj = {
  processData: {
    percent: 40,
    strokeWidth: 4,
    activeColor: "red",
    backgroundColor: "gray"
  },
  canvasRect: {},
  canvasContext: null,
  config: {
    strokeWidth: 4,
    activeColor: "red",
    backgroundColor: "gray"
  },
  getCanvasRect: function () {
    var canvasView = wx.createSelectorQuery().select('#audioBarCanvas');
    this.canvasContext = wx.createCanvasContext('audio_bar_canvas');
    canvasView.boundingClientRect((rect) => {
      this.canvasRect = rect;
      rect.width = Math.floor(rect.width);
      rect.height = Math.floor(rect.height);
      console.log(rect)
      this.draw();
    }).exec();
  },
  draw: function () {
    this.drawBgBar();
    this.drawActiveBar();
  },
  drawBgBar: function () {
    var ctx = this.canvasContext;
    var canvasRect = this.canvasRect;
    var config = this.config;
    var startY = (canvasRect.height - config.strokeWidth) / 2;
    ctx.setFillStyle(config.backgroundColor);
    var point = {
      x0: 0,
      y0: startY
    }
    console.log(point)
    ctx.fillRect(point.x0, point.y0, canvasRect.width, config.strokeWidth);
    ctx.draw()
  },
  drawActiveBar: function () {
    var ctx = this.canvasContext;
    var canvasRect = this.canvasRect;
    var config = this.config;
    var startY = (canvasRect.height - config.strokeWidth) / 2;
    ctx.setFillStyle(config.activeColor);
    var point = {
      x0: 0,
      y0: startY
    }
    console.log(point)
    ctx.fillRect(point.x0, point.y0, canvasRect.width*0.4, config.strokeWidth);
    ctx.draw()
  },
  init: function () {
    this.getCanvasRect();
  }
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "/img/bg.png",
    audioData: {
      playing: false,
      currentTime: 20,
      totalTime: 60
    },
    processData: {
      percent: 40,
      strokeWidth: 4,
      activeColor: "red",
      backgroundColor: "gray"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    audio.musicList = ['/music/dylanf.mp3'];
    canvasObj.init();
  },
  playAudio: function (e) {
    let audioData = this.data.audioData;
    if (audioData.playing) {
      this.setData({
        "audioData.playing": false
      })
      audio.pause();
    } else {
      this.setData({
        "audioData.playing": true
      })
      audio.play();
    }
    console.log(audioData.playing)
  }
})