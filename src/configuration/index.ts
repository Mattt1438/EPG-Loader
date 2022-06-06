import nodeConfig from 'config';

const readConfigKey = <T>(key: string): T | undefined => {
  if (!nodeConfig.has(key)) {
    console.error(`Config key "${key}" is missing`);
    return undefined;
  }
  return nodeConfig.get(key);
};

export const config = {
  api: {
    host: readConfigKey<string>('api.host'),
    port: readConfigKey<string>('api.port'),
    username: readConfigKey<string>('api.username'),
    password: readConfigKey<string>('api.password'),
  },
};
