const moment = require('moment');
const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

const helpers = {
  equals(arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },

  notEquals(arg1, arg2, options) {
    return !(arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },

  dateFormat(date, option) {
    return moment(date).format(option);
  },

  multiply(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a * b;
    }
  },

  minus(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
  },

  sumQuantity(array) {
    s = 0;
    for (i = 0; i < array.length; i++) {
      s += array[i].quantity;
    }
    return s;
  },

  quillDeltaToHtml(delta) {
    var deltaOps = JSON.parse(delta).ops;
    var cfg = {};
    var converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
    var html = converter.convert();
    return html;
  },

  dateHasPassed(date) {
    const today = new Date();
    var parsedDate = Date.parse(date);
    return today >= parsedDate;
  },

  convert(num) {
    if (num == 0) {
      return 0;
    } else {
      return (num = (num / 5) * 100);
    }
  },

  percentage(a, b) {
    if (a == 0 || b == 0) {
      return 0;
    } else {
      return Math.floor((a / b) * 100);
    }
  },

  censor(a) {
    const length = a.length;
    var censored = '';
    for (var i = 0; i < 3; i++) {
      censored += '*'.repeat(4);
      censored += ' ';
    }
    censored += a.substring(length - 4, length);
    return censored;
  },
  times(n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
  },
};

module.exports = { helpers };
