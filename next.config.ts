import type { RemotePattern } from 'next/dist/shared/lib/image-config';

import type { StaticNextConfig } from './src/types/next-config';
import { withMiddlewareAggregator } from './src/modules/middleware-aggregator';

const getImageRemotePatterns = (): RemotePattern[] => {
  const nextPublicServerUrl = new URL('/', process.env.NEXT_PUBLIC_SERVER_URL);

  const { protocol: protocolWithColon, hostname, port } = nextPublicServerUrl;

  return [
    {
      protocol: protocolWithColon.replace(':', '') as RemotePattern['protocol'],
      hostname,
      port,
    },
  ];
};

const nextConfig: StaticNextConfig = {
  images: {
    remotePatterns: getImageRemotePatterns(),
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMiddlewareAggregator(nextConfig);
