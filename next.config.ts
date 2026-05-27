import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Bắt buộc phải có dòng này để tạo ra thư mục 'out' ở Bước 4
  images: {
    unoptimized: true, // Giúp hiển thị ảnh mượt mà
  },
  basePath: '/melody-next-stream', // Tên kho code GitHub của bạn
};

export default nextConfig;