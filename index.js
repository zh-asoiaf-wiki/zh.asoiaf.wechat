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

var consts = require('./consts.js');

// app.use(express.query());
app.use('', wechat(wcConf, function(req, res, next) {
  var msg = req.weixin;
  console.log(msg);
  if (msg.MsgType == 'text') {
    if (msg.Content == consts.HELP) {
      res.reply(consts.HELP_TEXT);
    } else {
      wikia.info(msg.Content, function(info) {
        if (info) {
          res.reply([
          {
            title: msg.Content, 
            description: info['abstract'], 
            url: info.url, 
            picurl: ((info.picurl) ? info.picurl : consts.WIKIA_LOGO)
          }
          ]);
        } else {
          res.reply(consts.MSG_NOTFOUND);
        }
      });
    }
  } else if (msg.MsgType == 'event') {
      if (msg.Event == 'subscribe') {
      res.reply('感谢订阅冰与火之歌中文维基。本账号如同一部随身携带的词典，帮助您轻松查阅冰火世界的名词释义。丹妮、御林铁卫、瓦雷利亚钢，键入任何感兴趣的名词、领略冰火世界的奇幻风光。\n如有疑问，回复1查看帮助~');
    } else if (msg.Event == 'unsubscribe') {
      // TODO
    }
  }
}));

var server = app.listen(80, function() {
  console.log('Server start...');
});
