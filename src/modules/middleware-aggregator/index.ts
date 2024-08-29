import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/dist/shared/lib/constants';

import type {
  StaticNextConfig,
  DynamicNextConfig,
} from '../../types/next-config';

import {
  MiddlewareAggregatorBuilder,
  type MiddlewareAggregatorBuilderOptions,
} from './builder';

const ALLOWED_PHASES = [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD];

export const withMiddlewareAggregator = (
  baseNextConfig: StaticNextConfig | DynamicNextConfig,
  options: MiddlewareAggregatorBuilderOptions = {},
) => {
  const nextConfigWithMiddlewareAggregator: DynamicNextConfig = async (
    phase,
    { defaultConfig },
  ) => {
    let derivedBaseNextConfig: StaticNextConfig;

    if (typeof baseNextConfig === 'function') {
      derivedBaseNextConfig = await baseNextConfig(phase, { defaultConfig });
    } else {
      derivedBaseNextConfig = baseNextConfig;
    }

    if (!ALLOWED_PHASES.includes(phase)) return derivedBaseNextConfig;

    return MiddlewareAggregatorBuilder.run(options, derivedBaseNextConfig);
  };

  return nextConfigWithMiddlewareAggregator;
};
