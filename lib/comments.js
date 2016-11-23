//https://github.com/RubenNL/node-9gag
(function() {
	module.exports = function(id, next) {
		var request = require('request');
		var $ = require('cheerio');
		var comments = [];
		uri = 'http://9gag.com/gag/' + id;
		url = 'http://comment-cdn.9gag.com/v1/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&url=' + encodeURIComponent(uri) + '&count=10&level=2&order=score&mentionMapping=true&origin=9gag.com';
		request({
			uri: url,
			method: 'GET'
		}, function(err, res, html) {
			if(err) {
				return next(err, null)
			}
			$(JSON.parse(html).payload.comments).each(function(index, comment) {
				if(comment.type=="text") {
					comments.push({"user": comment.user.displayName, "text": comment.text});
				}
			});
			return next(null, comments);
		});
	}
}());