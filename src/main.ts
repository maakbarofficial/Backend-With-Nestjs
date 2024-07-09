import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my_logger/my_logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.useLogger(app.get(MyLoggerService))
  app.setGlobalPrefix('api/v1') // http://localhost:3000/api/v1/users
  app.enableCors(); //cors
  await app.listen(3000);
}
bootstrap();
