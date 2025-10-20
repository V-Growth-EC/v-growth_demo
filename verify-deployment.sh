#!/bin/bash

# AWS 部署驗證腳本
# 用於驗證部署後的服務狀態

echo "🔍 開始驗證 AWS 部署狀態..."

# 配置
EC2_USER=ec2-user
EC2_HOST=100.27.8.30
PEM_PATH=~/Downloads/mamezou_ssh.pem
DOMAIN=www3.edu-cart.jp

# 顏色輸出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "📡 檢查 EC2 連接..."
ssh -i "$PEM_PATH" -o ConnectTimeout=10 $EC2_USER@$EC2_HOST "echo 'EC2 連接成功'" 2>/dev/null
print_status $? "EC2 連接"

echo "🔧 檢查 Nginx 狀態..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "sudo systemctl is-active nginx" 2>/dev/null | grep -q "active"
print_status $? "Nginx 服務運行"

echo "🌐 檢查 Nginx 配置..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "sudo nginx -t" 2>/dev/null
print_status $? "Nginx 配置語法"

echo "🚀 檢查 Next.js 應用..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "ps aux | grep 'next start' | grep -v grep" 2>/dev/null
print_status $? "Next.js 應用運行"

echo "🔌 檢查端口監聽..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "sudo netstat -tlnp | grep ':80\|:3000'" 2>/dev/null
print_status $? "端口監聽狀態"

echo "🌍 檢查域名解析..."
nslookup $DOMAIN 2>/dev/null | grep -q "Address:"
print_status $? "域名解析"

echo "🔒 檢查 SSL 證書..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "sudo ls -la /etc/letsencrypt/live/$DOMAIN/" 2>/dev/null
print_status $? "SSL 證書存在"

echo "🏥 檢查健康檢查端點..."
curl -s -o /dev/null -w "%{http_code}" "http://$EC2_HOST/healthz" 2>/dev/null | grep -q "200"
print_status $? "健康檢查端點"

echo "🔗 檢查 API 端點..."
curl -s -o /dev/null -w "%{http_code}" "http://$EC2_HOST/api/gmo-linkpay" -X POST -H "Content-Type: application/json" -d '{}' 2>/dev/null | grep -q "400\|500"
print_status $? "API 端點響應"

echo "📊 檢查系統資源..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "free -h && df -h /" 2>/dev/null
print_status $? "系統資源狀態"

echo "📝 檢查應用日誌..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "tail -n 10 /var/log/nextjs.log 2>/dev/null || echo '日誌文件不存在'"
print_status $? "應用日誌"

echo "🔍 檢查 Nginx 錯誤日誌..."
ssh -i "$PEM_PATH" $EC2_USER@$EC2_HOST "sudo tail -n 5 /var/log/nginx/error.log 2>/dev/null || echo '無錯誤日誌'"
print_status $? "Nginx 錯誤日誌"

echo ""
echo "🎯 部署驗證完成！"
echo ""
echo "📋 下一步建議："
echo "1. 如果所有檢查都通過，可以測試完整的支付流程"
echo "2. 如果有失敗項目，請檢查對應的服務和配置"
echo "3. 使用 'node test-gmo-api.js aws' 測試 API 端點"
echo "4. 檢查 AWS ELB 和目標群組的健康狀態"
echo ""
echo "🔗 測試 URL:"
echo "  網站: https://$DOMAIN"
echo "  API: https://$DOMAIN/api/gmo-linkpay"
echo "  健康檢查: http://$EC2_HOST/healthz"
