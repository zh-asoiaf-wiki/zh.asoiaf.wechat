var util = require('node-huiji').Util;
module.exports = [
  /* direct redirection */
  {
    key: {
      '斯塔克': '史塔克',
      '奶德': '艾德·史塔克',
      '猫姨': '凯特琳·徒利',
      '萝卜': '罗柏·史塔克',
      '小妹': '艾莉亚·史塔克',
      '二丫': '艾莉亚·史塔克',
      '艾丽娅': '艾莉亚·史塔克',
      '三傻': '珊莎·史塔克',
      '萌神': '布兰·史塔克',
      '核桃大帝': '瑞肯·史塔克',
      '囧': '琼恩·雪诺',
      '冏雪': '琼恩·雪诺',
      '囧恩': '琼恩·雪诺',
      '斯诺': '琼恩·雪诺',
      '小护士': 'TV:泰丽莎·梅葛亚',
      '贾坤': '贾昆·赫加尔',
      '火吻': '耶哥蕊特',
      '野鸽': '耶哥蕊特',
      '斯坦尼斯': '史坦尼斯·拜拉席恩',
      '二鹿': '史坦尼斯·拜拉席恩',
      '三鹿': '蓝礼·拜拉席恩',
      '大帝': '乔佛里·拜拉席恩',
      '乔大帝': '乔佛里·拜拉席恩',
      '梅姨': '梅丽珊卓',
      '美丽山猪': '梅丽珊卓',
      '色后': '瑟曦·拜拉席恩',
      '塔格利安': '坦格利安',
      '蛋蛋': '伊耿·坦格利安五世',
      '龙妈': '丹妮莉丝·坦格利安',
      '龙母': '丹妮莉丝·坦格利安',
      '豌豆射手': '丹妮莉丝·坦格利安',
      '老巴': '巴利斯坦·赛尔弥',
      '八卦': '巴利斯坦·赛尔弥',
      '八卦斯坦': '巴利斯坦·赛尔弥',
      '巴勒斯坦': '巴利斯坦·赛尔弥',
      '巴基斯坦': '巴利斯坦·赛尔弥',
      '小文书': '弥桑黛',
      '翻译': '弥桑黛',
      '小翻译': '弥桑黛',
      '女翻译': '弥桑黛',
      '权利的游戏': '权力的游戏'
    },
    value: undefined
  },
  /* hack for [[琼恩·雪诺/生死之谜]] */
  {
    key: util.hackFunc({
      'all': ['死'],
      'one': ['琼恩', '囧', '囧恩', '穷恩', '雪诺', '斯诺', '囧雪']
    }, {
      'all': [],
      'one': ['艾林', '艾琳', '拉姆斯', '小剥皮']
    }),
    value: '琼恩·雪诺/生死之谜'
  }
];
