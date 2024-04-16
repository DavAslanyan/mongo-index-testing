import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { swaggerConst } from './constant/swagger.const';
import { CLIENT_MAX_BODY_SIZE_MB, PORT } from './constant/env-key.const';

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  app.enableShutdownHooks();
  app.use(json({ limit: `${configService.get(CLIENT_MAX_BODY_SIZE_MB)}mb` }));
  app.use(
    urlencoded({
      limit: `${configService.get(CLIENT_MAX_BODY_SIZE_MB)}mb`,
      extended: true,
    }),
  );

  const docConfig = new DocumentBuilder()
    .setTitle('Mongo Index testing')
    .setDescription('Mongo Index testing')
    .setVersion('1.0');

  for (const t of Object.values(swaggerConst.tag)) {
    docConfig.addTag(t);
  }

  const schema = SwaggerModule.createDocument(app, docConfig.build());
  SwaggerModule.setup('/api/v1/api-docs', app, schema);

  const port = configService.get(PORT);
  await app.listen(port, '0.0.0.0', () =>
    Logger.log(`Server listening on port '${port}'`, __filename),
  );
})();
