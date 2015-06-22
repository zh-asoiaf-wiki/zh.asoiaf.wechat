module.exports = [
  /* hack for [[琼恩·雪诺/生死之谜]] */
  {
    key: function(msg) {
      var if_exist_die = (msg.indexOf('死') >= 0);
      if (((msg.indexOf('琼恩') >= 0) && if_exist_die) 
        || ((msg.indexOf('雪诺') >= 0) && if_exist_die)) {
        // exception
        if (msg.indexOf('艾林') >= 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    value: '琼恩·雪诺/生死之谜'
  }
];
