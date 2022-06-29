import nodeConfig from 'config';

const readConfigKey = <T = string>(key: string): T | never => {
  if (!nodeConfig.has(key)) {
    throw new Error(`Config key "${key}" is missing`);
  }
  return nodeConfig.get(key);
};

export const config = {
  directories: {
    logs: readConfigKey('directories.logs'),
    epg: {
      datas: readConfigKey('directories.epg.datas'),
      temp: readConfigKey('directories.epg.temp'),
    },
  },
  logger: {
    level: readConfigKey('logger.level'),
  },
  api: {
    host: readConfigKey('api.host'),
    port: readConfigKey('api.port'),
    username: readConfigKey('api.username'),
    password: readConfigKey('api.password'),
  },
  scheduler: readConfigKey<number>('scheduler'),
  daysToKeep: readConfigKey<number>('daysToKeep'),
};
