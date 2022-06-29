import { process } from './epg';
import { initApp } from './init';

(async () => {
  await initApp();
  await process();
})();
