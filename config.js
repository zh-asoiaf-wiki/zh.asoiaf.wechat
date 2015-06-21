module.exports = {
  name: 'asoiaf',
  port: 80,
  wechat: {
    'token': process.env.WECHAT_ASOIAF_TOKEN,
    'appid': process.env.WECHAT_ASOIAF_APPID,
    'encodingAESKey': process.env.WECHAT_ASOIAF_AESKEY
  }
};
