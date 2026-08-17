const Blog = require('../models/Blogs');

class BlogController {

    // [GET] /blogs/create
    create(req, res, next) {
        res.render('create');
    }

    // [POST] /blogs/store
    store(req, res, next) {
        const formData = req.body;

        const blog = new Blog(formData);

        blog.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [GET] /blogs/:slug
    show(req, res, next) {
        console.log('SLUG:', req.params.slug);

        Blog.findOne({ slug: req.params.slug })
            .lean()
            .then((blog) => {
                console.log('BLOG:', blog);

                if (!blog) {
                    return res.status(404).send('Không tìm thấy bài viết');
                }

                res.render('show', { blog });
            })
            .catch(next);
    }

    // [GET] /blogs/:id/edit
    edit(req, res, next) {
        Blog.findById(req.params.id)
            .lean()
            .then((blog) => {
                if (!blog) {
                    return res.status(404).send('Không tìm thấy bài viết');
                }

                res.render('edit', { blog });
            })
            .catch(next);
    }

    // [PUT] /blogs/:id
    update(req, res, next) {
        Blog.updateOne(
            { _id: req.params.id },
            req.body
        )
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [DELETE] /blogs/:id
    destroy(req, res, next) {
        Blog.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/me/stored/blogs');
            })
            .catch(next);
    }

    // [GET] /blogs/my-blogs
    myBlogs(req, res, next) {
        Blog.find({})
            .lean()
            .then((blogs) => {
                res.render('my-blogs', {
                    blogs: blogs
                });
            })
            .catch(next);
    }


// [GET] /search
search(req, res, next) {
    const keyword = (req.query.q || '').trim();

    if (!keyword) {
        return res.render('search', {
            blogs: [],
            keyword: ''
        });
    }

    Blog.find({
        $or: [
            {
                name: {
                    $regex: keyword,
                    $options: 'i'
                }
            },
            {
                description: {
                    $regex: keyword,
                    $options: 'i'
                }
            }
        ]
    })
        .lean()
        .then((blogs) => {
            console.log('Từ khóa:', keyword);
            console.log('Số bài tìm thấy:', blogs.length);

            res.render('search', {
                blogs: blogs,
                keyword: keyword
            });
        })
        .catch(next);
}
}

module.exports = new BlogController();