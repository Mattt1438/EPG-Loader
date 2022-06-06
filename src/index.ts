import { client } from './epg';

(async () => {
  const response = await client.fetch();

  console.debug(response);
})();
