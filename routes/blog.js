const express = require('express');
const router = express.Router();

// Form tạo blog
router.get('/create', (req, res) => {
    res.render('create');
});

// Nhận dữ liệu
router.post('/create', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

module.exports = router;