var _ = require('lodash');
var Q = require('q');
var consts = require('./consts.js');
module.exports = [
  /* keyword K_HELP */
  {
    key: consts.K_HELP, 
    func: function(msg) {
      return [{
        title: '使用帮助',
        description: '您可以输入的范围包括但不限于：人物、家族、地理、事件、历史、文化习俗、理论推测、章节梗概、游戏、剧集、书籍等。\n\n本平台是由冰与火之歌中文维基（http://asoiaf.huiji.wiki）运维并提供数据的。若您认为某个词条不准确，可以登录维基网站修改相应词条，任何人都有编辑权限。', 
        url: 'http://mp.weixin.qq.com/s?__biz=MzA5OTI0NjM5Nw==&mid=202527811&idx=1&sn=1d999d7ef722033a3a6d192a7577b084#rd', 
        picurl: 'https://mmbiz.qlogo.cn/mmbiz/EJZuSeQ4xPV3IlhaibISeEADZWOcl3PhWLQ56KxckObpfzVolRRUOPbcMfAFO5tquXTEbhadV67a8I1eibia3FBVg/0'
      }];
    }
  },
  /* keyword K_SONG */
  {
    key: consts.K_SONG,
    func: function(msg) {
      var wechat = this;
      var START_DATE = new Date('2015-07-16');
      var TITLE_PREFIX = '每日一判词/';
      var date = new Date();
      var isToday = true;

      /*
       * Use UTC time instead of local time.
       * Since the server is set in UTC+08, it is perfectly appropriate here.
       * When a user tries to get song before 08:00, he will get the song of 
       * yesterday; After 08:00, the server will return the song of today if 
       * it exists.
       */
      function str(date) {
        return [
          date.getUTCFullYear(),
          _.padLeft(date.getUTCMonth() + 1, 2, '0'),
          _.padLeft(date.getUTCDate(), 2, '0')
        ].join('-');
      }

      function get(callback) {
        var title = TITLE_PREFIX + str(date);
        wechat._details([title], function(err, data) {
          if (err) {
            callback(err);
          } else if (data.length == 0) {
            date.setDate(date.getDate() - 1);
            if (date > START_DATE) {
              get(callback);
            } else {
              // TODO
            }
          } else {
            var ret = wechat.filter([wechat._single(data[0])]);
            wechat._cache_set(consts.K_SONG, ret, 1000 * 60 * 60);
            callback(null, wechat.filter([wechat._single(data[0])]));
          }
        });
      }

      /*
       * Return node-style function as a keyword handler
       * keyword() in node-huiji/wechat.js will handle promise related stuff
       */
      return get;
    }
  },
  /* forbid unhackable emotion to go through */
  {
    key: /^\//,
    func: function(msg) {
      return consts.MSG_EMOTION_FORBIDDEN;
    }
  }
];
