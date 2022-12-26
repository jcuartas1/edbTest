import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ReportsModule } from './reports/reports.module';


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

  SwaggerModule.setup('api', app, document);  

  console.log(process.env.PORT);

  await app.listen(process.env.PORT ?? 3001);

  
}
bootstrap();
