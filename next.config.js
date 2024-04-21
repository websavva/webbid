const nextPublicServerUrl = new URL('/', process.env.NEXT_PUBLIC_SERVER_URL);

/** @type {Array<import('next/dist/shared/lib/image-config').RemotePattern>} */
const imagesRemotePatterns = [];

if (process.env.NODE_ENV !== 'production') {
  imagesRemotePatterns.push({
    protocol: nextPublicServerUrl.protocol.replace(':', ''),
    hostname: nextPublicServerUrl.hostname,
    port: nextPublicServerUrl.port,
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: imagesRemotePatterns,
  },
};

module.exports = nextConfig;
