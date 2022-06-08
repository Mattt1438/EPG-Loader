import { promises as fsPromises } from 'fs';
import { config } from './configuration';
import { process } from './epg';

const createAppDirectories = (): Promise<void> => {
  const createDir = (dir: string): Promise<void> =>
    fsPromises.mkdir(dir, { recursive: true }).then(() => {
      console.log(`Directory created: ${dir}`);
    });

  const listDirectories = (value: object | string = config.directories): string[] => {
    if (typeof value === 'string') return [value];
    return Object.values(value).reduce((acc, curr) => [...acc, ...listDirectories(curr)], []);
  };

  return Promise.all(listDirectories().map(createDir)).then();
};

(async () => {
  await createAppDirectories();
  await process();
})();
