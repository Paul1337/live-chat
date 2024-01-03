import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { MessengerModule } from '../messenger/messenger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from 'src/profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

const { DB_USER, DB_PASSWORD, DB_DOMAIN } = process.env;

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '../..', 'static'),
        }),
        AuthModule,
        MessengerModule,
        MongooseModule.forRoot(`mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_DOMAIN}:27017/`, {
            serverSelectionTimeoutMS: 5000,
            dbName: 'live-chat',
        }),
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
