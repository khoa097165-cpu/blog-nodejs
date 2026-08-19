const siteRouter = require('./site');
const blogRouter = require('./blog');
const meController = require('../app/controllers/MeController');

function route(app) {

    app.use('/', siteRouter);

    app.use('/blogs', blogRouter);

    app.get('/me/stored/blogs', meController.storedBlogs);
}

module.exports = route;