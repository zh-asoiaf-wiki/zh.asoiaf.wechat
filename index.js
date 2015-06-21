var WeChat = require('node-huiji').WeChat;
var config = require('./config.js');
var wechat = new WeChat(config);

wechat.start();
