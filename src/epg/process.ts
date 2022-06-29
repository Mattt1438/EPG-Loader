import { config } from '../configuration';
import { logger } from '../logger';
import { client } from './client';
import { combiner } from './combiner';
import { storage } from './storage';

export const process = async (): Promise<void> => {
  logger.info('Process execution');

  await Promise.all([storage.read(), client.fetch()])
    .then(([existingEpg, newEpg]) => combiner.merge(existingEpg, newEpg).then(storage.save))
    .catch((err) => {
      logger.error('Error during the process', err);
    })
    .finally(() => {
      logger.info('Process end');
      setTimeout(process, config.scheduler * 60 * 1000);
    });
};
