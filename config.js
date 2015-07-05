var consts = require('./consts.js');

module.exports = {
  name: 'asoiaf',
  port: 10000,
  wechat: {
    'token': process.env.WECHAT_ASOIAF_TOKEN,
    'appid': process.env.WECHAT_ASOIAF_APPID,
    'encodingAESKey': process.env.WECHAT_ASOIAF_AESKEY
  },
  CONST: {
    MSG_ERR: consts.MSG_ERR,
    MSG_NORESULT: consts.MSG_NORESULT,
    MSG_SUBSCRIBE: consts.MSG_SUBSCRIBE,
    SEARCH_LIMIT: 7
  }
};
