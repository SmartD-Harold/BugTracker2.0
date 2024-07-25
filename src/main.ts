import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
// import supertokens from 'supertokens-node';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './modules/main/auth/exceptions/auth.filter';
import { AppModule } from './app.module';
import { CamelizeKeysInterceptor } from 'src/interceptors/camelize-keys.interceptor';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationConfig,
  ConfigurationKey,
} from '../config/configuration.config';

async function bootstrap() {
  let httpsOptions = {};
  const isHttps = process.env.HTTPS === 'true';
  if (isHttps) {
    httpsOptions = {
      key: fs.readFileSync(__dirname + '/secrets/ssl/private-key.pem'),
      cert: fs.readFileSync(__dirname + '/secrets/ssl/public-certificate.pem'),
    };
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const configService = app.get(ConfigService);
  console.log('Test:', configService.get(ConfigurationKey.AUTHOR));
  console.log('ALL ENVs:', configService);

  app.enableCors({
    origin: [configService.get(ConfigurationKey.frontend.url)], // frontend domain
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalInterceptors(new CamelizeKeysInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(configService.get(ConfigurationKey.port));
}
bootstrap();
