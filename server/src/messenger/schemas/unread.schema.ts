import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type UnreadDocument = HydratedDocument<Unread>;

@Schema({
    collection: 'unreads',
})
export class Unread {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: ObjectId;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Chat',
    })
    chatId: Types.ObjectId;

    @Prop({
        required: true,
    })
    count: number;
}

export const UnreadSchema = SchemaFactory.createForClass(Unread);
