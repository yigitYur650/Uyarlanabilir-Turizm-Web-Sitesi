import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Statik site çıktısı (out klasörü) için kritik satır
  images: {
    unoptimized: true, // Statik exportlarda resimlerin hata vermemesi için gerekli
  },
};

export default nextConfig;