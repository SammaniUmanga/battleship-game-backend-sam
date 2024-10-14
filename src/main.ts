import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.APP_PORT);
  console.log(`App listen to PORT: ${process.env.APP_PORT}`);
}

bootstrap();
