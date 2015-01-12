var consts = require('./consts.js');
var adapt = function(article) {
  return {
    'title': article.title, 
    'url': article.url,
    'description': article['abstract'], 
    'picurl': ((article.thumbnail) ? article.thumbnail : consts.PIC_SMALL)
  };
};

/*
 * Resize thumbnail to wechat-size-360x200
 */
var resize = function(picurl, ow, oh) {
  var tw = 360, th = 200;
  var rw = ow, rh = Math.ceil(ow / tw * th);
  picurl = picurl.replace(/window-width\/\d*/, 'window-width/' + rw);
  picurl = picurl.replace(/window-height\/\d*/, 'window-height/' + rh);
  picurl = picurl.replace(/window-crop\/width\/\d*/, 'window-crop/width/' + tw);
  picurl = picurl.replace(/x-offset\/\d*/, 'x-offset/0');
  picurl = picurl.replace(/y-offset\/\d*/, 'y-offset/0');
  return picurl;
};

module.exports = {
  info: function(item) {
    var article = adapt(item);
    if (!item.thumbnail) {
      article.picurl = consts.PIC_BIG;
    } else {
      article.picurl = resize(article.picurl, 
        item['original_dimensions'].width, 
        item['original_dimensions'].height);
    }
    return [ article ];
  }, 
  search: function(items) {
    var len = items.length;
    if (len == 1) {
      var item = items[0];
      var article = adapt(item);
      if (!item.thumbnail) {
        article.picurl = consts.PIC_BIG;
      } else {
        article.picurl = resize(article.picurl, 
          item['original_dimensions'].width, 
          item['original_dimensions'].height);
      }
      return [ article ];
    } else {
      var articles = [];
      for (var i = 0; i < len; ++i) {
        var item = items[i];
        if (i == 0) {
          var article = adapt(item);
          if (!item.thumbnail) {
            article.picurl = consts.PIC_BIG;
          } else {
            article.picurl = resize(article.picurl, 
              item['original_dimensions'].width, 
              item['original_dimensions'].height);
          }
          articles.push(article);
        } else {
          articles.push(adapt(item));
        }
      }
      return articles;
    }
  }
};
