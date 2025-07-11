#!/bin/bash

# === Nginx 設定檔部署腳本 ===
EC2_USER=ec2-user
EC2_HOST=3.236.177.143
PEM_PATH=~/Downloads/mamezou_ssh.pem
DOMAIN=demo3.edu-cart.jp

echo "🔧 部署 Nginx 設定檔到 EC2..."

# 上傳 nginx 設定檔
echo "📡 上傳 nginx.conf..."
scp -i "$PEM_PATH" nginx.conf $EC2_USER@$EC2_HOST:~/

# 登入 EC2 並設定 nginx
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST << EOF
  set -e
  
  echo "📋 備份現有 nginx 設定..."
  sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S)
  
  echo "📝 更新 nginx 設定檔..."
  sudo cp ~/nginx.conf /etc/nginx/nginx.conf
  
  echo "🔍 測試 nginx 設定..."
  sudo nginx -t
  
  if [ \$? -eq 0 ]; then
    echo "✅ Nginx 設定測試通過"
    
    echo "🔄 重啟 nginx 服務..."
    sudo systemctl restart nginx
    
    echo "📊 檢查 nginx 狀態..."
    sudo systemctl status nginx --no-pager
    
    echo "🔍 檢查 nginx 進程..."
    ps aux | grep nginx | grep -v grep
    
    echo "🌐 檢查監聽端口..."
    sudo netstat -tlnp | grep :80
    sudo netstat -tlnp | grep :443
    
  else
    echo "❌ Nginx 設定測試失敗，恢復備份..."
    sudo cp /etc/nginx/nginx.conf.backup.* /etc/nginx/nginx.conf
    sudo nginx -t
    echo "⚠️ 請檢查 nginx 設定檔語法"
  fi
  
  echo "📁 建立日誌目錄..."
  sudo mkdir -p /var/log/nginx
  
  echo "🔐 設定 SSL 證書自動更新..."
  # 建立 certbot 自動更新腳本
  sudo tee /etc/cron.d/certbot-renew > /dev/null << 'CRON'
# 每月更新 SSL 證書
0 12 1 * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
CRON
  
  echo "📋 顯示 nginx 設定摘要..."
  echo "=== Nginx 設定摘要 ==="
  echo "域名: $DOMAIN"
  echo "HTTP 端口: 80"
  echo "HTTPS 端口: 443"
  echo "Next.js 後端: http://127.0.0.1:3000"
  echo "SSL 證書路徑: /etc/letsencrypt/live/$DOMAIN/"
  echo "日誌路徑: /var/log/nginx/"
  echo "======================"
  
EOF

echo "🎉 Nginx 設定部署完成！"
echo "🌐 請訪問: https://$DOMAIN"
echo "📋 檢查日誌: sudo tail -f /var/log/nginx/demo3.edu-cart.jp.error.log" 