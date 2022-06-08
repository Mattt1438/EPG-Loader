import * as superagent from 'superagent';
import { IEpg } from '../common';
import { config } from '../configuration';
import { createWriteStream, promises as fsPromises } from 'fs';
import { XMLParser } from 'fast-xml-parser';

export const client = {
  fetch: async (): Promise<IEpg> => {
    const { host, port, username, password } = config.api;

    return new Promise<IEpg>(async (resolve) => {
      const fileName = `${config.directories.epg.temp}/response_${Date.now()}.xml`;

      superagent
        .get(`${host}:${port}/xmltv.php`)
        .responseType('application/xml')
        .query({ username, password })
        .pipe(createWriteStream(fileName))
        .on('close', () => {
          fsPromises.readFile(fileName).then((content) => {
            resolve(new XMLParser({ ignoreAttributes: false }).parse(content));
          });
        });
    });
  },
};
