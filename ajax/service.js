let qqService = require("./qq/getQQMusicService.js");
// 获取热点
exports.getHotKey = function () {
  return qqService.getHotKey().then((res) => {

  }).catch((res) => {

  });
}