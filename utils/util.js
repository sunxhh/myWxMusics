const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const arrayUnit = {
  toArray: function (list) {
    return [].slice.call(list);
  }
}

const copy = function () {
  let arg = arrayUnit.toArray(arguments || []);
  arg.unshift({});
  return Object.assign.apply(null, arg);
}

module.exports = {
  formatTime: formatTime,
  copy: copy
}
