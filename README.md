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

## 部署與 AWS/ELB 常見問題總結

### 1. ELB 目標組健康檢查失敗
- **現象**：ELB 目標組顯示 unhealthy，流量無法正確導到 EC2。
- **原因**：nginx 80 埠只做 301 轉址，ELB 預設健康檢查路徑收到 301/302，判斷為不健康。
- **解法**：在 nginx 80 埠 server block 增加 `/healthz` 路徑，直接回應 200 OK，並將 ELB 健康檢查路徑設為 `/healthz`。

### 2. 301 Redirect Loop（重複轉址）
- **現象**：瀏覽器或 curl 訪問網站時遇到 ERR_TOO_MANY_REDIRECTS 或 301 轉址無限循環。
- **原因**：ELB 443 監聽器指向 80 埠目標組，nginx 80 埠只做 301 轉址到 443，造成無限循環。
- **解法**：ELB 443 監聽器必須指向 443/HTTPS 目標組，讓 ELB 直接用 HTTPS 連到 nginx 443 埠。

### 3. 400 Bad Request: The plain HTTP request was sent to HTTPS port
- **現象**：curl 或瀏覽器收到 400 Bad Request，訊息為 The plain HTTP request was sent to HTTPS port。
- **原因**：ELB 目標組協定設為 HTTP，連接埠卻是 443，導致 ELB 用明文 HTTP 連到 nginx 443（只接受加密 HTTPS）。
- **解法**：建立目標組時，協定選 HTTPS，連接埠 443，健康檢查協定也選 HTTPS。

### 4. 目標組「使用中」無法重複綁定
- **現象**：建立 ELB 監聽器時，發現 443/HTTPS 目標組顯示「使用中」無法選擇。
- **原因**：同一個目標組不能同時被多個 ELB 或多個監聽器重複綁定在同一個埠口。
- **解法**：為每個 ELB 建立獨立的 443/HTTPS 目標組，或只用一個 ELB。

### 5. nginx 反向代理與 Header 設定
- **現象**：API 認證、Cookie、協定判斷異常。
- **原因**：nginx 反向代理未正確傳遞 Host、X-Forwarded-Proto 等 Header。
- **解法**：在 nginx 反向代理區塊加上：
  ```nginx
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  ```

### 6. certbot 自動續約排程錯誤
- **現象**：tee: /etc/cron.d/certbot-renew: No such file or directory
- **原因**：/etc/cron.d 目錄不存在或權限不足。
- **解法**：手動建立 /etc/cron.d 目錄後再執行腳本。

---

**總結：**
- ELB 443 監聽器必須指向 443/HTTPS 目標組，且目標組協定選 HTTPS。
- nginx 80 埠只做 301 轉址時，健康檢查需設專用路徑。
- 反向代理 Header 必須正確傳遞。
- 每個 ELB 需獨立 443 目標組。
- certbot 續約排程需確認目錄權限。

遇到上述問題時，請依照對應解法調整，即可順利完成 Next.js + nginx + AWS ELB 的安全部署。

## 部署時 3000 埠已被佔用的解決方法

當你啟動 Next.js 伺服器時，可能會出現如下錯誤：

```
Error: listen EADDRINUSE: address already in use :::3000
```

這是因為 3000 埠已經被其他程式使用。

### 對應步驟

1. **找出使用 3000 埠的程式**

   ```bash
   sudo netstat -tulnp | grep 3000
   ```
   例如：
   ```
   tcp6  0  0 :::3000  :::*  LISTEN  113121/next-server
   ```
   → 這表示 PID 113121 的 next-server 正在使用 3000 埠

2. **終止該程式**

   ```bash
   kill -9 113121
   ```
   ※ 請將上面的 PID 號碼替換為您找到的號碼

3. **重新啟動 Next.js**

   ```bash
   npm run start
   # 或者
   npx next start
   ```

---

