(function() {
  module.exports = function() {
    var request = require('request');
    var cheerio = require('cheerio');

    var section = arguments[0];
    var next = arguments[arguments.length - 1];
    delete arguments[arguments.length - 1];
    var nextPage = arguments[1] ? arguments[1] : '';
    var uri;
    if(nextPage){
      uri = 'http://9gag.com/' + nextPage;
    }else{
      uri = 'http://9gag.com/' + section;
    }
    

    var result = {
      nextPage:null,
      posts:[],
    };

    request({
      uri: uri,
      method: 'GET'
    }, function(err, res, html) {

      if (err) {
        return next(err, null);
      }

      var $ = cheerio.load(html);

      if ($('body').attr('id') === 'page-404') {
        var err = {
          code: 404,
          message: 'Sorry, the page you are looking for doesn\'t exist'
        };
        return next(err, null);
      }

      result.posts = $('div.badge-entry-collection > article').map(function() {
        var item = {
          title: null,
          id: null,
          url: null,
          image: null,
          video: null,
          points: null,
          commentCount: null
        };
        item.title = $(this).children('header').children('h2.badge-item-title').children('a').text().trim();
        item.id = $(this).attr('data-entry-id');

        var link = $(this).children('div.post-container').children('a').attr('href');
        item.url = link.indexOf('9gag.com') === -1 ? ('http://9gag.com' + link) : link;
        item.image = $(this).children('div.post-container').children('a').children('img').attr('src');
        if(!item.image){
          item.image = $(this).children('div.post-container').children('a').children('div').children('video').attr('poster');
          item.video = $(this).children('div.post-container').children('a').children('div').children('video').children('source').attr('src');
        }
        item.points = $(this).children('p.post-meta').children('a.badge-evt.point').children('span.badge-item-love-count').text().trim();
        item.commentCount = $(this).children('p.post-meta').children('a.badge-evt.comment').text().trim();
        item.commentCount = item.commentCount.substring(0, item.commentCount.indexOf(' comments'));

        return item;
      }).get();
      result.nextPage = $('a.badge-load-more-post').attr('href');
      return next(null, result);
    });
  }
}());
