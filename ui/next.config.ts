import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['three'],
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: 'raw-loader',
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.glsl': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
