const express = require('express');
<<<<<<< HEAD
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

// ==================== Middleware ====================

app.use(morgan('combined'));
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// ==================== Handlebars ====================

app.engine('hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './views');

// ==================== Routes ====================

// Trang chủ
app.get('/', (req, res) => {
    res.render('home');
});

// Trang About
app.get('/about', (req, res) => {
    res.render('about');
});

// Trang Contact
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Trang Search
app.get('/search', (req, res) => {
    const { q, type } = req.query;

    console.log('Từ khóa:', q);
    console.log('Loại:', type);

    res.render('search');
});

// ==================== CREATE BLOG ====================

// Hiển thị form tạo blog
app.get('/blogs/create', (req, res) => {
    res.render('create');
});

// Nhận dữ liệu từ form
app.post('/blogs/create', (req, res) => {
    console.log("Dữ liệu nhận được từ Form:", req.body);

    res.json(req.body);
});

// ==================== LOGIN ====================

// Hiển thị trang đăng nhập
app.get('/login', (req, res) => {
    res.render('login');
});

// Xử lý đăng nhập
app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (username === 'admin' && password === '123456') {
        console.log('Đăng nhập thành công');
        res.send('Đăng nhập thành công');
    } else {
        console.log('Sai tài khoản hoặc mật khẩu');
        res.send('Sai tài khoản hoặc mật khẩu');
    }
});

// Trang giới thiệu
app.get('/gioi-thieu', (req, res) => {
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

// ==================== Server ====================

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
=======
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/gioi-thieu', (req, res) => {
    res.send(`
    <h1>Thông tin cá nhân</h1>

    <p>
      <span><b>Họ và tên:</b> Nguyễn Anh Khoa</span> |
      <span><b>Mã sinh viên:</b> 2606042025</span> |
      <span><b>Lớp:</b> 20THL</span>
    </p>

    <p>
      <span><b>Họ và tên:</b> Lê Nguyên Bảo Nam</span> |
      <span><b>Mã sinh viên:</b> 2606042023</span> |
      <span><b>Lớp:</b> 20THL</span>
    </p> 
    `);
  });
  app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
  });
  const morgan = require('morgan'); 
  
  
  app.use(morgan('combined'));
  
  app.get('/', (req, res) => {
    res.send('Chào mừng đến với Blog cá nhân của tôi!');
  });
  
  app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
  });
  const { engine } = require('express-handlebars');

  // Cấp quyền truy cập cho thư mục public
  app.use(express.static('public'));
  
  // Cấu hình Handlebars
  app.engine('hbs', engine({ extname: '.hbs' }));
  app.set('view engine', 'hbs');
  app.set('views', './views'); // Chỉ định thư mục chứa giao diện
>>>>>>> 188db8f9cb6f4b601c2cdd8416ab0c653ac8edb6
