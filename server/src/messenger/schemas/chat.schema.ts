import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Message } from './message.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    collection: 'chats',
})
export class Chat {
    // @Prop({
    //     required: true,
    // })
    _id: Types.ObjectId;

    @Prop({
        required: true,
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    })
    users: Types.ObjectId[];

    @Prop({
        required: true,
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Message' }],
    })
    messages: Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
