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
            .catch(error => {
                next(error);
            });
    }

    // [GET] /blogs/:slug
    show(req, res, next) {
        // Code show của bạn
    }
        // [GET] /blogs/:id/edit
    edit(req, res, next) {
        // Tìm bài viết theo ID lấy từ URL
        Blog.findById(req.params.id).lean()
            .then(blog => res.render('edit', { blog: blog }))
            .catch(next);
    }
        // [PUT] /blogs/:id
    update(req, res, next) {
        // Tham số 1: Điều kiện tìm kiếm (Tìm theo _id)
        // Tham số 2: Dữ liệu mới (Lấy toàn bộ từ req.body)
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/')) // Sửa xong quay về Trang chủ
            .catch(next);
    }
        // [DELETE] /blogs/:id
    destroy(req, res, next) {
        Blog.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back')) // Xóa xong tải lại trang hiện tại
            .catch(next);
    }
    // [GET] /blogs/my-blogs
myBlogs(req, res, next) {
    Blog.find({})
        .lean()
        .then(blogs => {
            res.render('my-blogs', {
                blogs: blogs
            });
        })
        .catch(next);
}
}

module.exports = new BlogController();