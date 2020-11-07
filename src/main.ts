import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // structure a base document that conforms to the OpenAPI Specification
  const options = new DocumentBuilder()
    .setTitle('iCommerce')
    .setDescription('The iCommerce RESTful APIs specification')
    .setVersion('1.0')
    .build();
  // create a full document (with all HTTP routes defined)
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
