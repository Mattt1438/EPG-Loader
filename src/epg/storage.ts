import { promises as fsPromises } from 'fs';

import { config } from '../configuration';
import { logger } from '../logger';
import { IEpg } from './definitions';
import { parser } from './parser';

const DEFAULT_FILE_NAME = `${config.directories.epg.datas}/epg.xml`;

export const storage = {
  read: async (): Promise<IEpg> => {
    return fsPromises
      .readFile(DEFAULT_FILE_NAME)
      .then(parser.parse)
      .catch((err) => {
        logger.error('Error while reading current EPG file', err);
        return { tv: { channel: [], programme: [] } };
      });
  },

  save: async (epg: IEpg): Promise<void> => {
    return fsPromises.writeFile(DEFAULT_FILE_NAME, parser.toXml(epg));
  },
};
