import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';

app.listen(env.server.port, () => {
  logger.info(`🚀 Server running at http://localhost:${env.server.port}`);
});
