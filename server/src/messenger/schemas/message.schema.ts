import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
    collection: 'messages',
})
export class Message {
    @Prop()
    text: string;

    @Prop()
    from: string;

    @Prop()
    date: string;

    @Prop()
    isMine: boolean;

    @Prop()
    isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
