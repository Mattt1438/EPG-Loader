import { config } from '../configuration';
import { logger } from '../logger';
import { IEpg, ITvProgram } from './definitions';

export const combiner = {
  merge: async (existingEpg: IEpg, newEpg: IEpg): Promise<IEpg> => {
    const parseDate = (d: string): number => {
      const date = new Date(d.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s([+]\d{4})/g, '$1-$2-$3T$4:$5:$6$7'));
      if (!date || isNaN(date.valueOf())) {
        logger.error('Invalid date format', d);
        return -Infinity;
      }
      return date.getTime();
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
