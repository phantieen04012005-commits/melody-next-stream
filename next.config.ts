import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // BẮT BUỘC: Xuất ra file tĩnh (thư mục out) theo đúng Bước 4 của sơ đồ đề bài
  images: {
    unoptimized: true, // Tắt tối ưu ảnh để tránh bị lỗi hiển thị trên GitHub Pages
  },
  basePath: '/melody-stream', // Điền tên kho GitHub của bạn vào đây
  assetPrefix: '/melody-stream',
};

export default nextConfig;