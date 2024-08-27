import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';
import { defu } from 'defu';

import type { DynamicNextConfig } from './src/types/next-config';

const nextPublicServerUrl = new URL('/', process.env.NEXT_PUBLIC_SERVER_URL);

const dynamicNextConfig = (async (phase: string, { defaultConfig }) => {
  const imagesRemotePatterns: RemotePattern[] = [];

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    const { protocol: protocolWithColon, hostname, port } = nextPublicServerUrl;

    imagesRemotePatterns.push({
      protocol: protocolWithColon.replace(':', '') as RemotePattern['protocol'],
      hostname,
      port,
    });
  }

  return defu(
    {
      images: {
        remotePatterns: imagesRemotePatterns,
      },
    },
    defaultConfig,
  );
}) satisfies DynamicNextConfig;

export default dynamicNextConfig;
