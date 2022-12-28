import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ReportsModule } from './reports/reports.module';
import { get } from 'http';
import { resolve } from 'path';
import cors from 'cors';
import { createWriteStream, writeFileSync } from 'fs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    optionsSuccessStatus: 200
  }));

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

    // Solution SwaggerOne

    /*
    const pathToSwaggerStacticFolder = resolve(process.cwd(), 'swagger-static');

    const pathToSwaggerJson = resolve(
      pathToSwaggerStacticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log('Swagger Json file written to: /swagger-static/swagger.json');

    */

    // Solution swaager two

    const serverUrl = await app.getUrl();
    // write swagger ui files
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function(response){
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log('Swagger UI bundle file written to: /swagger-static/swagger-ui-bundle.j');
    })

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function(response){
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log('Swagger UI init file written to: /swagger-static/swagger-ui-init.js');
    })

    get(`${serverUrl}/swagger/swagger-ui-standalone-preset.js`, function(response){
      response.pipe(createWriteStream('swagger-static/swagger-ui-standalone-preset.js'));
      console.log('Swagger UI standalone file written to: /swagger-static/swagger-ui-standalone-preset.js');
    })

    get(`${serverUrl}/swagger/swagger-ui.css`, function(response){
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log('Swagger UI css file written to: /swagger-static/swagger-ui.css');
    })
  }

  
}
bootstrap();
