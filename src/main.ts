import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 4000;

  const docsContent = await readFile(resolve(__dirname, '../doc/api.yaml'), 'utf8');
  const docs = (await yaml.load(docsContent)) as OpenAPIObject;
  SwaggerModule.setup('api', app, docs);

  await app.listen(port);
}
bootstrap();
