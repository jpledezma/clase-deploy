import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ default: 'sin apellido' })
  lastName: string;

  @Prop({ required: true })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
