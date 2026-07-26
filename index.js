const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const route = require('./routes');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('combined'));
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

// Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
}));

app.set('view engine', 'hbs');
app.set('views', './views');

// Routes
route(app);

// Server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});