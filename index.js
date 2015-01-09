var wechat = require('wechat');
var express = require('express');
var app = express();
var wcConf = {
  token: process.env.WC_TOKEN, 
  appid: process.env.WC_APPID, 
  encodingAESKey: process.env.WC_KEY
};

var utility = require('zh.asoiaf.utility');
var wiki = new utility.Wiki({
  config: {
    "server": "zh.asoiaf.wikia.com", 
    "path": "", 
    "username": process.env.BOT_USERNAME, 
    "password": process.env.BOT_PASSWORD, 
    "userAgent": "zh.asoiaf.wechat", 
    "debug": true
  }
});
var wikia = new utility.Wikia();

var WIKIA_LOGO = 'http://img2.wikia.nocookie.net/__cb66/asoiaf/zh/images/8/89/Wiki-wordmark.png';

// app.use(express.query());
app.use('', wechat(wcConf, function(req, res, next) {
  var msg = req.weixin;
  console.log(msg);
  if (msg.MsgType == 'text') {
    wikia.info(msg.Content, function(info) {
      if (info) {
        res.reply([
        {
          title: msg.Content, 
          description: info['abstract'], 
          url: info.url, 
          picurl: ((info.picurl) ? info.picurl : WIKIA_LOGO)
        }
        ]);
      } else {
        res.reply('暂未找到相关词条。关键词功能正在开发完善，尽情期待！');
      }
    });
  }
}));

var server = app.listen(80, function() {
  console.log('Server start...');
});
