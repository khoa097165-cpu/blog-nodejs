const express = require('express');

const siteRouter = require('./site');
const blogRouter = require('./blog');
const meController = require('../app/controllers/MeController');
const blogController = require('../app/controllers/BlogController');

function route(app) {
    app.use('/', siteRouter);

    // Tìm kiếm
    app.get('/search', blogController.search);

    // Blog
    app.use('/blogs', blogRouter);

    // Quản lý bài viết
    app.get('/me/stored/blogs', meController.storedBlogs);
}

module.exports = route;