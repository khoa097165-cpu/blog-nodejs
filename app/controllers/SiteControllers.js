const Blog = require('./models/Blogs');
const { mutileMongooseToObject } = require('../../util/mongoose');
class SiteController {

    // [GET] /home
    index(req, res, next) {

        Blog.find({})
            .then(blogs => {
                res.render('home', { blogs: mutileMongooseToObject(blogs) });
            })
            .catch(next);
    }

    // [GET] /search 
    // search(req, res) {
    //     res.render('search');
    // }
}

module.exports = new SiteController;  