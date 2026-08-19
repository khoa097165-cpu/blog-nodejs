const express = require('express');

const router = express.Router();

const blogController = require('../app/controllers/BlogController');

// Trang tạo bài viết
router.get('/create', blogController.create);

// Trang danh sách / lọc theo chủ đề
router.get('/', blogController.index);

// Lưu bài viết
router.post('/store', blogController.store);

// Bài viết của tôi
router.get('/my-blogs', blogController.myBlogs);

// Sửa bài viết
router.get('/:id/edit', blogController.edit);

// Cập nhật bài viết
router.put('/:id', blogController.update);

// Xóa bài viết
router.delete('/:id', blogController.destroy);

// Xem chi tiết bài viết
// PHẢI để cuối cùng
router.get('/:slug', blogController.show);

module.exports = router;