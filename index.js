const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('nguyen anh khoa123');
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