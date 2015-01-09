var wechat = require('wechat');
var express = require('express');
var app = express();
var TOKEN = 'fireandblood';

app.use(express.query());
app.use('/', wechat(TOKEN, function(req, res, next) {
  var msg = req.weixin;
  console.log(msg);
  res.reply('Building...');
}));

var server = app.listen(80, function() {
  console.log('Server start...');
});
