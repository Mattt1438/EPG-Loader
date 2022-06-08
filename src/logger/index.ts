import { createLogger, format, transports } from 'winston';

import { config } from '../configuration';

const formats = [
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.simple()
]; 

export const logger = createLogger({
  level: config.logger.level,
  transports: [
    new transports.File({ 
      filename: `${config.directories.logs}/error.log`, 
      level: 'error', 
      format: format.combine(...formats),
      options: { flags: 'w' }
    }),
    new transports.File({ 
      filename: `${config.directories.logs}/combined.log`, 
      format: format.combine(...formats),
      options: { flags: 'w' }
    }),
    new transports.Console({
      format: format.combine(format.colorize(), ...formats)
    })
  ]
});