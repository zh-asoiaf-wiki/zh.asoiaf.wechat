module.exports = {
  name: 'asoiaf',
  port: 80,
  wechat: {
    'token': process.env.WECHAT_ASOIAF_TOKEN,
    'appid': process.env.WECHAT_ASOIAF_APPID,
    'encodingAESKey': process.env.WECHAT_ASOIAF_AESKEY
  },
  CONST: {
    MSG_ERR: '服务器无响应了，怎么回事？北方的白鬼已经蠢蠢欲动，东方的红袍僧竟然能传火续命，南面学城的绵羊告诉我玻璃能够燃烧。现在我想静静，等过了这个长冬，再让我试试，我能否登顶君临。',
    MSG_NORESULT: '啊，你跟我说你找不到我想要的东西，是吗？不错不错，我再问你一次。村里藏有金子吗？银子和珠宝呢？存粮呢？贝里·唐德利恩伯爵在哪儿？他离开后去了哪儿？身边有多少人？其中有多少骑士，多少弓手，多少步兵？有多少，有多少，有多少，有多少，有多少，有多少？村里藏有金子吗？',
    MSG_SUBSCRIBE: '感谢订阅冰与火之歌中文维基。本公众号如同一部随身辞典，帮助您轻松查阅名词释义、领略冰火世界的奇幻风光。北至永冬之地，南抵索斯罗斯；西达日落之海，东及阴影之地。冰火中文维基包罗万象、竭诚为您服务。丹妮、御林铁卫、瓦雷利亚钢，键入任何您感兴趣的名词、体验冰火世界的魅力所在。\n如有疑问，回复1查看帮助~ :）',
    SEARCH_LIMIT: 7
  }
};
