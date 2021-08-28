import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, ObjectId } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {

    @Prop({ type: String, required: true })
    first_name: string
    @Prop({ type: String })
    middle_name: string
    @Prop({ type: String, required: true })
    last_name: string
    @Prop({ type: String, unique: true, required: true })
    username: string
    @Prop({ type: String, required: true })
    password: string
    // @Prop(Number)
    // primary_number: number
    // @Prop(Number)
    // secondary_number: number
    @Prop({ type: String,required:true,unique:true })
    email: string
    // @Prop(String)
    // city: string
    // @Prop(String)
    // state: string
    // @Prop(String)
    // country: string
    // @Prop(String)
    // address: string
    // @Prop(String)
    // isVerified: boolean
    // @Prop(String)
    // role: String
    // @Prop(String)
    // user_profile: string
}

export const UserSchema = SchemaFactory.createForClass(User);