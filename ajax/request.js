let unit = require("../utils/util.js");
const defaultData = {
  data: {},
  header: {
    'content-type': 'application/json' // 默认值
  },
  method: "get"
};

let sendRequest = function (sendData) {
  sendData = unit.copy(defaultData, sendData);
  return new Promise(function (reslove, reject) {
    sendData.success = function (res) {
      reslove(res);
    }
    sendData.fail = function (res) {
      reject(res);
    }
    wx.request(sendData);
  })
}

module.exports = {
  sendRequest
}