- 如果您使用 `lsof -i :3000` 命令時沒有任何輸出，請使用 `netstat` 命令進行確認。
- 如果仍然無法解決，可以重啟 EC2 實例，這樣可以確保 3000 埠被釋放。

## GMO/Epsilon Link Payment（信用卡測試）API 串接說明

### 1. API 路徑（Endpoint）

- 測試用 API 路徑（信用卡連結付款）  
  ```
  https://beta.epsilon.jp/cgi-bin/order/receive_order3.cgi
  ```

---

### 2. 請求方式

- **HTTP Method**：POST
- **Content-Type**：application/x-www-form-urlencoded

---

### 3. 主要參數（欄位）

| 欄位名稱           | 說明                   | 範例值                       | 必填 |
|--------------------|------------------------|------------------------------|------|
| contract_code      | 契約編號（測試帳號）   | 74225830                     | 是   |
| order_number       | 訂單編號（唯一）       | 123456789                    | 是   |
| item_code          | 商品代碼               | A1                           | 是   |
| item_name          | 商品名稱               | Test                         | 是   |
| item_price         | 商品金額（半形數字）   | 59000                        | 是   |
| user_id            | 用戶ID                 | u1                           | 是   |
| user_name          | 用戶名稱               | タロウ                       | 是   |
| orderer_name       | 訂購人名稱             | タロウ                       | 是   |
| mission_code       | 任務代碼（通常填1）    | 1                            | 是   |
| process_code       | 處理代碼（通常填1）    | 1                            | 是   |
| orderer_address    | 訂購人地址             | 東京都渋谷区1-1-1            | 是   |
| orderer_postal     | 訂購人郵遞區號         | 1234567                      | 是   |
| orderer_tel        | 訂購人電話             | 0312345678                   | 是   |
| user_mail_add      | 用戶Email              | epsilon_test_9999@epsilon.jp | 是   |
| st_code            | 決済方式（測試用10000）| 10000                        | 是   |
| return_url         | 完成後跳轉URL          | https://xxx/complete?orderId=123456789 | 是   |
| lang_id            | 語言                   | ja                           | 否   |
| currency_id        | 幣別                   | JPY                          | 否   |
| xml                | 回傳格式（1=XML）      | 1                            | 是   |
| version            | API版本                | 2                            | 是   |
| page_type          | 畫面型態（2=Link Payment）| 2                        | 是   |

---

### 4. 範例程式（Node.js fetch）

```js
const params = {
  contract_code: '74225830',
  order_number: '123456789',
  item_code: 'A1',
  item_name: 'Test',
  item_price: '59000',
  user_id: 'u1',
  user_name: 'タロウ',
  orderer_name: 'タロウ',
  mission_code: '1',
  process_code: '1',
  orderer_address: '東京都渋谷区1-1-1',
  orderer_postal: '1234567',
  orderer_tel: '0312345678',
  user_mail_add: 'epsilon_test_9999@epsilon.jp',
  st_code: '10000',
  return_url: 'https://yourdomain.com/cart/complete?orderId=123456789',
  lang_id: 'ja',
  currency_id: 'JPY',
  xml: '1',
  version: '2',
  page_type: '2'
};

const formBody = Object.entries(params)
  .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
  .join('&');

const res = await fetch('https://beta.epsilon.jp/cgi-bin/order/receive_order3.cgi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: formBody,
});
const xml = await res.text();
console.log(xml);
```

---

### 5. 回傳結果

- 回傳為 XML 格式，需解析 `<Epsilon_result>` 內容。
- 若有 `redirect` 欄位，需將用戶導向該 URL 進行刷卡。

---

### 6. 注意事項

- **contract_code** 請填寫 GMO/Epsilon 提供的測試帳號。
- **order_number** 請確保唯一且為半形英數字。
- **return_url** 請填寫可公開訪問的網址。
- 測試信用卡號、測試流程請參考 GMO/Epsilon 官方文件。

---

如需更多欄位說明，請參考 GMO/Epsilon 官方 API 文件或聯絡技術窗口。
