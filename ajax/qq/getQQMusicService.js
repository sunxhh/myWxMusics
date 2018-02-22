let sendRequest = require('../request.js').sendRequest;

exports.getHotKey = function () {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1518533434277';
  return sendRequest({
    url
  }).then((res) => {
    console.log(res)
  }).catch((res) => {
    console.log(res)
  });
}