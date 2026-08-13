const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');

router.get('/', SiteController.index);
router.get('/about', SiteController.about);
router.get('/contact', SiteController.contact);
router.get('/search', SiteController.search);
router.get('/login', SiteController.login);
router.post('/login', SiteController.checkLogin);

module.exports = router;