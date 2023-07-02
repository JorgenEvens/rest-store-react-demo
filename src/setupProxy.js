module.exports = function(app) {
    app.use('/_api', require('./api'));
}
