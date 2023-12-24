import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
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

    @Prop(
        raw({
            firstName: String,
            lastName: String,
        }),
    )
    ownerData: {
        firstName: string;
        lastName: string;
    };

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Chat',
    })
    chatId: Types.ObjectId;

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
