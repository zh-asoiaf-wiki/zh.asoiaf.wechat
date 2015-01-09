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

app.use(express.query());
app.use('', wechat(wcConf, function(req, res, next) {
  var msg = req.weixin;
  console.log(msg);
  if (msg.MsgType == 'text') {
    wiki.tryBot(function() {
      wiki.client.getArticle(msg.Content, function(content) {
        if (content) {
          res.reply([
            {
              title: msg.Content, 
              description: '详见冰火中文维基', 
              picurl: 'http://img2.wikia.nocookie.net/__cb66/asoiaf/zh/images/8/89/Wiki-wordmark.png', 
              url: 'http://zh.asoiaf.wikia.com/wiki/' + msg.Content
            }
          ]);
        } else {
          res.reply('No pages matched, please try again...');
        }
        console.log('Respond finished...');
      });
    });
  } else {
    res.reply('Currently not supported, sorry...');
  /*
  res.reply([
    {
      title: 'Have a look...', 
      description: 'test', 
      picurl: 'http://img2.wikia.nocookie.net/__cb66/asoiaf/zh/images/8/89/Wiki-wordmark.png', 
      url: 'http://zh.asoiaf.wikia.com'
    }
  ]);
  */
  }
}));

var server = app.listen(80, function() {
  console.log('Server start...');
});
