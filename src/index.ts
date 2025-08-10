import { server } from './server';

server
  .listen({
    port: 4043,
  })
  .then(() => {
    server.log.info('Started');
  });
