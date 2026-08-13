const Blog = require('../models/Blogs');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Blog.find({})
            .sort({ createdAt: -1 })
            .lean()
            .then((blogs) => {
                res.render('home', { blogs });
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
    search(req, res) {
        console.log("Từ khóa tìm kiếm:", req.query.q);
        res.render('search');
    }

    // [GET] /login
    login(req, res) {
        res.render('login');
    }

    // [POST] /login
    checkLogin(req, res) {
        console.log("Đã vào checkLogin");
        console.log(req.body);

        const { username, password } = req.body;

        if (username === 'admin' && password === '123456') {
            console.log("Đúng tài khoản");
            res.send('Đăng nhập thành công');
        } else {
            console.log("Sai tài khoản");
            res.send('Sai tài khoản hoặc mật khẩu');
        }
    }
}

module.exports = new SiteController();