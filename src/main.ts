import { v1 } from '@infrastructure/configs/versions/v1';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from 'src/app.module';

config();

async function bootstrap() {
  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: v1 });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log('Listening on port', port));
}
bootstrap();
