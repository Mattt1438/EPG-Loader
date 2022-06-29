import { config } from '../configuration';
import { logger } from '../logger';
import { client } from './client';
import { storage } from './storage';

export const process = async (): Promise<void> => {
  try {
    logger.info('Process execution');
    const newEpg = await client.fetch();

    await storage.save(newEpg);
    logger.info('Process end');
  } catch (err: unknown) {
    logger.error('Error during the process', err);
  } finally {
    setTimeout(process, config.scheduler * 60 * 1000);
  }
};
