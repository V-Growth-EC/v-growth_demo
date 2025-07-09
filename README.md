這是一個使用 [Next.js](https://nextjs.org) 建立的專案，使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 初始化。

## 開始使用

首先，運行開發伺服器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

使用瀏覽器打開 [http://localhost:3000](http://localhost:3000) 查看結果。

您可以通過修改 `app/page.js` 來開始編輯頁面。當您編輯文件時，頁面會自動更新。

本專案使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自動優化並加載 [Geist](https://vercel.com/font)，這是 Vercel 的新字體系列。

## 部署說明

### 本地構建

要在本地構建專案：

```bash
npm run build
```

### SFTP 部署

1. **準備部署**

   運行部署腳本創建部署包：
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```
   這將創建一個包含所有必要文件的 `deploy.tar.gz` 文件。

2. **上傳到伺服器**

   使用 SFTP 客戶端（如 FileZilla 或 Cyberduck）：
   - 主機：您的伺服器 IP 或域名
   - 用戶名：您的 SFTP 用戶名
   - 密碼：您的 SFTP 密碼
   - 端口：通常是 22

   將 `deploy.tar.gz` 文件上傳到您的伺服器。

3. **伺服器設置**

   在伺服器上運行以下命令：
   ```bash
   # 解壓部署包
   tar -xzf deploy.tar.gz
   
   # 進入部署目錄
   cd deploy
   
   # 安裝生產環境依賴
   npm install --production
   
   # 啟動應用
   npm start
   ```

4. **生產環境注意事項**

   - 確保伺服器上已安裝 Node.js 和 npm
   - 設置適當的環境變量
   - 建議使用 PM2 等進程管理工具來管理生產環境
   - 配置網頁伺服器（nginx、Apache）來代理請求到您的 Next.js 應用

## 了解更多

要了解更多關於 Next.js 的信息，請查看以下資源：

- [Next.js 文檔](https://nextjs.org/docs) - 了解 Next.js 的功能和 API
- [學習 Next.js](https://nextjs.org/learn) - 互動式 Next.js 教程

您可以在 [Next.js GitHub 倉庫](https://github.com/vercel/next.js) 查看源碼 - 歡迎您的反饋和貢獻！

## 在 Vercel 上部署

部署 Next.js 應用最簡單的方法是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，這是 Next.js 的創建者提供的平台。

查看我們的 [Next.js 部署文檔](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多詳情。

## Git 推送到指定倉庫

若要讓本專案一律推送到指定的 GitHub 倉庫（`https://github.com/tkctako/v-growth_demo.git`），請依照以下步驟設定：

1. 移除舊的遠端（如有）：
   ```bash
   git remote remove origin
   ```
2. 新增遠端：
   ```bash
   git remote add origin https://github.com/tkctako/v-growth_demo.git
   ```
3. 以後推送時，直接執行：
   ```bash
   git push origin main
   # 或只用 git push（如果只有一個 remote）
   ```

這樣所有 commit 都會推送到你指定的 GitHub 倉庫。
