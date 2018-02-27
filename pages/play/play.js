var audio = require('../../common/audio.js')
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