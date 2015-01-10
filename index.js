var wechat = require('wechat');
var express = require('express');
var app = express();
var wcConf = {
  token: process.env.WC_TOKEN, 
  appid: process.env.WC_APPID, 
  encodingAESKey: process.env.WC_KEY
};

var utility = require('zh.asoiaf.utility');
/*
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
*/
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
  } else if (msg.MsgType == 'event') {
    if (msg.Event == 'subscribe') {
      res.reply('感谢订阅冰与火之歌中文维基。本账号如同一部随身携带的词典，帮助您轻松查阅冰火世界的名词释义。丹妮、史塔克、君临，键入任何感兴趣的名词、领略冰火世界的奇幻风光。');
    } else if (msg.Event == 'unsubscribe') {
      // TODO
    }
  }
}));

var server = app.listen(80, function() {
  console.log('Server start...');
});
