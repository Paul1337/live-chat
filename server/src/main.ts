import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app/app.module';
import fs from 'fs';
import path from 'path';

const { SERVER_PORT, MODE } = process.env;

const httpsOptions = MODE === 'production' && {
    key: fs.readFileSync(path.join(__dirname, '../secrets/privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../secrets/cert.pem')),
};

console.log('http options:', httpsOptions);

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        httpsOptions,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(SERVER_PORT);
}
bootstrap();
