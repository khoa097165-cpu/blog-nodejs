const express = require('express');
const router = express.Router();

// Trang chủ
router.get('/', (req, res) => {
    res.render('home');
});

// About
router.get('/about', (req, res) => {
    res.render('about');
});

// Contact
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Search
router.get('/search', (req, res) => {
    const { q, type } = req.query;

    console.log('Từ khóa:', q);
    console.log('Loại:', type);

    res.render('search');
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '123456') {
        res.send('Đăng nhập thành công');
    } else {
        res.send('Sai tài khoản hoặc mật khẩu');
    }
});

// Giới thiệu
router.get('/gioi-thieu', (req, res) => {
    res.send(`
        <h1>Thông tin cá nhân</h1>

        <p>
            <b>Họ và tên:</b> Nguyễn Anh Khoa |
            <b>Mã sinh viên:</b> 2606042025 |
            <b>Lớp:</b> 20THL
        </p>

        <p>
            <b>Họ và tên:</b> Lê Nguyên Bảo Nam |
            <b>Mã sinh viên:</b> 2606042023 |
            <b>Lớp:</b> 20THL
        </p>
    `);
});

module.exports = router;