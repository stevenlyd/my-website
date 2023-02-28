/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        appDir: true,
    },

    exportPathMap: async function (
        defaultPathMap,
        {dev, dir, outDir, distDir, buildId}
    ) {
        return {
            '/': {page: '/'},
            '/about': {page: '/about'},
            '/gallery': {page: '/gallery'},
        }
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'steven-pocketbase.fly.dev',
                port: '',
                pathname: '/api/files/**',
            },
        ],
    },

}

module.exports = nextConfig
