var wechat = require('wechat');
var express = require('express');
var app = express();
var wcConf = {
  token: process.env.WC_TOKEN, 
  appid: process.env.WC_APPID, 
  encodingAESKey: process.env.WC_KEY
};

var log4js = require('log4js');
log4js.configure({
  appenders: [
  { 
    type: 'file', 
    filename: 'logs/access.log', 
    maxLogSize: 65536, 
    backups: 7, 
    category: 'normal'
  }
  ],
  replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

var utility = require('zh.asoiaf.utility');
var wikia = new utility.Wikia();

var consts = require('./consts.js');
var hack = require('./hack.js');
var adapter = require('./adapter.js');

app.use('', wechat(wcConf, function(req, res, next) {
  var msg = req.weixin;
  logger.info(msg);
  if (msg.MsgType == 'text') {
    msg.Content = hack(msg.Content);
    if (msg.Content == consts.HELP) {
      res.reply([
      {
        title: consts.HELP_TITLE, 
        description: consts.HELP_TEXT, 
        url: consts.HELP_URL, 
        picurl: consts.HELP_PICURL
      }
      ]);
    } else if (msg.Content == consts.MAP) {
      res.reply([
      {
        title: consts.MAP_TITLE, 
        description: consts.MAP_TEXT, 
        url: consts.MAP_URL, 
        picurl: consts.MAP_PICURL
      }]);
    } else {
      wikia.info(msg.Content, function(err, item) {
        if (err) {
          logger.error(err);
          res.reply(consts.MSG_ERROR);
        } else if (item) {
          res.reply(adapter.info(item));
        } else {
          wikia.search(msg.Content, function(err, items) {
            if (err) {
              logger.error(err);
              res.reply(consts.MSG_ERROR);
            } else if (!items || items.length == 0) {
              res.reply(consts.MSG_NOTFOUND);
            } else {
              res.reply(adapter.search(items));
            }
          });
        }
      });
    }
  } else if (msg.MsgType == 'event') {
    if (msg.Event == 'subscribe') {
      res.reply(consts.MSG_SUBSCRIBE);
    } else if (msg.Event == 'unsubscribe') {
      // TODO
    }
  }
}));

var server = app.listen(80, function() {
  console.log('Server start...');
});
