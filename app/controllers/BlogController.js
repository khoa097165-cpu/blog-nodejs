const Blog = require('./models/Blogs');
const { mongooseToObject } = require('../../util/mongoose');
const { request } = require('express');
class BlogController {

    // [GET] /blogs/:slug 
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .then(blog => res.render('blogs/show', { blog: mongooseToObject(blog) }))
            .catch(next);
    }

    // [GET] /blogs/create
    create(req, res, next) {
        res.render('blogs/create');
    }

    // [POST] /blogs/store
    store(req, res, next) {
        const blog = new Blog(req.body);
        blog.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                console.log(error);
            });
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Blog.findById(req.params.id)
            .then(blogs => res.render('blogs/edit', { blogs: mongooseToObject(blogs) }))
            .catch(next);
    }

    // [PUT] /blogs/:id
    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/blogs'))
            .catch(next);
    }

    // [DELETE] /blogs/:id
    destroy(req, res, next) {
        Blog.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

}

module.exports = new BlogController;