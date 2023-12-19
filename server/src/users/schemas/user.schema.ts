import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
    collection: 'users',
})
export class User {
    // @Prop()
    _id: Types.ObjectId;

    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
