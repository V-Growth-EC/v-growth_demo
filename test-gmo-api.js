#!/usr/bin/env node

/**
 * GMO LinkPay API 測試腳本
 * 用於測試 AWS 部署後的 API 端點
 */

const https = require('https');
const http = require('http');

// 測試配置
const config = {
  // 本地測試
  local: {
    baseUrl: 'http://localhost:3000',
    protocol: http
  },
  // AWS 測試
  aws: {
    baseUrl: 'https://www3.edu-cart.jp',
    protocol: https
  }
};

// 測試數據
const testData = {
  orderId: 'TEST_' + Date.now(),
  classroom: 'TEST_CLASS',
  customerInfo: {
    name: 'テストユーザー',
    email: 'test@example.com',
    tel: '03-1234-5678',
    postal: '100-0001',
    address: '東京都千代田区千代田1-1-1'
  },
  products: {
    ids: 'PROD001',
    names: 'テスト商品',
    pricing: {
      total: 1000
    }
  }
};

async function testAPI(env = 'local') {
  const { baseUrl, protocol } = config[env];
  const url = `${baseUrl}/api/gmo-linkpay`;
  
  console.log(`\n🧪 測試 ${env.toUpperCase()} 環境: ${url}`);
  console.log('📤 發送數據:', JSON.stringify(testData, null, 2));
  
  const postData = JSON.stringify(testData);
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = protocol.request(url, options, (res) => {
      let data = '';
      
      console.log(`📊 響應狀態: ${res.statusCode}`);
      console.log(`📋 響應標頭:`, res.headers);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('📥 響應數據:', JSON.stringify(response, null, 2));
          
          if (res.statusCode === 200 && response.redirectUrl) {
            console.log('✅ API 測試成功！');
            console.log(`🔗 重定向URL: ${response.redirectUrl}`);
          } else {
            console.log('❌ API 測試失敗！');
            console.log('錯誤:', response.error || '未知錯誤');
          }
          
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          console.log('❌ 解析響應失敗:', error.message);
          console.log('原始響應:', data);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ 請求失敗:', error.message);
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🚀 開始 GMO LinkPay API 測試...\n');
  
  try {
    // 測試本地環境
    await testAPI('local');
  } catch (error) {
    console.log('本地測試失敗:', error.message);
  }
  
  try {
    // 測試 AWS 環境
    await testAPI('aws');
  } catch (error) {
    console.log('AWS 測試失敗:', error.message);
  }
  
  console.log('\n🏁 測試完成！');
}

// 如果直接運行此腳本
if (require.main === module) {
  const env = process.argv[2] || 'local';
  if (env === 'all') {
    runTests();
  } else if (config[env]) {
    testAPI(env).catch(console.error);
  } else {
    console.log('用法: node test-gmo-api.js [local|aws|all]');
    console.log('  local - 測試本地環境 (http://localhost:3000)');
    console.log('  aws   - 測試 AWS 環境 (https://www3.edu-cart.jp)');
    console.log('  all   - 測試所有環境');
  }
}

module.exports = { testAPI, testData };
