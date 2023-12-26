import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateUnit, HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    collection: 'chats',
    timestamps: true,
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

    @Prop()
    createdAt: Date;

    @Prop()
    lastActivity: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
