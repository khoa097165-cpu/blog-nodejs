const Blog = require('./models/Blogs');
const { mutileMongooseToObject } = require('../../util/mongoose');
class MeController {

    // [GET] me/stored/blogs
    storedBlogs(req, res, next) {
        Blog.find({})
            .then(blogs =>
                res.render('me/stored-blogs', { blogs: mutileMongooseToObject(blogs) }))
            .catch(next);

    }
}

module.exports = new MeController;