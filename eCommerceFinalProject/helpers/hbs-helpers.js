const moment = require('moment');

module.exports = {
  eq: function(a, b) {
    return a === b;
  },
  
  or: function(a, b) {
    return a || b;
  },
  
  formatDate: function(date, format) {
    return moment(date).format(format);
  },
  
  multiply: function(a, b) {
    return (a * b).toFixed(2);
  },
  
  section: function(name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },
  
  capitalizeFirst: function(str) {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
