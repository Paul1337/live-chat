import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { MessengerModule } from '../messenger/messenger.module';
import { MongooseModule } from '@nestjs/mongoose';

const { DB_USER, DB_PASSWORD } = process.env;
console.log(`mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@m130.ru:27017/live-chat`);
@Module({
    imports: [
        AuthModule,
        MessengerModule,
        MongooseModule.forRoot(
            `mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@m130.ru:27017/`,
            {
                serverSelectionTimeoutMS: 5000,
                dbName: 'live-chat',
            },
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
