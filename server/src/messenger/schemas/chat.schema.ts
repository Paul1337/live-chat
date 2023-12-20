import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    collection: 'chats',
})
export class Chat {
    _id: Types.ObjectId;

    @Prop({
        required: true,
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    })
    users: Types.ObjectId[];

    @Prop()
    groupName?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
