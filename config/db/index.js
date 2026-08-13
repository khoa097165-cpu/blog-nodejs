const mongoose = require('mongoose');

// Tạo một hàm kết nối bất đồng bộ
async function connect() {
    try {
        // Lấy chuỗi kết nối từ biến môi trường .env
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ Kết nối Database thành công!');
    } catch (error) {
        console.log('❌ Kết nối Database thất bại!');
        console.log(error);
    }
}

// Xuất hàm connect ra ngoài
module.exports = { connect };