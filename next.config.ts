import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [new URL('https://img.spoonacular.com/recipes/*')],
  },
}

export default nextConfig
