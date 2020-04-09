import Config from 'webpack-chain';

export type ConfigTweaker = (config: Config, resolver: (p: string) => string) => void;
