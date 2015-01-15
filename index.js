// wechat
var wechat = require('wechat');
var wcConf = {
  token: process.env.WC_TOKEN, 
  appid: process.env.WC_APPID, 
  encodingAESKey: process.env.WC_KEY
};
// express
var express = require('express');
var app = express();
// log4js
var log4js = require('log4js');
log4js.configure({
  appenders: [
  {
    type: 'file', 
    filename: 'logs/error.log', 
    maxLogSize: 16384, 
    backups: 3, 
    category: 'err'
  }, 
  { 
    type: 'file', 
    filename: 'logs/access.log', 
    maxLogSize: 16384, 
    backups: 7, 
    category: 'normal'
  }
  ],
  replaceConsole: false
});
var logger = log4js.getLogger('normal'), 
    elogger = log4js.getLogger('err');
logger.setLevel('INFO');
elogger.setLevel('ERROR');
// lru-cache
var LRU = require('lru-cache');
var cache = LRU({
  max: 500, 
  maxAge: 1000 * 60 * 60
});
// zh.asoiaf.utility
var utility = require('zh.asoiaf.utility');
var wikia = new utility.Wikia();

var consts = require('./consts.js'), 
    hack = require('./hack.js'), 
    adapter = require('./adapter.js');

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
      // find res in cache
      var e = cache.get(msg.Content);
      if (e) {
        logger.info('cache hit: ' + msg.Content);
        res.reply(e);
      } else {
        logger.info('cache miss: ' + msg.Content);
        wikia.info(msg.Content, function(err, item) {
          if (err) {
            logger.error(err.stack);
            res.reply(consts.MSG_ERROR);
          } else if (item) {
            writeCacheAndReply(msg.Content, adapter.info(item), res);
          } else {
            wikia.search(msg.Content, function(err, items) {
              if (err) {
                logger.error(err);
                res.reply(consts.MSG_ERROR);
              } else if (!items || items.length == 0) {
                res.reply(consts.MSG_NOTFOUND);
              } else {
                writeCacheAndReply(msg.Content, adapter.search(items), res);
              }
            });
          }
        });
      }
    }
  } else if (msg.MsgType == 'event') {
    if (msg.Event == 'subscribe') {
      res.reply(consts.MSG_SUBSCRIBE);
    } else if (msg.Event == 'unsubscribe') {
      // TODO
    }
  }
}));
// write <key, value> into cache and reply to wechat server with value
var writeCacheAndReply = function(key, value, res) {
  logger.info('write cache: ' + key);
  cache.set(key, value);
  res.reply(value);
};

var server = app.listen(80, function() {
  logger.info('Server start...');
});
server.on('error', function(err) {
  // TODO: error handler
  elogger.error(err.stack);
});
