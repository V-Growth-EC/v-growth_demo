const auth = require('basic-auth');

module.exports = (request, response, next) => {
  const user = auth(request);

  if (user) {
    const username = 'admin';  // 設定您的用戶名
    const password = 'demo2024';  // 設定您的密碼

    if (user.name === username && user.pass === password) {
      return next();
    }
  }

  response.set('WWW-Authenticate', 'Basic realm="ICT学習支援機器販売サイト"');
  return response.status(401).send('認証が必要です。');
}; 