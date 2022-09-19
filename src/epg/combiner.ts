import { config } from '../configuration';
import { logger } from '../logger';
import { IEpg, ITvProgram } from './definitions';

export const combiner = {
  merge: async (existingEpg: IEpg, newEpg: IEpg): Promise<IEpg> => {
    const parseDate = (d: string): number => {
      if (d.length !== 20) {
        logger.error('Invalid date format', d);
        return -Infinity;
      }
      // TODO regex!!!!
      const year = d.substring(0, 4);
      const month = d.substring(4, 6);
      const day = d.substring(6, 8);
      const hour = d.substring(8, 10);
      const minute = d.substring(10, 12);
      const second = d.substring(12, 14);
      const timezone = d.substring(15, 20);
      return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${timezone}`).getTime();
    };

    const offsetDate = new Date().setDate(new Date().getDate() - config.daysToKeep);
    const isOutdated = (program: ITvProgram): boolean => {
      const start = parseDate(program['@_start']);
      const stop = parseDate(program['@_stop']);

      return offsetDate > start && offsetDate > stop;
    };

    const arrayToMap = (programs: ITvProgram[]): [string, ITvProgram][] =>
      programs.map((p) => [`${p['@_channel']}_${p['@_start']}`, p]);

    const programsMap = new Map([...arrayToMap(existingEpg.tv.programme), ...arrayToMap(newEpg.tv.programme)]);
    return {
      ...newEpg,
      tv: {
        ...newEpg.tv,
        programme: [...programsMap.values()].filter((p) => !isOutdated(p)),
      },
    };
  },
};
