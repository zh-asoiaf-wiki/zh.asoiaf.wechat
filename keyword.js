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
  }
];
