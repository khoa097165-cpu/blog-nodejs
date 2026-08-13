require('dotenv').config();
const express = require('express');
// ... các code khác

const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');

// Kết nối Database
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

// Ghi đè phương thức HTTP thông qua tham số _method trên URL
app.use(methodOverride('_method'));

app.use(express.json());

// ==================== Handlebars ====================

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
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