var audio = {
  innerAudioContext: wx.createInnerAudioContext(),
  init: function () {
    this.bind();
  },
  bind: function () {
    let innerAudioContext = this.innerAudioContext;

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    });

    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    });
  },
  setSrc: function (src) {
    innerAudioContext.src = src;
  }

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"/img/bg.png"
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
    audio.init();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})