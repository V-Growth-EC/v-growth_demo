const express = require('express');
const path = require('path');
const auth = require('./auth');

const app = express();
const port = process.env.PORT || 3000;

// HTTPS 重定向（生產環境）
app.all('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect('https://' + req.headers.host + req.url);
  } else {
    next();
  }
});

// 基本認證中間件
app.use(auth);

// 靜態文件服務
app.use(express.static(path.join(__dirname, 'out')));

// 所有路由都返回 index.html（SPA 支援）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(port, () => {
  console.log(`ICT学習支援機器販売サイト listening on port ${port}!`);
  console.log(`認証情報: ユーザー名: admin, パスワード: demo2024`);
}); 