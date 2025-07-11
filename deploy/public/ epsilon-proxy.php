<?php
// epsilon-proxy.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 取得所有 POST 參數
    $params = $_POST;

    // 準備要送到 GMO/Epsilon 的 URL
    $url = 'https://beta.epsilon.jp/cgi-bin/order/receive_order.cgi';

    // 用 curl 轉送
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    // 回傳結果
    header('Content-Type: text/xml; charset=UTF-8');
    echo $result;
    exit;
}
?>