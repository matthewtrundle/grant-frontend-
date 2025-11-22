/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  experimental: {
    // Prevent R3F packages from being bundled during SSR
    serverComponentsExternalPackages: [
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
      'three',
    ],
  },
  webpack: (config, { isServer }) => {
    // Prevent R3F from being bundled on the server
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@react-three/fiber': '@react-three/fiber',
        '@react-three/drei': '@react-three/drei',
        '@react-three/postprocessing': '@react-three/postprocessing',
        'three': 'three',
      });
    }
    return config;
  },
};

export default nextConfig;
