import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type NameDocument = Name & Document;

@Schema({ timestamps: true })
export class Name {
  @Factory(() => {
    return Math.random().toString(36).substring(2, 12);
  })
  @Prop({ required: true })
  name: string;
}

export const NameSchema = SchemaFactory.createForClass(Name);
NameSchema.index({ name: 1 });
