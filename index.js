var WeChat = require('node-huiji').WeChat;
var config = require('./config.js');
var wechat = new WeChat(config);

var hack = require('./hack.js');
var keyword = require('./keyword.js');
wechat.addHack(hack);
wechat.addKeyword(keyword);

wechat.start();
