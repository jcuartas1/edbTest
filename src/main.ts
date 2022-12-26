import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ReportsModule } from './reports/reports.module';
import { get } from 'http';
import { resolve } from 'path';
import { writeFileSync } from 'fs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Edb Group')
    .setDescription('Test EndPoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ReportsModule],
  });

  SwaggerModule.setup('/swagger', app, document);  

  console.log(process.env.PORT);
  console.log(process.env.NODE_ENV);

  await app.listen(process.env.PORT ?? 3001);

  // get the swagger json file (if app is running in develoment mode)
  if(process.env.NODE_ENV === 'dev'){
    const pathToSwaggerStacticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger ui files
    const pathToSwaggerJson = resolve(
      pathToSwaggerStacticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log('Swagger Json file written to: /swagger-static/swagger.json');
  }

  
}
bootstrap();
