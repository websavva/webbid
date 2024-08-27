import type { NextConfig as _NextConfig } from 'next';

export type StaticNextConfig = _NextConfig;

export type DynamicNextConfig = (
  phase: string,
  options: { defaultConfig: StaticNextConfig },
) => Promise<StaticNextConfig> | StaticNextConfig;
