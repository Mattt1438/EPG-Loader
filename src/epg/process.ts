import { client } from './client';
import { storage } from './storage';

export const process = async (): Promise<void> => {
  const newEpg = await client.fetch();

  await storage.save(newEpg);

  const read = await storage.read();
  console.log(read);
};
