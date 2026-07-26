const siteRouter = require('./site');
const blogRouter = require('./blog');

function route(app) {
    app.use('/blogs', blogRouter);
    app.use('/', siteRouter);
}

module.exports = route;