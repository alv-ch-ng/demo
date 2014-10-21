var routes = {};

routes['health'] = function(req, res){ res.send('1'); };

var apply = function(app) {
    app.get('/health', routes['health']);
};

module.exports.routes = routes;
module.exports.apply = apply;