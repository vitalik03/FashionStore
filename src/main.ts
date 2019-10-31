import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as cluster from 'cluster'

declare const module: any;
const workers = [];
const logger = new Logger();

const setupWorkerProcesses = () => {
  const numCores = require('os').cpus().length;
  logger.log('Master cluster setting up ' + numCores + ' workers');

  // Fork workers
  for ( let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());

    workers[i].on('message', (message) => {
      logger.log(message);
    });
  }

  cluster.on('online', (worker) => {
    logger.log('Worker ' + worker.process.pid + ' is listening');
  });

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', (worker, code, signal) => {
    logger.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    logger.log('Starting a new worker');
    workers.push(cluster.fork());
    workers[workers.length - 1].on('message', (message) => {
      logger.log(message);
    });
  });
};



async function setUp() {
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
  .addTag('products')
  .addTag('orders')
  .addBearerAuth('Authorization', 'header')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
    await app.listen(3000);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  }

  async function bootstrap(isClusterRequired) {
    if (isClusterRequired && cluster.isMaster) {
      setupWorkerProcesses();
    } else {
      setUp();
    }
  }
  bootstrap(true);
