require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

const db = require('./config/db');
const route = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// ==================== Database ====================

db.connect();

// ==================== Middleware ====================

app.use(morgan('combined'));
app.use(express.static('public'));

app.use(
    express.urlencoded({
        extended: true,
    })
);

// ==================== SESSION ====================

app.use(session({
    secret: 'tin-tuc-secret',
    resave: false,
    saveUninitialized: false
}));

// Cho tất cả view .hbs biết tài khoản đang đăng nhập
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// ==================== METHOD OVERRIDE ====================

app.use(methodOverride('_method'));

app.use(express.json());

// ==================== Handlebars ====================

app.engine(
    'hbs',
    engine({
        extname: '.hbs',

        helpers: {

            // So sánh bằng
            eq: (a, b) => a == b,

            // Lớn hơn
            gt: (a, b) => a > b,

            // Nhỏ hơn
            lt: (a, b) => a < b,

            // Cộng
            add: (a, b) => Number(a) + Number(b),

            // Trừ
            subtract: (a, b) => Number(a) - Number(b),

            // Tạo danh sách trang
            paginationPages: (currentPage, totalPages) => {

                const pages = [];

                let start = Math.max(1, currentPage - 1);
                let end = Math.min(totalPages, currentPage + 1);

                // Khi đang ở trang 1 hoặc 2
                if (currentPage <= 2) {
                    start = 1;
                    end = Math.min(totalPages, 3);
                }

                // Khi ở gần trang cuối
                if (currentPage >= totalPages - 1) {
                    start = Math.max(1, totalPages - 2);
                    end = totalPages;
                }

                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }

                return pages;
            }
        }
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');

// ==================== Routes ====================

route(app);

// ==================== Server ====================

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});