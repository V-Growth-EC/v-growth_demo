#!/bin/bash

# === 設定 ===
EC2_USER=ec2-user
EC2_HOST=3.236.177.143
PEM_PATH=~/Downloads/mamezou_ssh.pem
REMOTE_DIR=/var/www/next-app
ARCHIVE_NAME=deploy.tar.gz
DOMAIN=demo3.edu-cart.jp
EMAIL=tako955@gmail.com  # ⚠️ 請改為你自己的信箱

# === 本地打包 ===
echo "🛠️ 開始打包專案..."

rm -rf deploy
rm -f $ARCHIVE_NAME
mkdir deploy

# 必要檔案
cp -r .next deploy/
cp -r public deploy/
cp package.json deploy/
cp package-lock.json deploy/ 2>/dev/null
cp next.config.* deploy/ 2>/dev/null
cp .env deploy/ 2>/dev/null
cp .env.local deploy/ 2>/dev/null

# 偵測路由資料夾
if [ -d "src/app" ]; then
  echo "📁 偵測 src/app 架構，打包 src/"
  cp -r src deploy/
elif [ -d "pages" ]; then
  echo "📁 偵測 pages 架構"
  cp -r pages deploy/
elif [ -d "app" ]; then
  echo "📁 偵測 app 架構"
  cp -r app deploy/
else
  echo "❌ 找不到 app 或 pages 目錄，請確認 Next.js 結構"
  exit 1
fi

# 壓縮
tar -czf $ARCHIVE_NAME deploy/
echo "✅ 壓縮完成：$ARCHIVE_NAME"

# === 上傳 ===
echo "📡 上傳中..."
scp -i "$PEM_PATH" $ARCHIVE_NAME $EC2_USER@$EC2_HOST:~/

# === 登入 EC2 部署 ===
echo "🚀 登入 EC2 進行部署..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST << EOF
  set -e

  echo "📦 解壓縮與部署..."
  tar -xzf $ARCHIVE_NAME
  sudo mkdir -p $REMOTE_DIR
  sudo cp -r deploy/. $REMOTE_DIR
  sudo chown -R ec2-user:ec2-user $REMOTE_DIR
  cd $REMOTE_DIR

  # === 建立 Let's Encrypt 驗證目錄與測試檔案 ===
  mkdir -p public/.well-known/acme-challenge
  echo "test" > public/.well-known/acme-challenge/test
  chmod 755 public/.well-known
  chmod 755 public/.well-known/acme-challenge
  chmod 644 public/.well-known/acme-challenge/test

  echo "🛑 關閉所有 3000 port 的進程..."
  sudo lsof -t -i:3000 | xargs -r sudo kill -9
  sleep 1

  echo "📦 安裝依賴..."
  npm install

  echo "🔨 建立 production build..."
  npm run build

  echo "🚀 重新啟動 Next.js..."
  nohup npx next start > next.log 2>&1 &

  echo "🔁 測試並重啟 Nginx..."
  sudo nginx -t
  sudo systemctl restart nginx

  echo "🔐 安裝並啟用 SSL（Let's Encrypt）..."
  sudo yum install -y certbot python3-certbot-nginx
  sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m $EMAIL
EOF

echo "🎉 部署完成！請打開：https://$DOMAIN"
