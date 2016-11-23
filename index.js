(function() {
  var gag = {};

  gag.find = require('./lib/find');
  gag.getItem = require('./lib/getitem');
  gag.section = require('./lib/section');
  gag.comments = require('./lib/comments');
  gag.user = require('./lib/user');
  module.exports = gag;
}());