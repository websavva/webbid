import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';
import { defu } from 'defu';

const nextPublicServerUrl = new URL('/', process.env.NEXT_PUBLIC_SERVER_URL);

const loadNextConfig = async (
  phase: string,
  { defaultConfig }: { defaultConfig: NextConfig },
): Promise<NextConfig> => {
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
};

export default loadNextConfig;
