/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用静态导出，强制使用动态渲染
  output: 'standalone'
};

export default nextConfig;
