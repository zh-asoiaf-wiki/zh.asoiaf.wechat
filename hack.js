var util = require('node-huiji').Util;
var consts = require('./consts.js');
module.exports = [
  /* hack for K_HELP */
  {
    key: ['帮助', '使用帮助', 'help', 'HELP', 'h', '指南', '使用指南', '怎么用'],
    value: consts.K_HELP
  },
  /* hack for [[琼恩·雪诺/生死之谜]] */
  {
    key: util.hackFunc({
      'all': ['死'],
      'one': ['琼恩', '囧', '囧恩', '穷恩', '穷嗯', '雪诺', '斯诺', '囧雪', 'jon', 'john', 'Jon', 'John']
    }, {
      'all': [],
      'one': ['艾林', '艾琳', '拉姆斯', '小剥皮']
    }),
    value: '琼恩·雪诺/生死之谜'
  },
  {
    key: ['猫姨', '凯瑟琳'],
    value: '凯特琳·徒利'
  },
  {
    key: ['小妹', '二丫', '艾莉亚', '艾丽娅', '艾利娅', '艾利亚', '小狼女', '艾丽雅', '艾利雅'],
    value: '艾莉亚·史塔克'
  },
  {
    key: ['囧', '囧雪', '囧恩', '穷恩', '穷嗯', '斯诺', '雪诺', 'jon', 'john', 'Jon', 'John'],
    value: '琼恩·雪诺'
  },
  {
    key: ['火吻', '野鸽'],
    value: '耶哥蕊特'
  },
  {
    key: ['卢斯', '露丝', '露斯'],
    value: '卢斯·波顿'
  },
  {
    key: ['二鹿', '斯坦尼斯'],
    value: '史坦尼斯·拜拉席恩'
  },
  {
    key: ['梅姨', '红袍女', '美丽山猪', '美丽山竹', '山猪'],
    value: '梅丽珊卓'
  },
  {
    key: ['大帝', '乔大帝', '乔弗里'],
    value: '乔佛里·拜拉席恩'
  },
  {
    key: ['色后', '色系', '瑟熙'],
    value: '瑟曦·拜拉席恩'
  },
  {
    key: ['龙妈', '龙母', '丹妮', '豌豆射手', '丹尼莉丝', '丹妮莉斯', '丹妮丽斯', '丹妮丽丝'],
    value: '丹妮莉丝·坦格利安'
  },
  {
    key: ['老巴', '八卦', '八卦斯坦', '巴基斯坦', '巴勒斯坦'],
    value: '巴利斯坦·赛尔弥'
  },
  {
    key: ['小文书', '翻译', '女翻译', '小翻译', '女文书'],
    value: '弥桑黛'
  },
  /* direct redirection */
  {
    key: {
      '斯塔克': '史塔克',
      '奶德': '艾德·史塔克',
      '猫姨': '凯特琳·徒利',
      '萝卜': '罗柏·史塔克',
      '小妹': '艾莉亚·史塔克',
      '三傻': '珊莎·史塔克',
      '萌神': '布兰·史塔克',
      '核桃大帝': '瑞肯·史塔克',
      '小护士': 'TV:泰丽莎·梅葛亚',
      '血色婚礼': '红色婚礼',
      '贾坤': '贾昆·赫加尔',
      '三鹿': '蓝礼·拜拉席恩',
      '塔格利安': '坦格利安',
      '蛋蛋': '伊耿·坦格利安五世',
      '权利的游戏': '权力的游戏',
      '衣柜': '异鬼', 
      '湿柜': '尸鬼'
    },
    value: undefined
  }
];
