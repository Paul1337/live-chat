import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
    collection: 'messages',
    timestamps: true,
})
export class Message {
    @Prop()
    text?: string;

    @Prop()
    img?: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    owner: ObjectId;

    @Prop({
        required: true,
    })
    chatId: string;

    @Prop({
        default: false,
    })
    isRead: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
