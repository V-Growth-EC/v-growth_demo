const express = require('express');
const path = require('path');
const auth = require('./auth');

const app = express();
const port = process.env.PORT || 3000;

// HTTPS リダイレクト（本番環境）
app.all('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect('https://' + req.headers.host + req.url);
  } else {
    next();
  }
});

// 基本認証ミドルウェア
app.use(auth);

// 静的ファイルサービス
app.use(express.static(path.join(__dirname, 'out')));

// すべてのルートで index.html を返す（SPA サポート）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`認証情報: ユーザー名: admin, パスワード: demo2024`);
}); 