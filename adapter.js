var consts = require('./consts.js');
var adapt = function(article) {
  return {
    'title': article.title, 
    'url': article.url,
    'description': article['abstract'], 
    'picurl': ((article.thumbnail) ? article.thumbnail : consts.PIC_SMALL)
  };
};

module.exports = {
  info: function(item) {
    return [ adapt(item) ];
  }, 
  search: function(items) {
    var len = items.length;
    if (len == 1) {
      var article = adapt(items[0]);
      if (!items[0].thumbnail) {
        article.picurl = consts.PIC_BIG;
      }
      return [ article ];
    } else {
      var articles = [];
      for (var i = 0; i < len; ++i) {
        articles.push(adapt(items[i]));
      }
      return articles;
    }
  }
};
