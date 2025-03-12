import { config } from './config';
import { buildServer } from './server';

const start = async () => {
  try {
    const server = await buildServer();
    
    await server.listen({ 
      port: config.PORT, 
      host: config.HOST 
    });
    
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    
    server.log.info(`Server listening on ${config.HOST}:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();