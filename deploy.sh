#!/bin/bash

# 清理舊的構建文件
rm -rf .next

# 安裝依賴
npm install

# 構建專案
npm run build

# 創建部署目錄
mkdir -p deploy

# 複製必要文件到部署目錄
cp -r .next deploy/
cp -r public deploy/
cp package.json deploy/
cp next.config.mjs deploy/

# 創建壓縮文件
tar -czf deploy.tar.gz deploy/

echo "打包完成！文件已保存為 deploy.tar.gz" 