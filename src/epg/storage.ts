import { promises as fsPromises } from 'fs';
import { config } from '../configuration';
import { IEpg } from './definitions';
import { parser } from './parser';

const DEFAULT_FILE_NAME = `${config.directories.epg.datas}/epg.xml`;

export const storage = {
  read: async (): Promise<IEpg> => {
    return fsPromises.readFile(DEFAULT_FILE_NAME).then(parser.parse);
  },

  save: async (epg: IEpg): Promise<void> => {
    return fsPromises.writeFile(DEFAULT_FILE_NAME, parser.toXml(epg));
  },
};
