import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './configuration';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());

  //
  const config = new DocumentBuilder()
    .setTitle('ES Inventory API')
    .setDescription('The ES Inventory API description')
    .setVersion('1.0')
    .addTag('Es Inventory')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  //
  await app.listen(configuration().port, () => {
    console.log('App running at : http://localhost:' + configuration().port);
  });
}
bootstrap();
