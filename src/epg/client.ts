import * as superagent from 'superagent';

import { config } from '../configuration';
import { logger } from '../logger';
import { IEpg } from './definitions';
import { parser } from './parser';

export const client = {
  fetch: async (): Promise<IEpg> => {
    const { host, port, username, password, userAgent } = config.api;

    return new Promise<IEpg>(async (resolve, reject) => {

      superagent
        .get(`${host}:${port}/xmltv.php`)
        .set('User-Agent', userAgent)
        .responseType('application/xml')
        .query({ username, password })
        .end((err, res) => {
          if (err) {
            reject(err);
            return;
          }
          try {
            const datas = parser.parse(res.body);
            resolve(datas);
          } catch (error) {
            logger.error('Error while parsing http response', error);
            reject(error);
          }
        });

    });
  },
};
