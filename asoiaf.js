var _ = require('lodash');
var WeChat = require('node-huiji').WeChat;

// customize filter
WeChat.prototype._filter = function(results) {
  var reg_filter = /(^用户博客|^TV talk|@comment)/;
  return _.filter(results, function(msg) {
    var qualified = !reg_filter.test(msg.title);    // filter legacy namespaces
    if (qualified) {
      var desc = msg.description;
      var index = desc.indexOf('↑');
      if (index >= 0)
        msg.description = desc.substring(0, index); // filter tailing ref text
    }
    return qualified;
  });
};

var config = require('./config.js');
var wechat = new WeChat(config);

// hack & keyword
var hack = require('./hack.js');
var keyword = require('./keyword.js');
wechat.addHack(hack);
wechat.addKeyword(keyword);

wechat.start();
