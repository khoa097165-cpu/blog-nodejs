const User = require('../models/User');
const Blog = require('../models/Blogs');

class SiteController {

    // [GET] /
index(req, res, next) {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const perPage = 4;

    Blog.find({})
        .sort({ createdAt: -1 })
        .lean()
        .then((allBlogs) => {

            const totalBlogs = allBlogs.length;
            const totalPages = Math.ceil(totalBlogs / perPage);

            // Nếu nhập page vượt quá số trang
            const currentPage = Math.min(page, Math.max(totalPages, 1));

            const start = (currentPage - 1) * perPage;
            const blogs = allBlogs.slice(start, start + perPage);

            res.render('home', {
                blogs,
                currentPage,
                totalPages
            });
        })
        .catch(next);
}

    // [GET] /category/:category
    category(req, res, next) {
        const category = req.params.category;

        Blog.find({ category: category })
            .sort({ createdAt: -1 })
            .lean()
            .then((blogs) => {
                res.render('category', {
                    blogs,
                    category
                });
            })
            .catch(next);
    }

    // [GET] /about
    about(req, res) {
        res.render('about');
    }

    // [GET] /contact
    contact(req, res) {
        res.render('contact');
    }

    // [GET] /search
    search(req, res, next) {
        const keyword = (req.query.q || '').trim();
        const category = (req.query.category || '').trim();

        // Chưa tìm kiếm gì thì không hiện bài
        if (!keyword && !category) {
            return res.render('search', {
                keyword: '',
                category: '',
                blogs: []
            });
        }

        const filter = {};

        // Tìm theo từ khóa
        if (keyword) {
            filter.$or = [
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
            ];
        }

        // Tìm theo chủ đề
        if (category) {
            filter.category = category;
        }

        Blog.find(filter)
            .sort({ createdAt: -1 })
            .lean()
            .then((blogs) => {

                console.log('======================');
                console.log('TỪ KHÓA:', keyword);
                console.log('CHỦ ĐỀ:', category);
                console.log('FILTER:', filter);
                console.log('SỐ KẾT QUẢ:', blogs.length);
                console.log('======================');

                res.render('search', {
                    keyword,
                    category,
                    blogs
                });
            })
            .catch(next);
    }

    // [GET] /login
    login(req, res) {
        res.render('login');
    }

    // [POST] /login
    checkLogin(req, res, next) {
        const { username, password } = req.body;

        User.findOne({ username })
            .then(user => {

                if (!user) {
                    return res.send('Tài khoản không tồn tại');
                }

                if (user.password !== password) {
                    return res.send('Sai mật khẩu');
                }

                req.session.user = {
                    id: user._id,
                    username: user.username
                };

                res.redirect('/');
            })
            .catch(next);
    }

    // [GET] /register
    register(req, res) {
        res.render('register');
    }

    // [POST] /register
    storeRegister(req, res, next) {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password || !confirmPassword) {
            return res.send('Vui lòng nhập đầy đủ thông tin');
        }

        if (password !== confirmPassword) {
            return res.send('Mật khẩu nhập lại không khớp');
        }

        User.findOne({ username })
            .then(user => {

                if (user) {
                    return res.send('Tên đăng nhập đã tồn tại');
                }

                const newUser = new User({
                    username,
                    password
                });

                return newUser.save();
            })
            .then(() => {
                res.redirect('/login');
            })
            .catch(next);
    }

    // [GET] /logout
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.redirect('/');
        });
    }
}

module.exports = new SiteController();