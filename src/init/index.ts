import { createAppDirectories } from './directory';

export const initApp = (): Promise<void> => Promise.all([createAppDirectories()]).then();
