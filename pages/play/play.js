var audio = require('../../common/audio.js');
audio.timeUpdate = function(res) {
    let currentTime = audio.innerAudioContext.currentTime;
    let duration = innerAudioContext.duration;
    canvasObj.setProcess(currentTime / duration);
};

var canvasObj = {
    processData: {
        percent: 0
    },
    canvasRect: {},
    canvasContext: null,
    config: {
        strokeWidth: 4,
        activeColor: "red",
        backgroundColor: "gray",
        margin: 8,
        btn: {
            radius: 7,
            bgColor: "#ffffff",
            pointColor: "red",
            pointRadius: 2
        }
    },
    setProcessByPos: function(pos) {
        let config = this.config;
        let canvasRect = this.canvasRect;
        let x = pos.x;
        let processData = this.processData;
        let prowidth = x - config.margin;
        let width = canvasRect.width - 2 * config.margin;
        let pecent = prowidth / width;
        if (pecent < 0) {
            pecent = 0;
        }
        if (pecent > 1) {
            pecent = 1;
        }
        audio.seekByPecent(pecent);
        this.setProcess();
    },
    setProcess: function(pecent) {
        this.processData.percent = pecent;
        this.draw();
    },
    getCanvasRect: function() {
        var canvasView = wx.createSelectorQuery().select('#audioBarCanvas');
        this.canvasContext = wx.createCanvasContext('audio_bar_canvas');
        canvasView.boundingClientRect((rect) => {
            this.canvasRect = rect;
            rect.width = Math.floor(rect.width);
            rect.height = Math.floor(rect.height);
            this.draw();
        }).exec();
    },
    draw: function() {
        var ctx = this.canvasContext;
        this.drawBgBar();
        this.drawActiveBar();
        this.drawBtn();
        ctx.draw()
    },
    drawBgBar: function() {
        var ctx = this.canvasContext;
        var canvasRect = this.canvasRect;
        var config = this.config;
        var startY = (canvasRect.height - config.strokeWidth) / 2;
        ctx.beginPath();
        ctx.setFillStyle(config.backgroundColor);
        var point = {
            x0: 0 + config.margin,
            y0: startY,
            width: canvasRect.width - 2 * config.margin,
            height: config.strokeWidth
        }
        ctx.fillRect(point.x0, point.y0, point.width, point.height);
    },
    drawActiveBar: function() {
        var ctx = this.canvasContext;
        var canvasRect = this.canvasRect;
        var config = this.config;
        var startY = (canvasRect.height - config.strokeWidth) / 2;
        ctx.beginPath();
        ctx.setFillStyle(config.activeColor);
        var point = {
            x0: 0 + config.margin,
            y0: startY,
            width: canvasRect.width - 2 * config.margin,
            height: config.strokeWidth
        };
        point.width = point.width * this.processData.percent;
        ctx.fillRect(point.x0, point.y0, point.width, point.height);
    },
    drawBtn: function() {
        var ctx = this.canvasContext;
        var canvasRect = this.canvasRect;
        var config = this.config;
        var x = canvasRect.width - 2 * config.margin;
        var point = {
            x: config.margin,
            y: canvasRect.height / 2
        };
        point.x = point.x + x * this.processData.percent;

        ctx.beginPath();
        ctx.arc(point.x, point.y, config.btn.radius, 0, 2 * Math.PI);
        ctx.setFillStyle(config.btn.bgColor);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, config.btn.pointRadius, 0, 2 * Math.PI);
        ctx.setFillStyle(config.btn.pointColor);
        ctx.fill();
    },
    init: function() {
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
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        audio.musicList = ['/music/dylanf.mp3'];
        canvasObj.init();
    },
    playAudio: function(e) {
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
    },
    setProgressEnd: function(e) {

    },
    setProgressStart: function(e) {
        let pos = {
            x: e.touches[0].x,
            y: e.touches[0].y
        };
        canvasObj.setProcessByPos(pos);
    },
    setProgressMove: function(e) {
        let pos = {
            x: e.touches[0].x,
            y: e.touches[0].y
        };
        canvasObj.setProcessByPos(pos);
    },
});
