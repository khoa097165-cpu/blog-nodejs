const User = require('../models/User');
const Blog = require('../models/Blogs');

class SiteController {

    // [GET] /
    index(req, res, next) {
        const page = Number(req.query.page) || 1;
        const perPage = 4;

        Blog.find({})
            .sort({ createdAt: -1 })
            .lean()
            .then((allBlogs) => {

                const start = (page - 1) * perPage;
                const blogs = allBlogs.slice(start, start + perPage);

                res.render('home', {
                    blogs,
                    user: req.session.user
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

    if (!keyword) {
        return res.render('search', {
            keyword: '',
            blogs: []
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
        .sort({ createdAt: -1 })
        .lean()
        .then(blogs => {

            console.log('======================');
            console.log('TỪ KHÓA:', keyword);
            console.log('SỐ KẾT QUẢ:', blogs.length);
            console.log('KẾT QUẢ:', blogs);
            console.log('======================');

            res.render('search', {
                keyword: keyword,
                blogs: blogs
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

            // Lưu tài khoản đăng nhập
            req.session.user = {
                id: user._id,
                username: user.username
            };

            // Về trang chủ
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

    // Kiểm tra rỗng
    if (!username || !password || !confirmPassword) {
        return res.send('Vui lòng nhập đầy đủ thông tin');
    }

    // Kiểm tra mật khẩu
    if (password !== confirmPassword) {
        return res.send('Mật khẩu nhập lại không khớp');
    }

    User.findOne({ username })
        .then(user => {

            // Đã tồn tại
            if (user) {
                return res.send('Tên đăng nhập đã tồn tại');
            }

            // Tạo user mới
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