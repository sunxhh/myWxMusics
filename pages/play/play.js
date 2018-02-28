var audio = require('../../common/audio.js');

var canvasObj = {
  processData: {
    percent: 40,
    strokeWidth: 4
  },
  canvasRect: {},
  canvasContext: null,
  config: {
    strokeWidth: 4,
    activeColor: "red",
    backgroundColor: "gray",
    btn: {
      radius: 7,
      bgColor: "#ffffff",
      pointColor: "red",
      pointRadius: 2
    }
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
    var ctx = this.canvasContext;
    this.drawBgBar();
    this.drawActiveBar();
    this.drawBtn();
    ctx.draw()
  },
  drawBgBar: function () {
    var ctx = this.canvasContext;
    var canvasRect = this.canvasRect;
    var config = this.config;
    var startY = (canvasRect.height - config.strokeWidth) / 2;
    ctx.beginPath();
    ctx.setFillStyle(config.backgroundColor);
    var point = {
      x0: 0,
      y0: startY
    }
    console.log(point)
    ctx.fillRect(point.x0, point.y0, canvasRect.width, config.strokeWidth);
  },
  drawActiveBar: function () {
    var ctx = this.canvasContext;
    var canvasRect = this.canvasRect;
    var config = this.config;
    var startY = (canvasRect.height - config.strokeWidth) / 2;
    ctx.beginPath();
    ctx.setFillStyle(config.activeColor);
    var point = {
      x0: 0,
      y0: startY
    }
    console.log(point)
    ctx.fillRect(point.x0, point.y0, canvasRect.width * 0.4, config.strokeWidth);
  },
  drawBtn: function () {
    var ctx = this.canvasContext;
    var canvasRect = this.canvasRect;
    var config = this.config;
    var point = {
      x: 0,
      y: canvasRect.height / 2
    };
    ctx.beginPath();
    ctx.arc(point.x + config.btn.radius, point.y, config.btn.radius, 0, 2 * Math.PI);
    ctx.setFillStyle(config.btn.bgColor);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(point.x + config.btn.radius, point.y, config.btn.pointRadius, 0, 2 * Math.PI);
    ctx.setFillStyle(config.btn.pointColor);
    ctx.fill();

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