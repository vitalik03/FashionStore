import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const whitelist = ['http://localhost:4200'];
  const corsOptions = {
    credentials: true, 
    origin: (origin, callback) => {
      if(whitelist.includes(origin))
        return callback(null, true)
        callback(new Error('Not allowed by CORS'));
    }
  }
  app.use(cors());
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));

  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
  .setTitle('Users API')
  .setDescription('Users API description')
  .setVersion('1.0')
  .addTag('users')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
    await app.listen(3000);
  }
bootstrap();
